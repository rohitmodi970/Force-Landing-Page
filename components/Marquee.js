import React from 'react'
import { motion } from "framer-motion"
import QuestionForm from './QuestionsForm'
import { useState } from 'react'

const Marquee = () => {
    const [showQForm, setShowQForm] = useState(false);
    const handleStartClick = () => {
        if (showQForm) {
            
            setShowQForm(false); // Show the QuestionForm when button is clicked
        }
        else{
            setShowQForm(true); 

        }
    };


    return (
        <div className="w-full h-screen py-10 flex flex-col justify-center bg-gradient-to-b from-zinc-300 to-zinc-900 backdrop-blur-2xl">
            <div className="relative flex justify-center items-center">

                <div className="flex  overflow-hidden gap-5 py-5 backdrop-blur-md h-screen bg-gradient-to-b from-zinc-300 to-zinc-900">

                    <motion.img initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
                        className='bg-slate-200 rounded-[60px]'
                        src="/pics/24df7619-6bbc-4c58-b943-d970f10ae0e6-min.jpg" alt="img" />

                    <motion.img initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
                        className='bg-slate-200 rounded-[60px]'
                        src="/pics/b1c5d76a-d8b2-4b51-91d2-c019a71c215e-min.jpg" alt="img" />

                    <motion.img initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
                        className='bg-slate-200 rounded-[60px]'
                        src="/pics/c2b1cb10-9957-4dd4-b6d0-e698d18569bd-min.jpg" alt="img" />

                    <motion.img initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
                        className='bg-slate-200 rounded-[60px]'
                        src="/pics/c3fa987a-c831-41ff-b022-ab25b50fec3e-min.jpg" alt="img" />
                    <motion.img initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
                        className='bg-slate-200 rounded-[60px]'
                        src="/pics/output-onlinepngtools-min.png" alt="img" />
                </div>
                <div className="absolute">
            {!showQForm && ( // Show the button only if the form is not visible
                <div
                    className="bg-black text-white px-16 py-5 rounded-full font-bold outline-2 outline-background cursor-pointer"
                    onClick={handleStartClick}
                >
                    Click to Start
                </div>
            )}
            <div className="flex justify-center items-center">
                {showQForm && <QuestionForm />} 
            </div>
        </div>
            </div>

        </div>
    )
}

export default Marquee
