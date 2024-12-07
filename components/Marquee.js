import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const useWordCycle = (wordsArray, intervalTime) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordsArray.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [wordsArray, intervalTime]);

  return wordsArray[currentWordIndex];
};

const cards = [
  {
    url: "/pics/11.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/pics/12.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/pics/13.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/pics/14.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/pics/15.jpg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/pics/11.jpg",
    title: "Title 1",
    id: 6,
  },
  {
    url: "/pics/12.jpg",
    title: "Title 2",
    id: 7,
  },
];

const Marquee = () => {
  return (
    <div className="bg-neutral-800">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const words = ["You", "Us" ,"Everyone"];
  const words2 = ["Welcome", "To the future of human potential.", " Welcome to FORCE."];
  const currentWord = useWordCycle(words, 1000);
  const currentWord2 = useWordCycle(words2, 1000);

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Text Container */}
        <div className="absolute z-30 text-center">
          <div className="font-bold text-6xl flex justify-center items-center">
            <h1 className="text-chakra-communication w-[30vw]">Our Promise To </h1>
            <span className="text-white w-[10vw] text-center">
              {currentWord}.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-white font-medium text-3xl w-[80%] tracking-tighter mt-12 hover:text-chakra-communication ">
            We hold space for your journey. We honor your unique path. We evolve with your trust. We protect your truth. We amplify your force.
            </p>
            <h2 className="font-bold text-chakra-communication  text-6xl mt-6">
              {currentWord2}
            </h2>
          </div>
        </div>

        {/* Cards Container */}
        <motion.div style={{ x }} className="flex gap-6 z-20 w-max overflow">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[600px] w-[800px] overflow-hidden bg-black rounded-2xl shadow-[0_2px_5px_2px_rgba(255,255,255,0.7)] transform transition-transform duration-300 hover:scale-105 hover:rotate-3 hover:shadow-[0_4px_15px_5px_rgba(255,255,255,0.7)]"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center"></div>
    </div>
  );
};

export default Marquee;
