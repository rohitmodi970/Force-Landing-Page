'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLongRight } from "react-icons/hi2";
// import { motion } from "framer-motion"; // Import Framer Motion
const CursorEffect = () => {
  const media = [
    "/pics/11.png",
    "/pics/12.png",
    "/pics/13.png",
    "/pics/14.png",
    "/pics/15.png",
    "/pics/02.mp4",
    "/pics/01.mp4",
    "/pics/03.mp4",
  ];

  const [index, setIndex] = useState(0); // Current index of media

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the index to show the next media item, looping back to the start
      setIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 15000); // Change media every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [media.length]);

  const variants = {
    enter: { opacity: 0, x: 50 }, // Initial position and transparency
    center: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // Animate to center
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } }, // Exit to the left
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

  const { x, y } = mousePosition;
  const size = isHovered ? 200 : 40;

  const renderMedia = (mediaItem) => {
    const isVideo = mediaItem.endsWith('.mp4');

    if (isVideo) {
      return (
        <motion.video
          key={mediaItem}
          src={mediaItem}
          autoPlay
          loop
          muted
          className="w-fit h-auto"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        />
      );
    }

    return (
      <motion.img
        key={mediaItem}
        src={mediaItem}
        alt="Display"
        className="w-full h-auto"
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    );
  };

  return (
    <div className="main h-[100vh] bg-black flex flex-col items-center justify-center">
      <motion.div
        className="first mask h-[100%] w-[100%] flex items-center justify-center bg-white overflow-hidden cursor-none absolute"
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
        }}
      >
        {/* First media */}
        <AnimatePresence mode="wait">
          {renderMedia(media[index])}
        </AnimatePresence>
      </motion.div>
      <div className="second body h-[100%] w-[100%] flex items-center justify-center bg-black overflow-hidden">
        {/* Second media */}
        <AnimatePresence mode="wait">
          {renderMedia(media[(index + 1) % media.length])}
        </AnimatePresence>
      </div>
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
  );
};

export default CursorEffect;









//case -1




// 'use client'

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const CursorEffect = () => {
//   const images = [
//     "/pics/11.png",
//     "/pics/12.png",
//     "/pics/13.jpg",
//     "/pics/14.jpg",
//     "/pics/15.jpg",
//     "/pics/11.jpg",
//     "/pics/12.jpg",
//   ];

//   const [index, setIndex] = useState(0); // Current index of images

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Update the index to show the next image, looping back to the start
//       setIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000); // Change image every 2 seconds

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [images.length]);

//   const variants = {
//     enter: { opacity: 0, x: 50 }, // Initial position and transparency
//     center: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // Animate to center
//     exit: { opacity: 0, x: -50, transition: { duration: 0.5 } }, // Exit to the left
//   };

// //   // Hook to track mouse position
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false)

//   useEffect(() => {
//     const updateMousePosition = (event) => {
//       setMousePosition({ x: event.clientX, y: event.clientY });
//     };

//     window.addEventListener('mousemove', updateMousePosition);

//     return () => {
//       window.removeEventListener('mousemove', updateMousePosition);
//     };
//   }, []);

//   const { x, y } = mousePosition;
//   const size = isHovered ? 400 : 40

//   return (
//     <div className="main h-[100vh] bg-black flex flex-col items-center justify-center">
//       <motion.div className="first mask h-[100%] w-[100%] flex items-center justify-center bg-white overflow-hidden cursor-none absolute"
      
//               animate={{
//           WebkitMaskPosition: `${x-size/2}px ${y-size/2}px`,
//           WebkitMaskSize:`${size}px`
//         }}
//         transition={{
//           type:"tween" , ease:"backOut"
//         }}
//       >
//         {/* First image */}
//         <AnimatePresence mode="wait">
//           <motion.img
//           onMouseEnter={()=>{setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}}
//             key={images[index]}
//             src={images[index]}
//             alt="First Display"
//             className="w-[100%] h-auto"
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//           />
//         </AnimatePresence>
//       </motion.div>
//       <div className="second body h-[1100%] w-[100%] flex items-center justify-center bg-black overflow-hidden">
//         {/* Second image */}
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={images[(index + 1) % images.length]}
//             src={images[(index + 1) % images.length]}
//             alt="Second Display"
//             className="w-fit h-auto"
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//           />
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default CursorEffect;


