import React from 'react'
import Phone from './PhoneFrame'
const MainContent = () => {
  return (
    <>
    <div className="h-600px">
          <div className="flex flex-col justify-center items-center">
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
            <p className="text-white text-2xl w-[80%] text-center font-medium mt-8">
            Imagine an AI companion that understands not just what you do, but how you evolve. Force maps the intricate patterns of your daily experiences - every thought, interaction, and decision - transforming them into a tapestry of insights. Like a skilled navigator in the vast ocean of human consciousness, it helps you recognize unseen currents in your behavior, illuminate paths to growth, and unlock potential you never knew existed.
            </p>
            <button className="px-6 py-3 rounded-full bg-chakra-connection text-white text-xl mt-8 text-nowrap flex items-center justify-center gap-5 hover:bg-white hover:text-orange-400 hover:scale-105 transition-transform duration-1000">
              Start today
            </button>
            <p className="text-white font-bold mt-3">It's free</p>
          </div>
        </div>
        <Phone/>
    </>
  )
}

export default MainContent
