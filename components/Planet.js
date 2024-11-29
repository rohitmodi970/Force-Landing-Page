import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Planet = () => {
  const planetRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isClient, setIsClient] = useState(false); // To check if we're on the client

  useEffect(() => {
    setIsClient(true); // Set the state to true when mounted on the client
  }, []);

  useEffect(() => {
    if (isClient) { // Only start rotation logic after client-side render
      const interval = setInterval(() => {
        setRotation(prev => prev + 2);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isClient]);

  // Load GLTF model only when on the client
  const { scene } = useGLTF('@models/Termanation.glb');

  if (!isClient) return null; // Return null to prevent rendering on the server

  return (
    <motion.div 
      ref={planetRef}
      animate={{ rotate: rotation }}
      transition={{ duration: 5, ease: 'linear' }}
      className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 w-[400px] h-[400px] bg-orange-400 rounded-full opacity-20 
                 shadow-2xl border-8 border-blue-700/30"
    >
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          {/* The loaded GLTF model */}
          <primitive object={scene} rotation={[0, rotation * (Math.PI / 180), 0]} scale={0.5} />
        </Canvas>
      {[1, 2, 3].map((ring) => (
        <div 
          key={ring} 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      rounded-full border border-orange-300/10`}
          style={{
            width: `${ring * 100}px`, 
            height: `${ring * 100}px`
          }}
        />
      ))}
    </motion.div>
  );
};

export default Planet;
