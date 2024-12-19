import React, { useState, useEffect } from 'react';

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

const MediaComponent = ({ slide, isVisible }) => {
  return (
    <div
      className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${slide.image})`,
        filter: 'brightness(0.6)',
      }}
    />
  );
};

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

 

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      {/* Background Media */}
      {slides.map((slide, index) => (
        <MediaComponent
          key={index}
          slide={slide}
          isVisible={index === currentSlide}
        />
      ))}

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl transition-all duration-500 transform">
            {/* Title */}
            <h1 className="text-6xl font-bold mb-8">
              <span className="block transition-all duration-500 transform">
                {slides[currentSlide].title[0]}
              </span>
              <span className="block transition-all duration-500 transform">
                {slides[currentSlide].title[1]}
              </span>
            </h1>

            {/* Creator Info */}
            <div className="flex items-center space-x-4 mt-8">
              <div>
                <h3 className="text-xl font-semibold">
                  {slides[currentSlide].creator}
                </h3>
                <p className="text-gray-300">{slides[currentSlide].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
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
      </div>
    </div>
  );
}