import React, { useState, useEffect, useRef } from 'react';
import WaitlistForm from './WaitlistForm';

const Navbar = () => {
    const [showWaitlist, setShowWaitlist] = useState(false);
    const waitlistRef = useRef();

    const toggleWaitlistForm = (event) => {
        // Prevent triggering handleClickOutside when clicking the button
        event.stopPropagation();
        setShowWaitlist((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (waitlistRef.current && !waitlistRef.current.contains(event.target)) {
            setShowWaitlist(false);
        }
    };
    const handleClick = () => {
        if (showWaitlist) {
            
            setShowWaitlist(false); // Show the QuestionForm when button is clicked
        }
        else{
            setShowWaitlist(true);
        }
    }
    useEffect(() => {
        // Attach the event listener when the form is shown
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Clean up the event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    

    return (
        <div className="flex justify-between items-center p-10 z-50 sticky top-0 backdrop-blur-sm">
            <div onClick={() => window.location.href = process.env.NEXT_PUBLIC_URL} className="logo cursor-pointer">
                <img
                    
                    className="w-12"
                    src="https://framerusercontent.com/images/w0Vu3UkWITBV2Jd1W5zNmpRcewI.png"
                    alt="Logo"
                />
            </div>
            <div className="links flex gap-8 justify-center items-center">
                {['Home', 'about', 'contact'].map((value, index) => (
                    <div
                        key={index}
                        className="text-[#1482DC] font-medium capitalize z-10 cursor-pointer hover:text-blue-900 hover:font-semibold"
                    >
                        {value}
                    </div>
                ))}
                <div
                    id="join-waitlist-button"
                    onClick={handleClick }
                    className="bg-[#1482DC] py-2 px-5 rounded-full font-semibold text-white hover:scale-110 z-30 flex-shrink-0 transition-transform cursor-pointer relative "
                >
                    Join Waitlist
                </div>
                {showWaitlist && (
                    <div ref={waitlistRef}>
                        <WaitlistForm />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
