// Import necessary modules
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ModelViewer = ({ modelPath }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
    directionalLight.position.set(4, 8, 7.5);
    scene.add(directionalLight);
    // Add spotlight for the emission effect from the planet
    const pointLight = new THREE.PointLight(0xff0000, 2, 250); // Red light
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);

    // Add star-like particles around the planet
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 50 - 25;
      positions[i * 3 + 1] = Math.random() * 50 - 25;
      positions[i * 3 + 2] = Math.random() * 50 - 25;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Load the 3D model
    let model = null;
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
        model.scale.set(2.5, 2.5, 2.5); // Adjust scale if needed
      },
      undefined,
      (error) => {
        console.error("An error occurred loading the model:", error);
      }
    );

    // Add orbit controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 5);
    controls.update();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Apply rotation to the model
      if (model) {
        model.rotation.y -= 0.005; // Adjust rotation speed as needed
      }

      // Pulse effect for the planet's light
      pointLight.intensity = 2 + Math.sin(Date.now() * 0.005) * 1.5; // Pulsing light intensity

      // Update particle movement
      particles.rotation.x += 0.001; // Rotate particles slowly
      particles.rotation.y += 0.001;

      // Animate the scale of the planet to create a pulsing effect
      if (model) {
        const scale = 2.5 + Math.sin(Date.now() * 0.002) * 0.2; // Pulsing scale effect
        model.scale.set(scale, scale, scale);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      renderer.dispose();
      containerRef.current.removeChild(renderer.domElement);
    };
  }, [modelPath]);

  return <div ref={containerRef} style={{ width: "100%", height: "750px" }} />;
};

export default ModelViewer;
