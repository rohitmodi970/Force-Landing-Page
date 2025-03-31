import { useRef, useEffect } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Program,
  Mesh,
  Texture,
} from "ogl";

const vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;

varying vec2 vUv;
varying vec3 vNormal;

float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                              0.0,                                0.0,                                1.0
    );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float qinticInOut(float t) {
  return t < 0.5
    ? 16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}

void main() {
  vUv = uv;
  
  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
  float localprogress = clamp(
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),
    0.,
    2.
  );
  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;

  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;
  vec2 scale = vec2(1.0, 1.0);

  if (planeAspect > imageAspect) {
      scale.x = imageAspect / planeAspect;
  } else {
      scale.y = planeAspect / imageAspect;
  }

  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;

  gl_FragColor = texture2D(tMap, uv);
}
`;

function AutoBind(self, { include, exclude } = {}) {
  const getAllProperties = (object) => {
    const properties = new Set();
    do {
      for (const key of Reflect.ownKeys(object)) {
        properties.add([object, key]);
      }
    } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
    return properties;
  };

  const filter = (key) => {
    const match = (pattern) =>
      typeof pattern === "string" ? key === pattern : pattern.test(key);

    if (include) return include.some(match);
    if (exclude) return !exclude.some(match);
    return true;
  };

  for (const [object, key] of getAllProperties(self.constructor.prototype)) {
    if (key === "constructor" || !filter(key)) continue;
    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
    if (descriptor && typeof descriptor.value === "function") {
      self[key] = self[key].bind(self);
    }
  }
  return self;
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function map(num, min1, max1, min2, max2, round = false) {
  const num1 = (num - min1) / (max1 - min1);
  const num2 = num1 * (max2 - min2) + min2;
  return round ? Math.round(num2) : num2;
}

class Media {
  constructor({
    gl,
    geometry,
    scene,
    screen,
    viewport,
    image,
    length,
    index,
    planeWidth,
    planeHeight,
    distortion,
  }) {
    this.extra = 0;
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.image = image;
    this.length = length;
    this.index = index;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;

    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: false,
    });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      fragment: fragmentShader,
      vertex: vertexShader,
      uniforms: {
        tMap: { value: texture },
        uPosition: { value: 0 },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uSpeed: { value: 0 },
        rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] },
        uDistortion: { value: this.distortion },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
        uTime: { value: 0 },
      },
      cullFace: false,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      if (this.program && this.program.uniforms) {
        this.program.uniforms.uImageSize.value = [
          img.naturalWidth,
          img.naturalHeight,
        ];
      }
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  setScale() {
    if (!this.plane || !this.viewport || !this.screen) return;
    
    this.plane.scale.x =
      (this.viewport.width * this.planeWidth) / this.screen.width;
    this.plane.scale.y =
      (this.viewport.height * this.planeHeight) / this.screen.height;

    this.plane.position.x = 0;
    if (this.plane.program && this.plane.program.uniforms) {
      this.plane.program.uniforms.uPlaneSize.value = [
        this.plane.scale.x,
        this.plane.scale.y,
      ];
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane && this.plane.program && this.plane.program.uniforms) {
        this.plane.program.uniforms.uViewportSize.value = [
          this.viewport.width,
          this.viewport.height,
        ];
      }
    }
    this.setScale();

    this.padding = 5;
    this.height = this.plane.scale.y + this.padding;
    this.heightTotal = this.height * this.length;

    this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;
  }

  update(scroll) {
    if (!this.plane || !this.viewport || !this.program) return;
    
    this.plane.position.y = this.y - scroll.current - this.extra;

    const position = map(
      this.plane.position.y,
      -this.viewport.height,
      this.viewport.height,
      5,
      15
    );

    this.program.uniforms.uPosition.value = position;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current;

    const planeHeight = this.plane.scale.y;
    const viewportHeight = this.viewport.height;

    const topEdge = this.plane.position.y + planeHeight / 2;
    const bottomEdge = this.plane.position.y - planeHeight / 2;

    if (topEdge < -viewportHeight / 2) {
      this.extra -= this.heightTotal;
    } else if (bottomEdge > viewportHeight / 2) {
      this.extra += this.heightTotal;
    }
  }
}

class Canvas {
  constructor({
    container,
    canvas,
    items,
    planeWidth,
    planeHeight,
    distortion,
    scrollEase,
    cameraFov,
    cameraZ,
  }) {
    this.container = container;
    this.canvas = canvas;
    this.items = items || [];
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;
    this.scroll = {
      ease: scrollEase,
      current: 0,
      target: 0,
      last: 0,
    };
    this.cameraFov = cameraFov;
    this.cameraZ = cameraZ;
    this.isInitialized = false;
    this.medias = null;

    AutoBind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();

    this.createGeometry();
    
    // Only create medias if we have items
    if (this.items && this.items.length > 0) {
      this.createMedias();
    }
    
    this.isInitialized = true;
    this.update();
    this.addEventListeners();
    
    if (this.items && this.items.length > 0) {
      this.createPreloader();
    }
  }

  createRenderer() {
    try {
      this.renderer = new Renderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio, 2),
      });
      this.gl = this.renderer.gl;
    } catch (error) {
      console.error("Error creating renderer:", error);
      this.renderer = null;
      this.gl = null;
    }
  }

  createCamera() {
    if (!this.gl) return;
    
    this.camera = new Camera(this.gl);
    this.camera.fov = this.cameraFov;
    this.camera.position.z = this.cameraZ;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    if (!this.gl) return;
    
    try {
      this.planeGeometry = new Plane(this.gl, {
        heightSegments: 1,
        widthSegments: 100,
      });
    } catch (error) {
      console.error("Error creating geometry:", error);
      this.planeGeometry = null;
    }
  }

  createMedias() {
    if (!this.gl || !this.planeGeometry || !this.items || this.items.length === 0) {
      this.medias = [];
      return;
    }
    
    try {
      this.medias = this.items.map((image, index) => {
        return new Media({
          gl: this.gl,
          geometry: this.planeGeometry,
          scene: this.scene,
          screen: this.screen,
          viewport: this.viewport,
          image,
          length: this.items.length,
          index,
          planeWidth: this.planeWidth,
          planeHeight: this.planeHeight,
          distortion: this.distortion,
        });
      });
    } catch (error) {
      console.error("Error creating media items:", error);
      this.medias = [];
    }
  }

  createPreloader() {
    this.loaded = 0;
    if (!this.items || !this.items.length) return;

    this.items.forEach((src) => {
      if (!src) return;
      
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;
      image.onload = () => {
        this.loaded += 1;
        if (this.loaded === this.items.length) {
          if (document && document.documentElement) {
            document.documentElement.classList.remove("loading");
            document.documentElement.classList.add("loaded");
          }
        }
      };
      image.onerror = (err) => {
        console.error("Error loading image:", src, err);
        this.loaded += 1; // Count error as loaded to prevent hanging
      };
    });
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera || !this.gl) return;
    
    try {
      const rect = this.container.getBoundingClientRect();
      this.screen = {
        width: rect.width,
        height: rect.height,
      };

      if (rect.width === 0 || rect.height === 0) {
        // Container not visible yet, try again later
        return;
      }

      this.renderer.setSize(this.screen.width, this.screen.height);

      this.camera.perspective({
        aspect: this.gl.canvas.width / this.gl.canvas.height,
      });

      const fov = (this.camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
      const width = height * this.camera.aspect;

      this.viewport = { height, width };

      if (this.medias && this.medias.length > 0) {
        this.medias.forEach((media) => {
          if (media && typeof media.onResize === 'function') {
            media.onResize({ screen: this.screen, viewport: this.viewport });
          }
        });
      }
    } catch (error) {
      console.error("Error during resize:", error);
    }
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientY : e.clientY;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const distance = (this.start - y) * 0.1;
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
  }

  onWheel(e) {
    const speed = e.deltaY;
    this.scroll.target += speed * 0.005;
  }

  update() {
    if (!this.isInitialized || !this.renderer || !this.scene || !this.camera) {
      requestAnimationFrame(this.update);
      return;
    }
    
    try {
      this.scroll.current = lerp(
        this.scroll.current,
        this.scroll.target,
        this.scroll.ease
      );

      if (this.medias && this.medias.length > 0) {
        this.medias.forEach((media) => {
          if (media && typeof media.update === 'function') {
            media.update(this.scroll);
          }
        });
      }
      
      this.renderer.render({ scene: this.scene, camera: this.camera });
      this.scroll.last = this.scroll.current;
    } catch (error) {
      console.error("Error during render loop:", error);
    }
    
    requestAnimationFrame(this.update);
  }

  addEventListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", this.onResize);
      window.addEventListener("wheel", this.onWheel, { passive: true });
      window.addEventListener("mousewheel", this.onWheel, { passive: true });

      window.addEventListener("mousedown", this.onTouchDown);
      window.addEventListener("mousemove", this.onTouchMove);
      window.addEventListener("mouseup", this.onTouchUp);

      window.addEventListener("touchstart", this.onTouchDown, { passive: true });
      window.addEventListener("touchmove", this.onTouchMove, { passive: true });
      window.addEventListener("touchend", this.onTouchUp);
    }
  }

  destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener("resize", this.onResize);
      window.removeEventListener("wheel", this.onWheel);
      window.removeEventListener("mousewheel", this.onWheel);

      window.removeEventListener("mousedown", this.onTouchDown);
      window.removeEventListener("mousemove", this.onTouchMove);
      window.removeEventListener("mouseup", this.onTouchUp);

      window.removeEventListener("touchstart", this.onTouchDown);
      window.removeEventListener("touchmove", this.onTouchMove);
      window.removeEventListener("touchend", this.onTouchUp);
    }
    
    // Clean up WebGL resources
    if (this.medias) {
      this.medias.forEach(media => {
        if (media && media.plane) {
          media.plane.geometry?.remove?.();
          media.plane.program?.remove?.();
          media.plane = null;
        }
      });
      this.medias = null;
    }
    
    if (this.planeGeometry) {
      this.planeGeometry.remove?.();
      this.planeGeometry = null;
    }
    
    if (this.renderer) {
      this.renderer.destroy?.();
      this.renderer = null;
    }
    
    this.gl = null;
    this.camera = null;
    this.scene = null;
  }
}

export default function FlyingPosters({
  items = [],
  planeWidth = 320,
  planeHeight = 320,
  distortion = 3,
  scrollEase = 0.1,
  cameraFov = 45,
  cameraZ = 20,
  className,
  ...props
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    try {
      // Check if there are any items before initializing
      if (!items || items.length === 0) {
        console.warn("FlyingPosters: No items provided");
      }
      
      instanceRef.current = new Canvas({
        container: containerRef.current,
        canvas: canvasRef.current,
        items,
        planeWidth,
        planeHeight,
        distortion,
        scrollEase,
        cameraFov,
        cameraZ,
      });
    } catch (error) {
      console.error("Error initializing Canvas:", error);
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);

  // Handle resize when container size changes
  useEffect(() => {
    if (!instanceRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      if (instanceRef.current) {
        instanceRef.current.onResize();
      }
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Prevent default scroll behavior within canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasEl = canvasRef.current;

    const handleWheel = (e) => {
      if (instanceRef.current) {
        e.preventDefault();
        instanceRef.current.onWheel(e);
      }
    };

    const handleTouchMove = (e) => {
      if (instanceRef.current && instanceRef.current.isDown) {
        e.preventDefault(); // Prevents touch-based scrolling
      }
    };

    canvasEl.addEventListener("wheel", handleWheel, { passive: false });
    canvasEl.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      canvasEl.removeEventListener("wheel", handleWheel);
      canvasEl.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden relative z-2 ${className || ''}`}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}