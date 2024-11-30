'use client';
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import TextMarquee from "@/components/TextMarquee";
import EmailForm from "@/components/EmailForm";
import QuestionForm from "@/components/QuestionsForm";
import HeroSection from "@/components/HeroSection";
import MainContent from "@/components/MainContent";
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
  const [isLoading, setIsLoading] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const words = ["You", "Everyone", "Us"];
  const words2 = ["All these", "Questions.", "Explore"];
  const currentWord = useWordCycle(words, 2000); // Cycle every 2 seconds
  const currentWord2 = useWordCycle(words2, 2000); // Cycle every 2.5 seconds

  useEffect(() => {
    if (iframeLoaded) {
      const timer = setTimeout(() => setIsLoading(false), 4000); // Optional delay for smoother transition
      return () => clearTimeout(timer);
    }
  }, [iframeLoaded]);

  

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
        <HeroSection/>
        
        
        <MainContent/>
        <div className="h-[45vh]">
          <div className="font-bold text-6xl flex justify-center items-center">
            <h1 className="text-orange-400  w-[35vw]">Let's Know About</h1>
            <span className="text-white w-[10vw] text-center">
              {currentWord}.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-white font-medium text-3xl tracking-tighter mt-12 hover:text-orange-400">
              Tell us about yourself through the inventive questions we came
              up with to help your mind
            </p>
            <h2 className="font-bold text-orange-400 text-6xl mt-6">{currentWord2}</h2>
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
      {/* <InteractiveQuestionnaire /> */}
      <QuestionForm/>
    </>
  );
}
