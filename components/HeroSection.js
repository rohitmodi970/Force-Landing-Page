import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: ["For your", "real fans"],
    creator: "Creator Community",
    description: "How creators are energizing their communities, and what's coming next",
    image: "/pics/11.png",
    type: "image"
  },
  {
    title: ["Your wildest", "creative reality"],
    creator: "Jade Novah",
    description: "Fusing her loves of music, writing, and comedy",
    image: "/pics/13.png",
    type: "video",
    videoUrl: "/pics/01.mp4" // Replace with actual video URL
  },
  {
    title: ["Make it", "making art"],
    creator: "RossDraws",
    description: "Creating, sharing, and teaching the art of worldbuilding",
    image: "/pics/14.png",
    type: "image"
  },
  {
    title: ["From you", "to your crew"],
    creator: "Elliott Wilson",
    description: "Building community around hip-hop journalism",
    image: "/pics/15.png",
    type: "video",
    videoUrl: "/pics/03.mp4" // Replace with actual video URL
  },
  {
    title: ["Speak", "volumes"],
    creator: "Real Ones",
    description: "Diving deep into the biggest issues of our time",
    image: "/pics/12.png",
    type: "image"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Slide changes every 3 seconds.

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false); // Pause auto-play on manual interaction.
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false); // Pause auto-play on manual interaction.
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Media component with improved crossfade transition
  const MediaComponent = ({ slide, isVisible }) => {
    if (slide.type === "video") {
      return (
        <motion.video
          key={slide.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <source src={slide.videoUrl} type="video/mp4" />
        </motion.video>
      );
    }
    return (
      <motion.div
        key={slide.image}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${slide.image})`,
          filter: 'brightness(0.6)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      />
    );
  };

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      {/* Background Media with Crossfade */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          <MediaComponent
            key={index}
            slide={slide}
            isVisible={index === currentSlide}
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              {/* Title */}
              <h1 className="text-6xl font-bold mb-8">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {slides[currentSlide].title[0]}
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {slides[currentSlide].title[1]}
                </motion.span>
              </h1>

              {/* Creator Info */}
              <motion.div
                className="flex items-center space-x-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {slides[currentSlide].creator}
                  </h3>
                  <p className="text-gray-300">{slides[currentSlide].description}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        aria-label="Scroll down"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 78 77"
          className="w-8 h-8"
        >
          <path
            fill="currentColor"
            d="M43.5 0v59.244l27.34-26.955 6.319 6.408-35 34.507L39 76.319l-3.16-3.115-35-34.507 6.319-6.408L34.5 59.244V0h9z"
          />
        </svg>
      </motion.button>
    </div>
  );
}
