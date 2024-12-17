import React, { useRef, useEffect, useState } from "react";

const ScrollWave = () => {
  const [wavePaths, setWavePaths] = useState([]); // Store paths for each part
  const [visibleFeatures, setVisibleFeatures] = useState([]); // Track visibility of each feature card
  const [svgWidth, setSvgWidth] = useState(800); // Default SVG width
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

      // Determine which feature cards to show
      const visibility = colors.map((_, index) =>
        delayedProgress > index / colors.length
      );
      setVisibleFeatures(visibility);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [svgWidth]);

  const colors = [
    "#000000",
    "#000000",
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
      className="w-full min-h-[200vh] flex flex-col items-center relative mt-48"
    >
      {/* EM Wave SVG */}
      <div className="sticky top-[20vh] w-full z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${svgWidth} 300`}
          className="w-full h-[300px]"
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

      {/* Feature Cards */}
      <div className="w-full z-30 fixed bottom-8 flex flex-row items-center gap-4 mt-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-card w-64 p-4 bg-white shadow-lg rounded-lg text-center transition-opacity duration-500 ${
              visibleFeatures[index + 2] ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundColor: `${colors[(index + 2) % colors.length]}50`,
              borderLeft: `4px solid ${colors[(index + 2) % colors.length]}`,
              borderRight: `4px solid ${colors[(index + 2) % colors.length]}`,
            }}
          >
            <h3 className="text-lg font-bold" style={{ color: "white" }}>
              Part {index + 1}
            </h3>
            <p className="text-sm text-white">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollWave;
