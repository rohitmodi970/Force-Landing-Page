import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrollingUp, setScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setScrollingUp(false); // Scrolling down
            } else {
                setScrollingUp(true); // Scrolling up
            }
            setLastScrollY(window.scrollY); // Update last scroll position
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div
            className={`flex bg-transparent justify-between items-center p-10 z-50 backdrop-blur-sm transition-transform duration-500 ease-in-out ${scrollingUp ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div onClick={() => window.location.href = process.env.NEXT_PUBLIC_URL} className="logo cursor-pointer">
                <img
                    className="w-12"
                    src="https://framerusercontent.com/images/w0Vu3UkWITBV2Jd1W5zNmpRcewI.png"
                    alt="Logo"
                />
            </div>
            <div className="links text-white flex gap-8 justify-center items-center">
                {['Home', 'about', 'contact'].map((value, index) => (
                    <div
                        key={index}
                        className="text-[#FFFFFF] font-medium capitalize z-10 cursor-pointer hover:text-orange-400 hover:font-semibold"
                    >
                        {value}
                    </div>
                ))}
                <div
                    id="join-waitlist-button"
                    onClick={() => {}}
                    className="bg-orange-400 py-2 px-5 rounded-full font-semibold text-white hover:scale-110 z-30 flex-shrink-0 transition-transform cursor-pointer relative "
                >
                    Join Waitlist
                </div>
            </div>
        </div>
    );
};

export default Navbar;
