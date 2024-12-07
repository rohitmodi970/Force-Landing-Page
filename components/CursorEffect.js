'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorEffect = () => {
  const media = [
    "/pics/11.jpg",
    "/pics/12.jpg",
    "/pics/13.jpg",
    "/pics/01.mp4",
    "/pics/14.jpg",
    "/pics/02.mp4",
    "/pics/15.jpg",
    "/pics/03.mp4",
  ];

  const [index, setIndex] = useState(0); // Current index of media

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the index to show the next media item, looping back to the start
      setIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 5000); // Change media every 5 seconds

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

  const { x, y } = mousePosition;
  const size = isHovered ? 400 : 40;

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
        className="w-fit h-auto"
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
//     "/pics/11.jpg",
//     "/pics/12.jpg",
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
