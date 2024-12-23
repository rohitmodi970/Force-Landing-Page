import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eraser, Pen,Pencil, Trash2 } from 'lucide-react';

const DiaryEntryPage = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contextRef = useRef(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTool, setCurrentTool] = useState('pen');
  const [guideLines, setGuideLines] = useState([]);

  // Calculate guide lines on window resize
  useEffect(() => {
    const calculateLines = () => {
      const lineCount = Math.floor(window.innerHeight / 24);
      setGuideLines(Array.from({ length: lineCount }, (_, i) => i));
    };

    calculateLines();
    window.addEventListener('resize', calculateLines);
    return () => window.removeEventListener('resize', calculateLines);
  }, []);

  // Initialize canvas with proper scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const context = canvas.getContext('2d');
    context.scale(dpr, dpr);
    context.lineCap = 'round';
    context.strokeStyle = '#1a237e';
    context.lineWidth = 2;
    contextRef.current = context;

    const handleResize = () => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const newRect = canvas.getBoundingClientRect();
      
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      
      context.scale(dpr, dpr);
      context.lineCap = 'round';
      context.strokeStyle = currentTool === 'pen' ? '#1a237e' : '#ffffff';
      context.lineWidth = currentTool === 'pen' ? 2 : 20;
      context.putImageData(imageData, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentTool]);

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    contextRef.current.strokeStyle = currentTool === 'pen' ? '#1a237e' : '#ffffff';
    contextRef.current.lineWidth = currentTool === 'pen' ? 2 : 20;
    setIsDrawing(true);
    if (!hasDrawn) setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    if (hasDrawn) {
      setShowButton(true);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setShowButton(false);
  };
  const CursorIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ transform: 'rotate(-45deg)' }}
    >
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <path d="M11 11l5 5" />
    </svg>
  );
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      {/* Tools Panel */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm 
                   rounded-full shadow-lg p-2 flex flex-col gap-2 z-10"
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
          <Pen className="w-6 h-6" />
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
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) rotate(180deg)` }}
        >
          <motion.div 
            className={`rounded-full flex items-center justify-center text-white 
          ${currentTool === 'pen' ? 'w-8 h-8' : 'w-10 h-10 bg-white'}`}
            animate={{
          scale: isDrawing ? 0.8 : 1,
          opacity: isDrawing ? 1 : 0.6
            }}
            transition={{ duration: 0.15 }}
          >
            {currentTool === 'pen' && <Pencil className = "rotate-180" />}
          </motion.div>
        </div>

        <div className="w-full h-full flex items-center justify-center p-4">
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
      </div>
    </div>
  );
};

export default DiaryEntryPage;