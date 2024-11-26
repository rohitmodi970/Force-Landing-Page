import React from 'react'
import { motion } from 'framer-motion'

const TextMarquee = () => {
    return (
        <div  className="w-full  bg-transparent rounded-tr-3xl rounded-tl-3xl">
            <div className=" flex whitespace-nowrap  overflow-hidden mx-20 gap-28">

                <motion.h1 initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 10 }} className='text-3xl font-sans text-white font-bold pb-3'>Join The Waitlist For  Early Access.  </motion.h1>
                <motion.h1 initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 10 }} className='text-3xl font-sans text-white font-bold pb-3'>Join The Waitlist For  Early Access.  </motion.h1>
                <motion.h1 initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 10 }} className='text-3xl font-sans text-white font-bold pb-3'>Join The Waitlist For  Early Access.  </motion.h1>
                <motion.h1 initial={{ x: "0" }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 10 }} className='text-3xl font-sans text-white font-bold pb-3'>Join The Waitlist For  Early Access.  </motion.h1>

                
                
            </div>
        </div>
    )
}

export default TextMarquee