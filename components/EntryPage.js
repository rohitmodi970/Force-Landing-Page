import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Eraser, Pencil, Trash2 } from 'lucide-react';

const DiaryEntryPage = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const particlesRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contextRef = useRef(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTool, setCurrentTool] = useState('pen');
  const [guideLines, setGuideLines] = useState([]);

  useEffect(() => {
    // Calculate guide lines based on window height
    const lineCount = Math.floor(window.innerHeight / 24);
    setGuideLines(Array.from({ length: lineCount }, (_, i) => i));
    
    const handleResize = () => {
      const newLineCount = Math.floor(window.innerHeight / 24);
      setGuideLines(Array.from({ length: newLineCount }, (_, i) => i));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize Three.js scene for particles
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const particles = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    particlesRef.current?.appendChild(renderer.domElement);
    
    // Create particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xffd700,
      transparent: true,
      opacity: 0.8,
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particles.add(particleSystem);
    camera.position.z = 5;
    
    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.x += 0.001;
      particleSystem.rotation.y += 0.001;
      renderer.render(particles, camera);
    };
    
    animate();
    
    return () => {
      particlesRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    
    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = '#1a237e';
    context.lineWidth = 2;
    contextRef.current = context;

    // Handle resize
    const handleResize = () => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      context.scale(2, 2);
      context.lineCap = 'round';
      context.strokeStyle = currentTool === 'pen' ? '#1a237e' : '#ffffff';
      context.lineWidth = currentTool === 'pen' ? 2 : 20;
      context.putImageData(imageData, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentTool]);

  // Custom cursor movement
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Rest of the component code remains the same...
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = contextRef.current;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    context.strokeStyle = currentTool === 'pen' ? '#1a237e' : '#ffffff';
    context.lineWidth = currentTool === 'pen' ? 2 : 20;
    setIsDrawing(true);
    if (!hasDrawn) setHasDrawn(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    if (hasDrawn) {
      setTimeout(() => setShowButton(true), 1000);
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setShowButton(false);
  };

  const handleEnterClick = () => {
    window.location.href = '/home';
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      {/* Particles container */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none" />
      
      {/* Tools Panel */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm 
                   rounded-full shadow-lg p-2 flex flex-col gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentTool('pen')}
          className={`p-3 rounded-full transition-colors ${
            currentTool === 'pen' 
              ? 'bg-indigo-100 text-indigo-600' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Pencil className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentTool('eraser')}
          className={`p-3 rounded-full transition-colors ${
            currentTool === 'eraser' 
              ? 'bg-indigo-100 text-indigo-600' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Eraser className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={clearCanvas}
          className="p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <Trash2 className="w-6 h-6" />
        </motion.button>
      </motion.div>
      
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      >
        <motion.div 
          className={`rounded-full bg-white ${currentTool === 'pen' ? 'w-6 h-6' : 'w-10 h-10'}`}
          animate={{
            scale: isDrawing ? 0.5 : 1,
            opacity: isDrawing ? 1 : 0.6
          }}
          transition={{ duration: 0.15 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex items-center justify-center p-4"
      >
        <div className="w-full h-full max-w-7xl relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
          <div className="absolute bottom-0 right-0 w-full h-12 bg-gradient-to-l from-indigo-500/10 to-purple-500/10" />
          
          {/* Guide lines */}
          <div className="absolute inset-0 overflow-hidden">
            {guideLines.map((i) => (
              <div
                key={i}
                className="w-full h-px bg-indigo-100"
                style={{ top: `${(i + 1) * 24}px` }}
              />
            ))}
          </div>

          {/* Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onMouseLeave={finishDrawing}
            className="absolute inset-0 w-full h-full cursor-none"
          />

          {/* Helper Text */}
          {!hasDrawn && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         text-2xl text-indigo-300 font-light pointer-events-none"
            >
              Begin your story...
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Enter Button */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={handleEnterClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 
                     rounded-full font-medium shadow-lg hover:shadow-xl transition-all 
                     duration-200 cursor-none"
        >
          Enter
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DiaryEntryPage;