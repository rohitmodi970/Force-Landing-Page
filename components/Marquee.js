import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Marquee = () => {

    const handleStartClick = () => {
        setShowQForm((prev) => !prev);
    };

    const images = [
        "/pics/24df7619-6bbc-4c58-b943-d970f10ae0e6-min.jpg",
        "/pics/b1c5d76a-d8b2-4b51-91d2-c019a71c215e-min.jpg",
        "/pics/c2b1cb10-9957-4dd4-b6d0-e698d18569bd-min.jpg",
        "/pics/c3fa987a-c831-41ff-b022-ab25b50fec3e-min.jpg",
        "/pics/output-onlinepngtools-min.png",
        "/pics/24df7619-6bbc-4c58-b943-d970f10ae0e6-min.jpg",
        "/pics/b1c5d76a-d8b2-4b51-91d2-c019a71c215e-min.jpg",
        "/pics/c2b1cb10-9957-4dd4-b6d0-e698d18569bd-min.jpg",
        "/pics/c3fa987a-c831-41ff-b022-ab25b50fec3e-min.jpg",
        "/pics/output-onlinepngtools-min.png",
        "/pics/24df7619-6bbc-4c58-b943-d970f10ae0e6-min.jpg",
        "/pics/b1c5d76a-d8b2-4b51-91d2-c019a71c215e-min.jpg",
        "/pics/c2b1cb10-9957-4dd4-b6d0-e698d18569bd-min.jpg",
        "/pics/c3fa987a-c831-41ff-b022-ab25b50fec3e-min.jpg",
        "/pics/output-onlinepngtools-min.png",
        "/pics/24df7619-6bbc-4c58-b943-d970f10ae0e6-min.jpg",
        "/pics/b1c5d76a-d8b2-4b51-91d2-c019a71c215e-min.jpg",
        "/pics/c2b1cb10-9957-4dd4-b6d0-e698d18569bd-min.jpg",
        "/pics/c3fa987a-c831-41ff-b022-ab25b50fec3e-min.jpg",
        "/pics/output-onlinepngtools-min.png",
    ];
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
    const words = ["You", "Everyone", "Us"];
    const words2 = ["All these", "Questions.", "Explore"];
    const currentWord = useWordCycle(words, 2000); // Cycle every 2 seconds
    const currentWord2 = useWordCycle(words2, 2000); // Cycle every 2.5 seconds
    // Double the images for smooth looping
    const loopedImages = [...images, ...images];

    return (
        <div className="w-full h-screen py-10 flex flex-col justify-center items-center bg-black-500 from-zinc-300 to-zinc-900 backdrop-blur-3xl overflow-hidden ">
            <div className="relative w-fit h-full overflow-hidden  ">
                <motion.div
                    className="flex gap-5"
                    initial={{ x: 0 }}
                    animate={{ x: `-${images.length * 75}vw` }}
                    transition={{
                        ease: "linear",
                        duration: 300,
                        repeat: Infinity,
                    }}
                    style={{
                        width: `${loopedImages.length * 75}vw`,
                    }}
                >
                    {loopedImages.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Marquee Image ${index + 1}`}
                            className="bg-black-500 rounded-[60px] flex-shrink-0 h-[90vh] w-[55vw]"
                        />
                    ))}
                </motion.div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit bg-zinc-600 rounded-xl p-5 hover:bg-transparent">
                <div className="h-[45vh] w-fit flex justify-center items-center  flex-col">
                    <div className="font-bold text-6xl flex justify-center items-center  w-[65vw]">
                        <h1 className="text-orange-400  w-fit text-center gap-5 ">Let's Know About&ensp; </h1>
                        <span className="text-white w-[10vw] text-center">
                            {currentWord}.
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-white font-medium text-3xl tracking-tighter mt-12 hover:text-orange-400 text-center">
                            Tell us about yourself through the inventive questions we came
                            up with to help your mind
                        </p>
                        <h2 className="font-bold text-orange-400 text-6xl mt-6">{currentWord2}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marquee;