//case -2


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const CursorEffect = () => {
//   // Hook to track mouse position
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false)

//   useEffect(() => {
//     const updateMousePosition = (event) => {
//       setMousePosition({ x: event.clientX, y: event.clientY });
//     };

//     window.addEventListener('mousemove', updateMousePosition);

//     return () => {
//       window.removeEventListener('mousemove', updateMousePosition);
//     };
//   }, []);

//   const { x, y } = mousePosition;
//   const size = isHovered ? 400 : 40
//   return (
//     <div className="main h-[100vh] bg-black">
//       <motion.div
//         className="mask h-[100%] w-[100%] flex items-center justify-center text-orange-400 text-6xl leading-[64px] cursor-default absolute"
//         animate={{
//           WebkitMaskPosition: `${x-size/2}px ${y-size/2}px`,
//           WebkitMaskSize:`${size}px`
//         }}
//         transition={{
//           type:"tween" , ease:"backOut"
//         }}
//       >
//         <p onMouseEnter={()=>{setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}}
//           className=''
//           >
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, maiores aliquam! Et id deserunt illo dolores porro
//           nesciunt corrupti placeat rem omnis quo libero voluptas nulla mollitia excepturi, saepe aperiam.
//         </p>
//       </motion.div>

//       <div className="body h-[100%] w-[100%] flex items-center justify-center text-orange-400 text-6xl leading-[64px] cursor-default bg-black">
//         <p
//         >
//           Experience the ultimate in web design with our cutting-edge technology and innovative solutions. Ab non quod vero saepe
//           accusamus rerum. Repudiandae, facere assumenda ipsam commodi sint nulla blanditiis consequuntur amet tenetur id
//           quisquam minus.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CursorEffect;

//case -3
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const CursorEffect = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);
//   const [theme, setTheme] = useState('dark'); // Theme state: 'dark' or 'light'

//   useEffect(() => {
//     const handleMouseMove = (event) =>
//       setMousePosition({ x: event.clientX, y: event.clientY });

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

//   const size = isHovered ? 400 : 40;

//   return (
//     <div
//       className={`main h-screen transition-colors duration-500 ${
//         theme === 'dark' ? 'bg-black text-orange-400' : 'bg-white text-blue-600'
//       }`}
//     >
//       <motion.div
//         className="mask h-full w-full flex items-center justify-center absolute"
//         animate={{
//           WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
//             mousePosition.y - size / 2
//           }px`,
//           WebkitMaskSize: `${size}px`,
//         }}
//         transition={{ type: 'tween', ease: 'backOut' }}
//       >
//         <div
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <button
//             onClick={toggleTheme}
//             className={`theme-toggle-btn p-4 w-20 h-20 rounded-full relative overflow-hidden ${
//               theme === 'dark'
//                 ? 'bg-white border-orange-400'
//                 : 'bg-black border-blue-600'
//             } border-2 transition-transform duration-300`}
//             aria-label="Toggle Theme"
//           >
//             {/* Glowing Effect */}
//             <div
//               className="absolute inset-0 z-0 rounded-full opacity-0 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 animate-light-beam"
//             ></div>
//           </button>
//         </div>
//       </motion.div>

//       <div className="content h-full w-full flex items-center justify-center">
//         <button
//           onClick={toggleTheme}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           className={`theme-toggle-btn p-4 w-20 h-20 rounded-full relative overflow-hidden ${
//             theme === 'dark'
//               ? 'bg-white border-orange-400'
//               : 'bg-black border-blue-600'
//           } border-2 transition-transform duration-300`}
//           aria-label="Toggle Theme"
//         >
//           {/* Glowing Effect */}
//           <div
//             className="absolute inset-0 z-0 rounded-full opacity-0 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 animate-light-beam"
//           ></div>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CursorEffect;
