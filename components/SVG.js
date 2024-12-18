import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollWave = () => {
  const [wavePaths, setWavePaths] = useState([]); 
  const [featuresVisibility, setFeaturesVisibility] = useState(
    new Array(7).fill(false)
  );
  const [svgWidth, setSvgWidth] = useState(800);
  const containerRef = useRef(null);

  // Function to generate smooth sinusoidal wave paths
  const generateWavePaths = (progress) => {
    const totalParts = 9;
    const totalPoints = 300;
    const amplitude = 120;
    const paths = [];
  
    // Control the frequency based on the scroll progress
    const maxFrequency = 24; // Initial high frequency
    const minFrequency = 8; // Minimum frequency for the wave at the end of the scroll
    const currentFrequency = maxFrequency + (minFrequency - maxFrequency) * progress;
  
    for (let part = 0; part < totalParts; part++) {
      let path = "M0,150 ";
      const currentProgress = Math.min(
        Math.max((progress - part / totalParts) / (1 / totalParts), 0),
        1
      );
  
      for (let i = 1; i <= totalPoints * currentProgress; i++) {
        const wavelength = svgWidth / totalPoints;
  
        // Use dynamic frequency for the wave
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
    // Update SVG width on mount
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

      const { top } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress
      const scrollProgress = 1 - top / windowHeight;
      const scrollSpeedFactor = 0.5;
      const delayedProgress = Math.max(0, Math.min(1, scrollProgress * scrollSpeedFactor));

      const newPaths = generateWavePaths(delayedProgress);
      setWavePaths(newPaths);

      // Adjusted feature visibility calculation
      const newFeaturesVisibility = features.map((_, index) => {
        const featureShowThreshold = (index + 2) / (features.length + 1);
        const featureHideThreshold = delayedProgress > 0.9;
        
        return (delayedProgress >= featureShowThreshold) && !featureHideThreshold;
      });

      setFeaturesVisibility(newFeaturesVisibility);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [svgWidth]);

  const colors = [
    "#ffffff",
    "#ffffff",
    "#ff5733",
    "#33c9ff",
    "#9b59b6",
    "#2bff88",
    "#ffbd33",
    "#33ff57",
    "#ff33a8",
  ];

  const features = [
    "Feature 1: Dynamic scrolling wave.",
    "Feature 2: High amplitude transitions.",
    "Feature 3: Smooth quadrant traversals.",
    "Feature 4: Responsive SVG rendering.",
    "Feature 5: Optimized for performance.",
    "Feature 6: Vibrant color segmentation.",
    "Feature 7: Scroll-activated interactivity.",
  ];

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[200vh] flex flex-col items-center relative mt-12 mb-64"
    >
      {/* EM Wave SVG */}
      <div className="sticky top-[20vh] w-full z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${svgWidth} 300`}
          className="w-full h-[400px]"
        >
          {/* Glow filter for EM effect */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render wave paths */}
          {wavePaths.map((path, index) => (
            <path
              key={index}
              d={path}
              fill="none"
              stroke={colors[index % colors.length]}
              strokeWidth="3"
              filter="url(#glow)"
              opacity="0.8"
            />
          ))}
        </svg>
      </div>

      {/* Feature Cards Container */}
      <div className="fixed bottom-8 left-0 right-0 z-30 flex justify-center space-x-4">
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
                className="w-64 p-5 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-l-4 transform transition-all duration-300 ease-in-out"
                style={{
                  borderLeftColor: colors[(index + 2) % colors.length],
                  backgroundColor: `${colors[(index + 2) % colors.length]}20`,
                }}
              >
                <motion.h3 
                  className="text-xl font-bold mb-2 text-gray-800"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Part {index + 1}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-600"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {feature}
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