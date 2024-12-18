'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Phone from './PhoneFrame'

const MainContent = () => {


  // Hook to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const { x, y } = mousePosition;
  const size = isHovered ? 300 : 40

  return (
    <>
    <div className="h-[100vh] cursor-none">
    <motion.div
        className="mask h-[100%] w-[100%] flex items-center justify-center text-orange-400 text-6xl leading-[64px]  absolute"
        animate={{
          WebkitMaskPosition: `${x-size/2}px ${y-size/2}px`,
          WebkitMaskSize:`${size}px`
        }}
        transition={{
          type:"tween" , ease:"backOut"
        }}
      >
        <p onMouseEnter={()=>{setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}}
          className=' text-3xl w-[75%] text-green-400 text-center font-medium mb-12'
          >
           Imagine an AI companion that understands not just what you do, but how you evolve. Force maps the intricate patterns of your daily experiences - every thought, interaction, and decision - transforming them into a tapestry of insights. Like a skilled navigator in the vast ocean of human consciousness, it helps you recognize unseen currents in your behavior, illuminate paths to growth, and unlock potential you never knew existed.
        </p>
      </motion.div>
          <div className="flex flex-col justify-center mt-48 items-center ">
            {["journal through your", "life journey with", "FORCE"].map(
              (value, index) => (
                <div
                  key={index}
                  className="text-chakra-empowerment text-7xl font-medium capitalize z-10 cursor-pointer tracking-tighter mt-4"
                >
                  {value}
                </div>
              )
            )}
            <p className="text-chakra-empowerment text-2xl w-[80%] text-center font-medium mt-20">
            Imagine an AI companion that understands not just what you do, but how you evolve. Force maps the intricate patterns of your daily experiences - every thought, interaction, and decision - transforming them into a tapestry 
            </p>
            <p className="text-chakra-connection text-2xl w-[80%] text-center font-medium mt-0">
            of insights. Like a skilled navigator in the vast ocean of human consciousness, it helps you recognize unseen currents in your behavior, illuminate paths to growth, and unlock potential you never knew existed.
            </p>
            <button className="px-6 py-3 rounded-full bg-chakra-connection text-white text-xl mt-20 text-nowrap flex items-center justify-center gap-5 hover:bg-white hover:text-green-400 hover:scale-105 transition-transform duration-1000 z-10 cursor-pointer">
              Start today
            </button>
            <p className="text-black font-bold mt-10">Find- The QR-Code to download</p>
          </div>
        </div>
        <Phone/>
    </>
  )
}

export default MainContent
