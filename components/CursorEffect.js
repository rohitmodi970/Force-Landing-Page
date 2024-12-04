'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorEffect = () => {
  const images = [
    "/pics/24df7619-6bbc-4c58-b943-d970f10ae0e6-min.jpg",
    "/pics/b1c5d76a-d8b2-4b51-91d2-c019a71c215e-min.jpg",
    "/pics/c2b1cb10-9957-4dd4-b6d0-e698d18569bd-min.jpg",
    "/pics/c3fa987a-c831-41ff-b022-ab25b50fec3e-min.jpg",
    "/pics/output-onlinepngtools-min.png",
    "/pics/24df7619-6bbc-4c58-b943-d970f10ae0e6-min.jpg",
    "/pics/b1c5d76a-d8b2-4b51-91d2-c019a71c215e-min.jpg",
  ];

  const [index, setIndex] = useState(0); // Current index of images

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the index to show the next image, looping back to the start
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  const variants = {
    enter: { opacity: 0, x: 50 }, // Initial position and transparency
    center: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // Animate to center
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } }, // Exit to the left
  };

//   // Hook to track mouse position
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
  const size = isHovered ? 400 : 40

  return (
    <div className="main h-[100vh] bg-black flex flex-col items-center justify-center">
      <motion.div className="first mask h-[100%] w-[100%] flex items-center justify-center bg-white overflow-hidden cursor-none absolute"
      
              animate={{
          WebkitMaskPosition: `${x-size/2}px ${y-size/2}px`,
          WebkitMaskSize:`${size}px`
        }}
        transition={{
          type:"tween" , ease:"backOut"
        }}
      >
        {/* First image */}
        <AnimatePresence mode="wait">
          <motion.img
          onMouseEnter={()=>{setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}}
            key={images[index]}
            src={images[index]}
            alt="First Display"
            className="w-[100%] h-auto"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          />
        </AnimatePresence>
      </motion.div>
      <div className="second body h-[1100%] w-[100%] flex items-center justify-center bg-black overflow-hidden">
        {/* Second image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={images[(index + 1) % images.length]}
            src={images[(index + 1) % images.length]}
            alt="Second Display"
            className="w-[100%] h-auto"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CursorEffect;


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
