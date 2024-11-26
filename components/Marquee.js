import React, { useState } from "react";
import { motion } from "framer-motion";
import QuestionForm from "./QuestionsForm";

const Marquee = () => {
    const [showQForm, setShowQForm] = useState(false);

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
    ];

    // Double the images for smooth looping
    const loopedImages = [...images, ...images];

    return (
        <div className="w-full h-screen py-10 flex flex-col justify-center bg-gradient-to-b from-zinc-300 to-zinc-900 backdrop-blur-3xl overflow-hidden ">
            <div className="relative w-full h-full overflow-hidden  ">
                <motion.div
                    className="flex gap-5"
                    initial={{ x: 0 }}
                    animate={{ x: `-${images.length * 75}vw` }}
                    transition={{
                        ease: "linear",
                        duration: 100, 
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
                            className="bg-slate-200 rounded-[60px] flex-shrink-0 h-[90vh] w-[65vw]"
                        />
                    ))}
                </motion.div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {!showQForm && (
                    <button
                        className="bg-black text-white px-16 py-5 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform"
                        onClick={handleStartClick}
                        aria-label="Click to start the question form"
                    >
                        Click to Start
                    </button>
                )}
                {showQForm && (
                    <div className="flex justify-center items-center">
                        <QuestionForm />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Marquee;
