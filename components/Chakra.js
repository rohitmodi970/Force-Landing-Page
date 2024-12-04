import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaFire, 
  FaSun, 
  FaHeart, 
  FaMicrophone, 
  FaEye, 
  FaCloud 
} from "react-icons/fa";

// Chakra Color Palette with Semantic Meanings
const chakraColors = [
  { 
    color: '#E53E3E', 
    title: 'Foundation', 
    description: 'Seamlessly integrate mind, body, and data to unlock your fullest potential',
    icon: <FaHome />,
    imageColor: '#E53E3E'
  },
  { 
    color: '#ED8936', 
    title: 'Creativity', 
    description: 'Discover your inner force - Your AI-powered companion for personal evolution and mindful living',
    icon: <FaFire />,
    imageColor: '#ED8936'
  },
  { 
    color: '#ECC94B', 
    title: 'Empowerment', 
    description: 'Your personalized path to growth - Where science meets intuition',
    icon: <FaSun />,
    imageColor: '#ECC94B'
  },
  { 
    color: '#48BB78', 
    title: 'Connection', 
    description: 'Join a community of conscious achievers turning self-awareness into sustainable success',
    icon: <FaHeart />,
    imageColor: '#48BB78'
  },
  { 
    color: '#4299E1', 
    title: 'Communication', 
    description: 'Clear, impactful messaging that resonates with your relations',
    icon: <FaMicrophone />,
    imageColor: '#4299E1'
  },
  { 
    color: '#667EEA', 
    title: 'Insight', 
    description: 'Transform your daily experiences into meaningful insights through our research-backed approach to personal development',
    icon: <FaEye />,
    imageColor: '#667EEA'
  },
  { 
    color: '#9F7AEA', 
    title: 'Transcendence', 
    description: 'Elevating potential beyond conventional boundaries',
    icon: <FaCloud />,
    imageColor: '#9F7AEA'
  }
];

const SpinalCordChakra = () => {
  const featureVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: (index) => index % 2 === 0 ? -100 : 100
    },
    visible: (index) => ({ 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 80,
        damping: 10,
        delay: index * 0.2
      }
    })
  };

  return (
    <div 
      className="min-h-screen h-[150vh] flex items-center justify-center p-8 overflow-hidden relative"
      style={{
        background: `
      radial-gradient(
        ellipse at center, 
        rgba(0, 0, 0, 0.9) 0%, 
        rgba(0, 0, 0, 0.95) 100%
      ),
      linear-gradient(
        135deg, 
        rgba(0, 0, 0, 0.1) 0%, 
        rgba(0, 0, 0, 0.2) 100%
      ),
      url('spine.png')
    `,
    backgroundBlendMode: 'overlay',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative'
  }}
    >
      {/* Spinal Cord Structure */}
      <motion.div 
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1 }}
        className="w-24 absolute z-10"
        style={{ height: `${chakraColors.length * 140}px` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-between">
          {chakraColors.map((chakra, index) => (
            <motion.div 
              key={`nerve-${index}`}
              className="w-1 h-16 bg-gray-700 relative"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div 
                className="absolute w-12 h-12 rounded-full -left-5 top-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{ 
                  backgroundColor: `${chakra.imageColor}20`,
                  border: `2px solid ${chakra.color}`
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                  style={{ 
                    color: chakra.color,
                    backgroundColor: `${chakra.imageColor}30`
                  }}
                >
                  {chakra.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Container */}
      <div 
        className="w-full relative"
        style={{ height: `${chakraColors.length * 140}px` }}
      >
        {chakraColors.map((chakra, index) => (
          <motion.div
            key={chakra.title}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={featureVariants}
            className={`absolute w-full flex items-center 
              ${index % 2 === 0 ? 'justify-end' : 'justify-start'}
            `}
            style={{ 
              top: `${index * 140}px`,
              perspective: '1000px',
              right: index % 2 === 0 ? '55%' : 'auto',
              left: index % 2 === 1 ? '55%' : 'auto'
            }}
          >
            <motion.div
              className={`
                w-[40%] p-6 rounded-xl shadow-2xl transform transition-all duration-300
              `}
              style={{ 
                backgroundColor: `${chakra.color}20`,
                borderLeft: index % 2 === 1 ? `4px solid ${chakra.color}` : 'none', // Border on left for even features
                borderRight: index % 2 === 0 ? `4px solid ${chakra.color}` : 'none', // Border on right for odd features
                transformStyle: 'preserve-3d',
                transform: `rotateY(${index % 2 === 0 ? '10' : '-10'}deg)`,
                clipPath: index % 2 === 0
                ? 'polygon(50px 0, 100% 0, 100% 100%, 50px 100%, 0 50%)' // Arrowhead on the left
                : 'polygon(0 0, calc(100% - 50px) 0, 100% 50%, calc(100% - 50px) 100%, 0 100%)', // Arrowhead on the right
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: index % 2 === 0 ? -5 : 5,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15 
                }
              }}
              transition={{
                type: "spring", 
                stiffness: 300, 
                damping: 15
              }}
            >
              <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="text-5xl">{chakra.icon}</div>
                <div className={`flex-grow ${index % 2 === 0 ? 'text-right ml-16' : 'text-left ml-4'}`}>
                  <h3 
                    className="text-2xl font-bold mb-2 mr-4"
                    style={{ color: chakra.color }}
                  >
                    {chakra.title}
                  </h3>
                  <p className="text-gray-300 justify-center text-xl w-[55vh]">{chakra.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpinalCordChakra;