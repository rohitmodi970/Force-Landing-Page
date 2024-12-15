import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform ,useScroll} from "framer-motion";

const useWordCycle = (wordsArray, intervalTime) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordsArray.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [wordsArray, intervalTime]);

  return wordsArray[currentWordIndex];
};

const cards = [
  {
    url: "/pics/11.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/pics/12.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/pics/13.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/pics/14.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/pics/15.jpg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/pics/11.jpg",
    title: "Title 1",
    id: 6,
  },
  {
    url: "/pics/12.jpg",
    title: "Title 2",
    id: 7,
  },
];

const Marquee = () => {
  return (
    <div className="bg-neutral-800">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const words = ["You", "Us" ,"Everyone"];
  const words2 = ["Welcome", "To the future of human potential.", " Welcome to FORCE."];
  const currentWord = useWordCycle(words, 1000);
  const currentWord2 = useWordCycle(words2, 1000);

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Text Container */}
        <div className="absolute z-30 text-center">
          <div className="font-bold text-6xl flex justify-center items-center">
            <h1 className="text-chakra-communication w-[30vw]">Our Promise To </h1>
            <span className="text-white w-[10vw] text-center">
              {currentWord}.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-white font-medium text-3xl w-[80%] tracking-tighter mt-12 hover:text-chakra-communication ">
            We hold space for your journey. We honor your unique path. We evolve with your trust. We protect your truth. We amplify your force.
            </p>
            <h2 className="font-bold text-chakra-communication  text-6xl mt-6">
              {currentWord2}
            </h2>
          </div>
        </div>

        {/* Cards Container */}
        <motion.div style={{ x }} className="flex gap-6 z-20 w-max overflow">
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  const cardRef = useRef(null);
  
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animations for tilt
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  // Rotation and perspective transformations
  const rotateX = useTransform(springY, [-0.5, 0.5], [-15, 15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [15, -15]);

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        transform: "translateZ(50px)"
      }}
      className="group relative h-[600px] w-[800px] overflow-hidden bg-black rounded-2xl shadow-2xl cursor-pointer transition-all duration-300"
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          translateZ: "80px",
          scale: 1.1
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-125 group-hover:brightness-110"
      />

      {/* Glow Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"
      />

      {/* Subtle Hover Highlight */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
        className="absolute inset-0 bg-white/20 z-20 mix-blend-overlay"
      />

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {card.title}
        </h3>
      </div>
    </motion.div>
  );
};

export default Marquee;
