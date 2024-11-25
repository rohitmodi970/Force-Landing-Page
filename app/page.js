'use client'
import Navbar from "@/components/Navbar";
import { HiArrowLongRight } from "react-icons/hi2";
import { useState, useEffect } from "react";
import Marquee from "@/components/Marquee";
import TextMarquee from "@/components/TextMarquee";
import EmailForm from "@/components/EmailForm";

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

export default function Home() {
  const words = ['You', 'Everyone', 'Us'];
  const words2 = ['All these', 'Questions.', 'Explore'];

  const currentWord = useWordCycle(words, 1000);
  const currentWord2 = useWordCycle(words2, 1000);

  return (

    <>
      <Navbar />
      <div className="min-h-screen max-w-screen">

        <div className="relative flex justify-start items-center">
          <iframe
            src="https://my.spline.design/neurons-9d250a62bdf628bc1982cc69567cf9a1/"
            width="100%"
            height="700"
          ></iframe>
          <div className="absolute text-black bg-transparent w-[20vw] ml-[15vw]">
            <h1 className="text-9xl font-extrabold text-blue-600">FORCE</h1>
            <p className="font-semibold text-3xl text-wrap mt-4">We Listen To You Like A Friend Does</p>
            <button className="px-9 py-2 rounded-full bg-blue-500 text-white text-xl mt-5 text-nowrap flex items-center justify-center gap-5"><span>Get Started</span><HiArrowLongRight /></button>
          </div>

        </div>
        <div className="h-screen ">
          <div className="flex flex-col justify-center items-center">

            {['journal through your', 'life journey with', 'FORCE'].map((value, index) => {
              return (
                <div key={index} className="text-blue-400 text-8xl font-medium capitalize z-10 cursor-pointer tracking-tighter mt-4">
                  {value}
                </div>
              );
            })}
            <p className="text-gray-600 text-2xl font-medium mt-2">As comforting as talking to your friend</p>
            <button className="px-6 py-3 rounded-full bg-zinc-900 text-white text-xl mt-5 text-nowrap flex items-center justify-center gap-5 hover:bg-blue-500 hover:scale-105 transition-transform duration-1000">Start today</button>
            <p className="text-zinc-800 font-bold mt-3">It's free</p>
          </div>
          <div className="text-8xl text-center">Laptop 3d pic</div>
        </div>
        <div className="h-[50vh]">
          <div className="font-bold text-6xl flex justify-center items-center">
            <h1 className="text-blue-500  w-[35vw]">Let's Know About</h1>
            <span className="text-zinc-900 w-[10vw] text-center">{currentWord}.</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-blue-500 font-medium text-3xl tracking-tighter mt-32 hover:text-zinc-900">Tell us about yourself through the inventive questions we came up with to help your mind</p>
            <h2 className="font-bold text-6xl mt-3">{currentWord2}</h2>

          </div>
        </div>
        <Marquee />
        <div className="h-screen bg-gradient-to-b from-blue-100 to-blue-400 flex flex-col justify-center">
          <h1 className="text-5xl text-blue-500 text-center">Are You Thrilled ?</h1>
          <div className="mt-60">
            <TextMarquee />
          </div>
          <div className="notified mt-20">
            <form className="w-[40vw] mx-auto ">

              <div className="relative">
                
                <div className="flex  gap-7 justify-center items-center">

                </div>
                  <EmailForm />
              </div>
            </form>
          </div>
        </div>

      </div>
    </>
  );
}
