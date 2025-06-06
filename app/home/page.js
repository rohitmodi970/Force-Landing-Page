'use client';
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import TextMarquee from "@/components/TextMarquee";
import EmailForm from "@/components/EmailForm";
import QuestionForm from "@/components/QuestionsForm";
import HeroSection from "@/components/HeroSection";
import MainContent from "@/components/MainContent";
import ModelViewer from "@/components/ModelViewer";
import ScrollWave from "@/components/SVG";
import DiaryEntryPage from "@/components/EntryPage";
import { motion } from 'framer-motion';
import BlurText from "@/components/ui/BlurText";
import GalleryComponent from "@/components/Gallery";
const Homecomp = () => {
    const [isLoading, setIsLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const words = ["You", "Everyone", "Us"];
  const words2 = ["All these", "Questions.", "Explore"];
  const [pagenter, setPagenter] = useState(false)

  useEffect(() => {
    if (iframeLoaded) {
      const timer = setTimeout(() => setIsLoading(false), 4000); // Optional delay for smoother transition
      return () => clearTimeout(timer);
    }
  }, [iframeLoaded]);
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };
  // Hook to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Smooth scrolling for 3 seconds
        let start = null;
        const duration = 3000; // 3 seconds
        const startPosition = window.scrollY;
        const distance = -window.scrollY; // Scroll to the top

        const smoothScroll = (timestamp) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const easeInOutCubic = (t) => t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2; // Ease function
          const percentage = Math.min(progress / duration, 1); // Clamp between 0 and 1
          const scrollTo = startPosition + distance * easeInOutCubic(percentage);
          window.scrollTo(0, scrollTo);
          if (progress < duration) {
            requestAnimationFrame(smoothScroll); // Continue animation
          }
        };

        requestAnimationFrame(smoothScroll); // Start animation
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const { x, y } = mousePosition;
  const size = isHovered ? 400 : 40;
  const handleEnterClick = () => {
      setPagenter(true)
      setIsLoading(true)
  }
  return (
    <>
    
    <div className={`bg-white min-h-screen max-w-screen `}>
      <Navbar />
      <div className="flex justify-center items-center">

     
      </div>
      <HeroSection />
      <div className="min-h-[100vh] relative flex flex-col bg-gradient-to-b mt-10 from-white/50 to-white justify-center items-center">
        <motion.div
          className="mask h-[100%] w-[100%] flex items-center justify-center text-orange-400 text-4xl leading-[40px] cursor-default absolute text-center"
          animate={{
            WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
            WebkitMaskSize: `${size}px`
          }}
          transition={{
            type: "tween", ease: "backOut"
          }}
          style={{
            maskImage: 'url(/pics/mask.svg)',
            backgroundColor: '#1C1C1C',
            maskRepeat: 'no-repeat',
            color: 'orange',
            maskSize: '40px'
          }}
        >
          <p
            onMouseEnter={() => { setIsHovered(true); }}
            onMouseLeave={() => { setIsHovered(false); }}
            style={{
              color: 'var(--chakra-foundation);'
            }}
            className=""
          >
            Force is your AI-powered companion for personal evolution, combining cutting-edge technology with deep human understanding. Through multimodal interaction and adaptive learning, Force helps you discover patterns, optimize daily experiences, and achieve sustainable personal growth.
          </p>
        </motion.div>
        <div
          className="absolute z-10 w-full h-32 bg-gradient-to-b from-transparent via-white/50 to-white"
          style={{
            top: '-28%',
            transform: 'translateY(70%)'
          }}
        />
        <div className="font-bold text-6xl flex justify-center items-center">
          <h1 className="text-orange-400 w-[35vw]">What is FORCE?</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-black font-medium text-3xl justify-center text-center w-[70%] tracking-tighter mt-12 hover:text-orange-400">
            Force is your AI-powered companion for personal evolution, combining cutting-edge technology with deep human understanding. Through multimodal interaction and adaptive learning, Force helps you discover patterns, optimize daily experiences, and achieve sustainable personal growth.
          </p>
        </div>
        <p className="text-orange-400 font-medium text-5xl justify-center text-center w-[100%] tracking-tighter mt-10 hover:text-white">
          Discover your direction in Life with the help of FORCE
        </p>
      </div>
      <ScrollWave />
      <GalleryComponent/>
      <MainContent />
      <Marquee />
      <div className="relative min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <ModelViewer />
        </div>
        <div className="relative z-10 ">
          <QuestionForm />
        </div>
      </div>
      <div className="h-screen bg-gradient-to-b from-black via-purple-400 to-purple-600 flex flex-col justify-center">
        <h1 className="text-5xl semibold text-white text-center hover:text-orange-400">
          Try FORCE Today!!!
        </h1>
        <div className="mt-60">
          <TextMarquee />
        </div>
        <div className="notified mt-20">
          <form className="w-[40vw] mx-auto">
            <div className="relative">
              <div className="flex gap-7 justify-center items-center"></div>
              <EmailForm />
            </div>
          </form>
        </div>
      </div>
    </div>
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 bg-orange-400 text-white p-3 rounded-full shadow-lg hover:bg-orange-500 transition duration-300"
    >
      ↑
    </button>
   
  </>
  )
}

export default Homecomp
