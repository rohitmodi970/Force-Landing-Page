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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Initialize a variable to store the loaded model
    let model = null;

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
        model.scale.set(3, 3, 3); // Adjust scale if needed
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

      // Apply rotation to the model if it's loaded
      if (model) {
        model.rotation.y -= 0.005; // Adjust rotation speed as needed
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
