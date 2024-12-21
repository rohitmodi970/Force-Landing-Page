import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, 
  FaFire, 
  FaSun, 
  FaHeart, 
  FaMicrophone, 
  FaEye, 
  FaCloud 
} from "react-icons/fa";

const ScrollWave = () => {
  const [wavePaths, setWavePaths] = useState([]); 
  const [featuresVisibility, setFeaturesVisibility] = useState(
    new Array(7).fill(false)
  );
  const [svgWidth, setSvgWidth] = useState(800);
  const containerRef = useRef(null);

  const features = [
    { 
      color: '#E53E3E', 
      title: 'Foundation', 
      description: 'Seamlessly integrate mind, body, and data to unlock your fullest potential',
      icon: <FaHome className="w-6 h-6" />,
    },
    { 
      color: '#ED8936', 
      title: 'Creativity', 
      description: 'Discover your inner force - Your AI-powered companion for personal evolution and mindful living',
      icon: <FaFire className="w-6 h-6" />,
    },
    { 
      color: '#ECC94B', 
      title: 'Empowerment', 
      description: 'Your personalized path to growth - Where science meets intuition',
      icon: <FaSun className="w-6 h-6" />,
    },
    { 
      color: '#48BB78', 
      title: 'Connection', 
      description: 'Join a community of conscious achievers turning self-awareness into sustainable success',
      icon: <FaHeart className="w-6 h-6" />,
    },
    { 
      color: '#667EEA', 
      title: 'Insight', 
      description: 'Transform your daily experiences into meaningful insights through our research-backed approach to personal development',
      icon: <FaEye className="w-6 h-6" />,
    },
  ];

  const generateWavePaths = (progress) => {
    const totalParts = 9;
    const totalPoints = 300;
    const amplitude = 120;
    const paths = [];
  
    // Adjusted frequency range for smoother animation
    const maxFrequency = 20;
    const minFrequency = 6;
    const currentFrequency = maxFrequency + (minFrequency - maxFrequency) * progress;
  
    for (let part = 0; part < totalParts; part++) {
      let path = "M0,150 ";
      // Adjusted progress calculation to ensure waves extend fully
      const currentProgress = Math.min(
        Math.max((progress - (part * 0.1)) / 0.9, 0),
        1
      );
  
      for (let i = 1; i <= totalPoints * currentProgress; i++) {
        const wavelength = svgWidth / totalPoints;
        const frequency = currentFrequency * Math.PI * (i / totalPoints);
        const x = i * wavelength;
        const y =
          150 +
          (amplitude * Math.sin(frequency + part * Math.PI)) *
            (part % 2 === 0 ? 1 : -1);
  
        path += `L${x},${y} `;
      }
      paths.push(path);
    }
    return paths;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSvgWidth(window.innerWidth);
      const handleResize = () => setSvgWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Adjusted scroll progress calculation
      const scrollProgress = Math.abs(top) / (height - windowHeight);
      const adjustedProgress = Math.max(0, Math.min(1, scrollProgress * 1.2)); // Increased multiplier

      const newPaths = generateWavePaths(adjustedProgress);
      setWavePaths(newPaths);

      // Adjusted feature visibility calculation
      const newFeaturesVisibility = features.map((_, index) => {
        const featureShowThreshold = (index) / (features.length - 1) * 0.7; // Reduced threshold
        const featureHideThreshold = adjustedProgress > 0.95; // Increased hide threshold
        return (adjustedProgress >= featureShowThreshold) && !featureHideThreshold;
      });

      setFeaturesVisibility(newFeaturesVisibility);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [svgWidth]);

  const waveColors = [
    "#ffffff",
    "#ffffff",
    ...features.map(f => f.color)
  ];

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[300vh] flex flex-col items-center relative mt-12 mb-64" // Increased min-height
    >
      <div className="sticky top-[20vh] w-full z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${svgWidth} 300`}
          className="w-full h-[400px]"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {wavePaths.map((path, index) => (
            <path
              key={index}
              d={path}
              fill="none"
              stroke={waveColors[index % waveColors.length]}
              strokeWidth="3"
              filter="url(#glow)"
              opacity="0.8"
            />
          ))}
        </svg>
      </div>

      <div className="fixed bottom-8 left-0 right-0 z-30 flex justify-center space-x-4 px-4 overflow-x-auto">
        <AnimatePresence>
          {features.map((feature, index) => (
            featuresVisibility[index] && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="min-w-[280px] p-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-l-4 transform transition-all duration-300 ease-in-out"
                style={{
                  borderLeftColor: feature.color,
                  backgroundColor: `${feature.color}10`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    {React.cloneElement(feature.icon, { color: feature.color })}
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-gray-800"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {feature.title}
                  </motion.h3>
                </div>
                <motion.p
                  className="text-sm text-gray-600"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScrollWave;