import React, { useRef } from 'react'

const Phone = () => {
  const videoRef = useRef();

  return (
      <div className="screen-max-width">
        <div className="mt-10 ml-36 mb-14">
          <div className="relative h-full flex-center w-[80%]">
            <div className="overflow-hidden relative scale-x-[0.90] origin-right">
              <img 
                src="./frame.png"
                alt="frame"
                className="bg-transparent relative z-10 w-full h-auto"
              />
              {/* Position the video inside the frame */}
              <div className="hiw-video absolute top-[3%] bottom-[3%] left-[3%] w-[96%] h-[93%]">
                <video 
                  className="pointer-events-none w-full h-full object-cover rounded-[4rem]" 
                  playsInline preload="none" 
                  muted autoPlay loop
                  ref={videoRef}
                >
                  <source src="./loader.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-2xl mr-12 font-bold text-center tracking-wide 
        bg-white
        text-transparent bg-clip-text 
        transform transition-all duration-300 
        hover:scale-105 hover:tracking-widest">
        FORCE : A New Way Of Living
        </h2>
        </div>
      </div>
  )
}

export default Phone;
