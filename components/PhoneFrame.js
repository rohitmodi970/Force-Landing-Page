import React, { useRef } from 'react'

const Phone = () => {
  const videoRef = useRef();

  return (
      <div className="screen-max-width">
        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center w-[95%]">
            <div className="overflow-hidden relative scale-x-[0.95] origin-right">
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
          <p className="text-gray font-semibold text-center mt-3">FORCE : A New Way Of Living</p>
        </div>
      </div>
  )
}

export default Phone;
