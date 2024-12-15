import React, { useRef, useEffect, useState } from 'react';

const ScrollWave = () => {
  const [wavePaths, setWavePaths] = useState([]); // Store paths for each part
  const [visibleFeatures, setVisibleFeatures] = useState(new Array(7).fill(false)); // Track visibility of each feature
  const containerRef = useRef(null);

  useEffect(() => {
    const generateWavePaths = (progress) => {
      const totalParts = 7;
      const totalPoints = 40;
      const amplitude = 100; // Uniform high amplitude
      const paths = [];

      for (let part = 0; part < totalParts; part++) {
        let path = 'M0,150 ';
        const startProgress = part / totalParts;
        const endProgress = (part + 1) / totalParts;
        const currentProgress = Math.min(
          Math.max((progress - startProgress) / (endProgress - startProgress), 0),
          1
        );

        for (let i = 1; i <= totalPoints * currentProgress; i++) {
          const wavelength = 800 / totalPoints;
          const frequency = 2 * Math.PI * (i / totalPoints);

          // Wave traversing both sides of the axis
          const x1 = (i - 0.5) * wavelength;
          const y1 = 150 + amplitude * Math.sin(frequency);
          const x2 = i * wavelength;
          const y2 = 150 - amplitude * Math.sin(frequency);

          path += `Q${x1},${y1} ${x2},${y2} `;
        }
        paths.push(path);
      }
      return paths;
    };

    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1) with a delay factor
      const scrollProgress = 1 - top / windowHeight;
      const scrollSpeedFactor = 0.5; // Adjust this value to make the SVG appear slower
      const delayedProgress = Math.max(0, Math.min(1, scrollProgress * scrollSpeedFactor));  // Adjusted progress to allow full scroll

      const newPaths = generateWavePaths(delayedProgress);
      setWavePaths(newPaths);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Intersection Observer setup to track visibility of feature cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleFeatures = [...visibleFeatures];
        entries.forEach(entry => {
          const index = parseInt(entry.target.dataset.index);
          newVisibleFeatures[index] = entry.isIntersecting;
        });
        setVisibleFeatures(newVisibleFeatures);
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => observer.observe(card));

    return () => {
      featureCards.forEach(card => observer.unobserve(card));
    };
  }, [visibleFeatures]);

  const colors = ["#000000", "#e74c3c", "#2ecc71", "#9b59b6", "#f1c40f", "#1abc9c", "#e67e22"];
  const features = [
    "Feature 1: Dynamic scrolling wave.",
    "Feature 2: High amplitude transitions.",
    "Feature 3: Smooth quadrant traversals.",
    "Feature 4: Responsive SVG rendering.",
    "Feature 5: Optimized for performance.",
    "Feature 6: Vibrant color segmentation.",
    "Feature 7: Scroll-activated interactivity."
  ];

  return (
    <div
  ref={containerRef}
  className="w-full min-h-[200vh] flex flex-col items-center justify-start relative mt-16 z-10" // Add z-index here
>
  <div className="sticky top-[20vh] z-0 w-full">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      {wavePaths.map((path, index) => (
        <path
          key={index}
          d={path}
          fill="none"
          stroke={colors[index % colors.length]} // Ensure it cycles through all the colors
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  </div>

  {/* Feature Cards */}
  <div className="w-full z-30 mt-16 flex flex-wrap justify-center gap-4">
    {features.map((feature, index) => (
      <div
        key={index}
        className={`feature-card w-48 p-4 bg-white shadow-lg rounded-lg border text-center transition-opacity duration-500 ${visibleFeatures[index] ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundColor: index === 0 ? `#0000FF50` : `${colors[index % colors.length]}50`,
          borderLeft: index === 0 ? `4px solid #87CEEB` : `4px solid ${colors[index % colors.length]}`,
          borderRight: index === 0 ? `4px solid #87CEEB` : `4px solid ${colors[index % colors.length]}`,
          transformStyle: 'preserve-3d',
          transform: `rotateY(${index % 2 === 0 ? '10' : '-10'}deg)`,
          zIndex: 40, // Ensure feature cards have the highest z-index
        }}
        data-index={index} // Store the index to track visibility
      >
        <h3 className="text-lg font-bold" style={{ color: index === 0 ? `#0000FF` : colors[index % colors.length] }}>
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
