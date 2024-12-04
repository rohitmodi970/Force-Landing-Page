import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const QuestionForm = () => {
    const [userDetails, setUserDetails] = useState({ name: "", email: "" });
    const [currentStep, setCurrentStep] = useState(0); // 0: User Details, 1: Questions, 2: Submission
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCard, setShowCard] = useState(false)
    const [showCardNext, setShowCardNext] = useState(false)
    const [handleButton, sethandleButton] = useState(true)

    const questions = [
        "Write down the top 5 feelings you have while you are with your closest friend?",
        "Imagine making a perfect workout routine for yourself...",
        "What if we tell you that it’s possible to get there faster...",
        "What is your biggest challenge right now and how are you trying to overcome that challenge?",
        "What does a perfect life look like to you?",
    ];

    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleUserDetailsSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!userDetails.name.trim() || !userDetails.email.trim()) {
            alert("Please enter both your name and email.");
            return;
        }

        if (!emailRegex.test(userDetails.email.trim())) {
            alert("Please enter a valid email address.");
            return;
        }

        setCurrentStep(1); // Move to questions section
    };

    const handleInputChange = (e) => {
        const updatedAnswers = { ...answers, [questions[currentQuestionIndex]]: e.target.value };
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        const currentAnswer = answers[questions[currentQuestionIndex]]?.trim();
        if (currentAnswer) {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setCurrentStep(2); // Move to submission step
            }
        } else {
            alert("Please provide an answer before proceeding.");
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        const payload = {
            name: userDetails.name,
            email: userDetails.email,
            responses: answers, // Already a plain object
        };

        try {
            setIsSubmitting(true);
            const response = await fetch("/api/user-action", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Thank you for submitting your responses!");
                handleRestart();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || "Submission failed");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const fonts = [
        "'Lobster', cursive",
        "'Poppins', sans-serif",
        "'Roboto Slab', serif",
        "'Montserrat', sans-serif",
        "'Dancing Script', cursive",
        "'Oswald', sans-serif",
        "'Playfair Display', serif",
        "'Raleway', sans-serif",
        "'Bebas Neue', sans-serif",
        "'Roboto Mono', monospace",
      ];
      const [randomFont, setRandomFont] = useState("");

      useEffect(() => {
        // Select a random font from the list on every refresh
        const randomIndex = Math.floor(Math.random() * fonts.length);
        setRandomFont(fonts[randomIndex]);
      }, []); // Empty dependency array ensures it runs only on mount
    

    const handleRestart = () => {
        setUserDetails({ name: "", email: "" });
        setAnswers({});
        setCurrentStep(0);
        setCurrentQuestionIndex(0);
        setIsSubmitting(false);
    };
    console.log('\ncurrent Question Index: ', currentQuestionIndex)
    useEffect(() => {
        if ((currentQuestionIndex) > 0) {
            // console.log('\ncurrent Question Index: ',currentQuestionIndex)
            setShowCard(true)

        }
        // if (((questions.length ) == currentQuestionIndex)) {
        //     setShowCard(false)
        // }
        if (currentStep === 1) {
            setShowCardNext(true);
        }
        if ((currentStep === 2) && ((questions.length - 1) === currentQuestionIndex)) {
            setShowCardNext(false);
            setShowCard(false)
        }
    }, [currentQuestionIndex, currentStep])

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const cardTransition = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
    };

    const buttonHover = { scale: 1.1 };

    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center p-4 overflow-hidden relative">


            <div className=" flex flex-col justify-center items-center ">
                {handleButton ? <button onClick={() => sethandleButton(false)} className="px-12 py-5 rounded-full bg-chakra-insight text-white text-xl mt-5 text-nowrap flex items-center justify-center gap-5 hover:bg-white hover:text-orange-400 hover:scale-125 z-10 transition-transform duration-1000">
                    Answer & Discover
                </button> : ''}
                {!handleButton && (currentStep === 0) && (
                    <div className="z-40 w-full max-w-lg bg-orange-400 rounded-2xl shadow-lg  mx-auto p-8 opacity-90">
                        <>
                            <h2 className="font-bold text-xl text-center mb-4">
                                Please provide your details to begin
                            </h2>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full p-3 bg-white/20 backdrop-blur-sm text-white rounded-xl"
                                value={userDetails.name}
                                onChange={handleUserDetailsChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full p-3 bg-white/20 backdrop-blur-sm text-white rounded-xl my-5"
                                value={userDetails.email}
                                onChange={handleUserDetailsChange}
                            />
                            <button
                                onClick={handleUserDetailsSubmit}
                                whilehover={{ scale: 1.05 }}
                                whiletap={{ scale: 0.95 }}
                                className={`w-full px-4 py-3 rounded-xl transition-all text-white bg-white/30 hover:bg-white/50
                      }`}
                            >
                                Start Questions
                            </button>
                        </>
                    </div>
                )}
                {/* previous questions */}
                {showCard ?

                    <div className=" absolute w-[30vw] left-[18vw] text-white ">

                        <>
                            <div className="bg-orange-400 rounded-2xl p-6 mx-auto opacity-50 -z-10 ">
                                <label
                                    htmlFor={`question-${currentQuestionIndex - 1}`}
                                    className="font-bold text-xl text-center mb-4"
                                >
                                    {questions[currentQuestionIndex - 1]}
                                </label>
                                <textarea
                                    id={`question-${currentQuestionIndex - 1}`}
                                    rows="4"
                                    className="w-full p-3 bg-white/20 backdrop-blur-sm text-white rounded-xl min-h-[120px] resize-none"
                                    placeholder="Type your answer here..."
                                    value={answers[questions[currentQuestionIndex - 1]] || ""}
                                    onChange={handleInputChange}
                                    disabled
                                ></textarea>
                                <button
                                    onClick={handleNext}
                                    disabled={!answers[questions[currentQuestionIndex - 1]?.trim()]}
                                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-500 `}
                                >
                                    {currentQuestionIndex - 1 < questions.length - 1 ? "Next" : "Submit"}
                                </button>
                            </div>
                        </>
                    </div>
                    : ''}

                {currentStep === 1 && (

                    <motion.div
                    
                        key={currentQuestionIndex}
                        variants={cardTransition}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.6 }}
                        className="z-40 w-full max-w-lg bg-orange-400 rounded-2xl shadow-lg mx-auto p-7 no-underline opacity-90"
                    >
                        <label htmlFor={`question-${currentQuestionIndex}`} className="text-2xl font-bold text-white mb-6" style={{ fontFamily: randomFont }}>
                            {questions[currentQuestionIndex]}
                        </label>
                        <textarea
                            id={`question-${currentQuestionIndex}`}
                            rows="4"
                            className="w-full p-3 bg-white/20 backdrop-blur-sm text-white rounded-xl min-h-[120px] resize-none border-2 border-orange-200 "
                            placeholder="Type your answer here..."
                            value={answers[questions[currentQuestionIndex]] || ""}
                            onChange={handleInputChange}
                        ></textarea>
                        <motion.button
                            onClick={handleNext}
                            whiletap={{ scale: 0.95 }}
                            disabled={!answers[questions[currentQuestionIndex]?.trim()]}
                            whilehover={{ scale: 1.05 }}
                            className={`w-full px-4 py-3 rounded-xl transition-all text-white ${answers[questions[currentQuestionIndex]?.trim()]
                                ? "bg-white/30 hover:bg-white/50"
                                : "bg-white/10 cursor-not-allowed"
                                }`}
                        >
                            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
                        </motion.button>
                        <div className="mt-6 w-full bg-white/20 rounded-full h-2.5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                                className="bg-white h-2.5 rounded-full"
                            ></motion.div>
                        </div>
                    </motion.div>
                )}
                {/* next questions  */}
                {(showCardNext && (currentQuestionIndex <= questions.length - 1)) ?

                    <div className=" absolute w-[30vw] right-[18vw]  ">

                        <>
                            <div className="bg-orange-400 rounded-2xl p-6 mx-auto opacity-50 -z-10 ">

                                <label
                                    htmlFor={`question-${currentQuestionIndex + 1}`}
                                    className="font-bold text-xl text-center mb-4 text-white"
                                >
                                    {questions[currentQuestionIndex + 1]}
                                </label>
                                <textarea
                                    id={`question-${currentQuestionIndex + 1}`}
                                    rows="4"
                                    className="w-full p-3 bg-white/20 backdrop-blur-sm text-white rounded-xl min-h-[120px] resize-none"
                                    placeholder="Type your answer here..."
                                    value={answers[questions[currentQuestionIndex + 1]] || ""}
                                    onChange={handleInputChange}
                                    disabled
                                ></textarea>
                                <button
                                    onClick={handleNext}
                                    disabled={!answers[questions[currentQuestionIndex + 1]?.trim()]}
                                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg bg-gray-400
                                        }`}
                                >
                                    {currentQuestionIndex + 1 < questions.length - 1 ? "Next" : "Submit"}
                                </button>
                            </div>
                        </>
                    </div>
                    : ''}


                {currentStep === 2 && (
                    <> <div className="flex flex-col items-center justify-center  bg-transparent text-gray-200 p-6">
                        <motion.div
                            className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="font-bold text-2xl text-gray-100 mb-4">
                                Thank you, {userDetails.name}!
                            </h2>
                            <p className="text-gray-400 mb-6">
                                Your responses have been recorded. We will reach out to you at{" "}
                                <strong className="text-gray-200">{userDetails.email}</strong>.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`px-6 py-3 w-full text-sm font-medium text-gray-900 rounded-lg transition-colors ${isSubmitting
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : "bg-green-500 hover:bg-green-600"
                                    }`}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleRestart}
                                className="mt-4 px-6 py-3 w-full text-sm font-medium text-gray-900 bg-gray-400 rounded-lg hover:bg-gray-500 transition-colors"
                            >
                                Restart
                            </motion.button>
                        </motion.div>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuestionForm;
