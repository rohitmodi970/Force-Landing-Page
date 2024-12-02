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
    url: "/pics/24df7619-6bbc-4c58-b943-d970f10ae0e6-min.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/pics/b1c5d76a-d8b2-4b51-91d2-c019a71c215e-min.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/pics/c2b1cb10-9957-4dd4-b6d0-e698d18569bd-min.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/pics/c3fa987a-c831-41ff-b022-ab25b50fec3e-min.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/pics/output-onlinepngtools-min.png",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/pics/24df7619-6bbc-4c58-b943-d970f10ae0e6-min.jpg",
    title: "Title 1",
    id: 6,
  },
  {
    url: "/pics/b1c5d76a-d8b2-4b51-91d2-c019a71c215e-min.jpg",
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

  const words = ["You", "Everyone", "Us"];
  const words2 = ["All these", "Questions.", "Explore"];
  const currentWord = useWordCycle(words, 2000);
  const currentWord2 = useWordCycle(words2, 2000);

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Text Container */}
        <div className="absolute z-30 text-center">
          <div className="font-bold text-6xl flex justify-center items-center">
            <h1 className="text-orange-400  w-[35vw]">Let's Know About</h1>
            <span className="text-white w-[10vw] text-center">
              {currentWord}.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-white font-medium text-3xl tracking-tighter mt-12 hover:text-orange-400">
              Tell us about yourself through the inventive questions we came
              up with to help your mind
            </p>
            <h2 className="font-bold text-orange-400 text-6xl mt-6">
              {currentWord2}
            </h2>
          </div>
        </div>

        {/* Cards Container */}
        <motion.div style={{ x }} className="flex gap-4 z-20 w-max overflow">
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
