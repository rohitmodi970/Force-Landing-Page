"use client"
import React, { useState, useEffect } from "react";
import WaitlistForm from "./WaitlistForm";
import { useRef } from "react";
import Link from "next/link";
const Navbar = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const formRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
        // Use `document.documentElement.scrollTop` to get the scroll position
        const scrollPosition = document.documentElement.scrollTop;

        if (scrollPosition > lastScrollY) {
            setScrollingUp(false); // Scrolling down
        } else {
            setScrollingUp(true); // Scrolling up
        }

        setLastScrollY(scrollPosition); // Update last scroll position
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
        document.removeEventListener("scroll", handleScroll);
    };
}, [lastScrollY]);
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowWaitlistForm(false);  // Close the form if the click is outside
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up the event listener
    };
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 w-full flex bg-transparent justify-between items-center p-10 z-50 transition-transform duration-500 ease-in-out ${
        scrollingUp ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <div>
        <Link href={'/'}>
        <img
          className="w-14 rounded-full border-4 border-orange-400"
          src="logo.png"
          alt="Logo"
        />
      </Link>
      </div>

      {/* Navigation Links */}
      <div className="links text-white flex gap-8 justify-center items-center">
        {["Home", "about", "contact"].map((value, index) => (
          <div
            key={index}
            className="text-[#FFFFFF] font-medium capitalize z-10 cursor-pointer hover:text-orange-400 hover:font-semibold"
          >
            {value}
          </div>
        ))}
        <div

          id="join-waitlist-button"
          onClick={() => setShowWaitlistForm(prevState => !prevState)}
          className="bg-orange-400 py-2 px-5 rounded-full font-semibold text-white hover:scale-110 z-30 flex-shrink-0 transition-transform cursor-pointer relative"
        >
          Join Waitlist
        </div>
        {showWaitlistForm && (
          <div ref={formRef} className="waitlist-form">
          <WaitlistForm />
          </div>)}
      </div>
    </div>
  );
};

export default Navbar;
