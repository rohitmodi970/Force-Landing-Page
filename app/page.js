'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Navbar from "@/components/Navbar";
import { HiArrowLongRight } from "react-icons/hi2";
import Marquee from "@/components/Marquee";
import TextMarquee from "@/components/TextMarquee";
import EmailForm from "@/components/EmailForm";
import InteractiveQuestionnaire from "@/components/Questionaire"
import Phone from "@/components/PhoneFrame";
// Reusable Hook for Cycling Words
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const words = ["You", "Everyone", "Us"];
  const words2 = ["All these", "Questions.", "Explore"];
  const currentWord = useWordCycle(words, 2000); // Cycle every 2 seconds
  const currentWord2 = useWordCycle(words2, 2000); // Cycle every 2.5 seconds

  useEffect(() => {
    if (iframeLoaded) {
      const timer = setTimeout(() => setIsLoading(false), 3500); // Optional delay for smoother transition
      return () => clearTimeout(timer);
    }
  }, [iframeLoaded]);

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
                  className="text-9xl font-extrabold text-orange-400"
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
            <p className="font-semibold translate-x-1/4 text-right text-3xl text-wrap text-white mt-4">
              We Listen To You Like A Friend Does
            </p>
            <button className="absolute right-[50%] px-9 py-2 rounded-full bg-orange-400 text-white text-xl mt-5 text-nowrap flex items-center justify-center gap-3">
              <span>Get Started</span>
              <HiArrowLongRight />
            </button>
          </div>
        </div>
        <div className="h-600px">
          <div className="flex flex-col justify-center items-center">
            {["journal through your", "life journey with", "FORCE"].map(
              (value, index) => (
                <div
                  key={index}
                  className="text-orange-400 text-8xl font-medium capitalize z-10 cursor-pointer tracking-tighter mt-4"
                >
                  {value}
                </div>
              )
            )}
            <p className="text-white text-2xl font-medium mt-2">
              As comforting as talking to your friend
            </p>
            <button className="px-6 py-3 rounded-full bg-orange-400 text-white text-xl mt-5 text-nowrap flex items-center justify-center gap-5 hover:bg-white hover:text-orange-400 hover:scale-105 transition-transform duration-1000">
              Start today
            </button>
            <p className="text-white font-bold mt-3">It's free</p>
          </div>
        </div>
        <Phone/>
        <div className="h-[50vh]">
          <div className="font-bold text-6xl flex justify-center items-center">
            <h1 className="text-orange-400  w-[35vw]">Let's Know About</h1>
            <span className="text-white w-[10vw] text-center">
              {currentWord}.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-white font-medium text-3xl tracking-tighter mt-32 hover:text-orange-400">
              Tell us about yourself through the inventive questions we came
              up with to help your mind
            </p>
            <h2 className="font-bold text-orange-400 text-6xl mt-3">{currentWord2}</h2>
          </div>
        </div>
        <Marquee />
        <div className="h-screen bg-gradient-to-b from-black to-orange-400 flex flex-col justify-center">
          <h1 className="text-5xl semibold text-white text-center hover:text-orange-400">
            Try FORCE Today !!!
          </h1>
          <div className="mt-60">
            <TextMarquee />
          </div>
          <div className="notified mt-20">
            <form className="w-[40vw] mx-auto ">
              <div className="relative">
                <div className="flex gap-7 justify-center items-center"></div>
                <EmailForm />
              </div>
            </form>
          </div>
        </div>
      </div>
      <InteractiveQuestionnaire />
    </>
  );
}
