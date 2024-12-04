'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorEffect = () => {
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
  const size = isHovered ? 400 : 40
  return (
    <div className="main h-[100vh] bg-black">
      <motion.div
        className="mask h-[100%] w-[100%] flex items-center justify-center text-orange-400 text-6xl leading-[64px] cursor-default absolute"
        animate={{
          WebkitMaskPosition: `${x-size/2}px ${y-size/2}px`,
          WebkitMaskSize:`${size}px`
        }}
        transition={{
          type:"tween" , ease:"backOut"
        }}
      >
        <p onMouseEnter={()=>{setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}}
          className=''
          >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, maiores aliquam! Et id deserunt illo dolores porro
          nesciunt corrupti placeat rem omnis quo libero voluptas nulla mollitia excepturi, saepe aperiam.
        </p>
      </motion.div>

      <div className="body h-[100%] w-[100%] flex items-center justify-center text-orange-400 text-6xl leading-[64px] cursor-default bg-black">
        <p
        >
          Experience the ultimate in web design with our cutting-edge technology and innovative solutions. Ab non quod vero saepe
          accusamus rerum. Repudiandae, facere assumenda ipsam commodi sint nulla blanditiis consequuntur amet tenetur id
          quisquam minus.
        </p>
      </div>
    </div>
  );
};

export default CursorEffect;
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
