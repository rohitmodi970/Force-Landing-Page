'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLongRight } from 'react-icons/hi2';

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

  const [index, setIndex] = useState(0);

  // Auto-change interval
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [media.length]);

  // Media animation variants
  const mediaVariants = {
    initial: { opacity: 0, scale: 1.3 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 25,
        duration: 1.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.3,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 25,
      },
    },
  };

  const letters = [
    { char: 'F' },
    { char: 'O' },
    { char: 'R' },
    { char: 'C' },
    { char: 'E' },
  ];

  const forceTextVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: [0, 1, 1, 0],
      y: [50, 0, 0, 50],
      scale: [0.8, 1.2, 1.2, 0.8],
      transition: {
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
        times: [0, 0.3, 0.7, 1],
      },
    },
  };

  const renderMedia = (mediaItem) => {
    const isVideo = mediaItem.endsWith('.mp4');
    const commonProps = {
      variants: mediaVariants,
      initial: 'initial',
      animate: 'animate',
      exit: 'exit',
      className: `${isVideo ? 'w-auto h-auto max-h-screen' : 'w-full h-full object-cover rounded-lg shadow-xl'}`,
    };

    if (isVideo) {
      return (
        <motion.video
          key={mediaItem}
          {...commonProps}
          src={mediaItem}
          autoPlay
          loop
          muted
        />
      );
    }

    return (
      <motion.img
        key={mediaItem}
        {...commonProps}
        src={mediaItem}
        alt="Display"
      />
    );
  };

  return (
    <div className="main h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {renderMedia(media[index])}
      </AnimatePresence>

      {/* Overlay for Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>

      {/* Text and Button Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
        <div className="flex justify-center gap-3 mb-4">
          {letters.map((letter, i) => (
            <motion.div
              key={i}
              className="text-9xl font-extrabold text-gradient bg-clip-text   text-red-500 "
              initial="initial"
              animate="animate"
              variants={forceTextVariants}
              transition={{
                duration: 4,
                delay: i * 0.2,
              }}
            >
              {letter.char}
            </motion.div>
          ))}
        </div>

        <p className="font-medium text-2xl md:text-3xl leading-snug max-w-3xl mx-auto">
          Unlock your potential: Harness AI-driven insights to transform your future.
        </p>

        <button className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white text-lg font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
          <span>Learn More</span>
          <HiArrowLongRight size={24} />
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
