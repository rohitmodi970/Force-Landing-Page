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
    </>
  )
}

export default MainContent
