import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    title: ["For your", "real fans"],
    creator: "Creator Community",
    description: "How creators are energizing their communities, and what's coming next",
    image: "/pics/suun.mp4",
    type: "video",
    videoUrl: "/pics/suun.mp4"
  },
  {
    title: ["Your wildest", "creative reality"],
    creator: "Jade Novah",
    description: "Fusing her loves of music, writing, and comedy",
    image: "/pics/13.png",
    type: "video",
    videoUrl: "/pics/01.mp4"
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
    videoUrl: "/pics/03.mp4"
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
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (isVisible && slide.type === 'video') {
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play()
          .then(() => {
            setIsVideoPlaying(true);
            
            // Set a timeout to stop video after 8 seconds or when it ends
            const videoTimer = setTimeout(() => {
              video.pause();
              setIsVideoPlaying(false);
            }, 8000);

            // Clean up listener for video end
            const handleVideoEnd = () => {
              clearTimeout(videoTimer);
              setIsVideoPlaying(false);
            };

            video.addEventListener('ended', handleVideoEnd);

            return () => {
              clearTimeout(videoTimer);
              video.removeEventListener('ended', handleVideoEnd);
            };
          })
          .catch(error => console.error("Video playback failed:", error));
      }
    }
  }, [isVisible, slide]);

  if (slide.type === 'video') {
    return (
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <video
          ref={videoRef}
          src={slide.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            objectFit: 'cover', 
            filter: 'brightness(0.6)',
            aspectRatio: '9/16' // 9:16 ratio
          }}
          muted
          playsInline
        />
      </div>
    );
  }

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
    }, 8000); // Changed to 8000ms to match video duration

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
          xmlns="http://www.w3.org/6000/svg"
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