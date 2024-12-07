import React, { useState,useEffect } from 'react'
import { HiArrowLongRight } from "react-icons/hi2";
import { motion } from "framer-motion"; // Import Framer Motion
import Navbar from './Navbar';
const HeroSection = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [iframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        if (iframeLoaded) {
          const timer = setTimeout(() => setIsLoading(false), 4000); // Optional delay for smoother transition
          return () => clearTimeout(timer);
        }
      }, [iframeLoaded]);

// New animation for the FORCE text (enter, stay, exit)
const forceTextVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: [0, 1, 1, 0], // Enter, stay, exit
      scale: [0.5, 1.2, 1.2, 0.5], // Scale up, stay, scale down
      transition: {
        duration: 4, // Total cycle duration (enter, stay, exit)
        ease: "easeInOut",
        repeat: Infinity, // Loop infinitely
        repeatType: "loop", // Repeat in a loop
        times: [0, 0.2, 0.8, 1], // Adjust timing for entering, staying, and exiting
      },
    },
  };

    const letters = [
        { char: "F" },
        { char: "O" },
        { char: "R" },
        { char: "C" },
        { char: "E" },
      ];
  return (
    <>
    {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black z-50">
          <video
            src="/loader.mp4"
            autoPlay
            muted
            className="w-full h-full object-cover"
          ></video>
        </div>

      )}
      <div className="bg-black min-h-screen max-w-screen">
      <Navbar />
        
        <div className="relative flex justify-start items-center pr-10">
          <iframe
            src="https://my.spline.design/worldplanet-0c87453dc26e544d937be04d381e96f6/"
            width="120%"
            height="800"
            style={{
              pointerEvents: "none",
              filter: "brightness(1.5)",
            }}
            
            onLoad={() => setIframeLoaded(true)} // Mark iframe as loaded
          ></iframe>
          <div className="absolute bottom-0 right-0 w-80 h-20 bg-black border-4 border-black"></div>
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-black bg-transparent w-[20vw] ml-[15vw]">
            <div className="flex justify-center gap-2 pl-30">
              {letters.map((letter, index) => (
                <motion.div
                  key={index}
                  className="text-9xl font-extrabold text-chakra-foundation"
                  initial="initial"
                  animate="animate"
                  variants={forceTextVariants}
                  transition={{
                    duration: 4, // Total duration for each cycle
                    delay: index * 0.2, // Stagger delay for each letter's entry
                  }}
                >
                  {letter.char}
                </motion.div>
              ))}
            </div>
            <p className="font-semibold translate-x-1/5 text-center text-2xl text-wrap text-white mt-4">
            Discover your Force: Where human potential meets AI-powered evolution
            </p>
            <button className="absolute right-[20%] px-9 py-2 rounded-full bg-chakra-foundation text-white text-xl mt-5 text-nowrap flex items-center justify-center gap-3">
              <span>Learn more!</span>
              <HiArrowLongRight />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection
