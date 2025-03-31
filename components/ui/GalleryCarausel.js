import React, { useState, useEffect } from "react";

const GalleryCarousel = () => {
  const images = [
    { id: 1, src: "/pics/11.png", alt: "Gallery image 1", color: "bg-zinc-600" },
    { id: 2, src: "/pics/12.png", alt: "Gallery image 2", color: "bg-amber-500" },
    { id: 3, src: "/pics/13.png", alt: "Gallery image 3", color: "bg-emerald-800" },
    { id: 4, src: "/pics/14.png", alt: "Gallery image 4", color: "bg-stone-400" },
    { id: 5, src: "/pics/15.png", alt: "Gallery image 5", color: "bg-red-400" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-white">
      {/* Left Side Background */}
      <div className={`absolute left-0 w-[15vw] h-full ${images[currentIndex].color} transition-all duration-500`} />

      {/* Image Container */}
      <div className="relative w-[80vw] h-[80vh] overflow-hidden bg-gray-200 rounded-lg shadow-lg">
        <div className="relative w-full h-full transition-transform duration-700 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[(currentIndex - 1 + images.length) % images.length].src})` }}>
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-start px-6">
         <button
                        onClick={goToPrevious}
                        className="bg-white text-black p-3 px-8 z-10 bg-opacity-80 hover:bg-opacity-100 -mt-5"
                    >
                        ←
                    </button>

                    <button
                        onClick={goToNext}
                        className="bg-white text-black p-3 px-8 z-10 bg-opacity-80 hover:bg-opacity-100 -mt-5"
                    >
                        →
                    </button>
        </div>
      </div>

      {/* Thumbnail Preview */}
      <div className="absolute bottom-0 right-10 w-[22vw] h-[22vh] bg-pink-800 overflow-hidden shadow-lg transition-all duration-300">
        <img
          src={images[(currentIndex + 1) % images.length].src}
          alt="Next image thumbnail"
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        />
      </div>
    </div>
  );
};

export default GalleryCarousel;
