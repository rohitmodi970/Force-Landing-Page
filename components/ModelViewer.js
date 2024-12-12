import React, { useState, useEffect, useRef } from 'react';

const ModelViewer = ({ 
  src = "https://my.spline.design/worldplanet-0c87453dc26e544d937be04d381e96f6/",
  width = "100%", 
  height = "750px"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 750;

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `rgba(255, 255, 255, ${Math.random()})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create particles
    const particlesArray = [];
    const numberOfParticles = 200;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(
        Math.random() * canvas.width, 
        Math.random() * canvas.height
      ));
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = 750;
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [isLoaded]);

  return (
    <div style={{ position: 'relative', width: width, height: height }}>
      <iframe 
        src={src}
        width="100%"
        height="100%"
        style={{ 
          pointerEvents: "none", 
          filter: "brightness(1.5)",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
        onLoad={() => setIsLoaded(true)}
        title="Spline 3D Model"
      />
      
      {/* Bottom Black Bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60px',
        backgroundColor: 'black',
        zIndex: 2
      }} />

      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 3
        }}
      />
    </div>
  );
};

export default ModelViewer;