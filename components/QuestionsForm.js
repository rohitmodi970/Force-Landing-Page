import React, { useState } from "react";

const QuestionForm = () => {
    const [userDetails, setUserDetails] = useState({ name: "", email: "" });
    const [currentStep, setCurrentStep] = useState(0); // 0: User Details, 1: Questions, 2: Submission
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
    

    const handleRestart = () => {
        setUserDetails({ name: "", email: "" });
        setAnswers({});
        setCurrentStep(0);
        setCurrentQuestionIndex(0);
        setIsSubmitting(false);
    };

    return (
        <div className="w-full max-w-lg bg-zinc-200 rounded-2xl flex flex-col justify-center items-center shadow-lg p-6 mx-auto">
            {currentStep === 0 && (
                <>
                    <h2 className="font-bold text-xl text-center mb-4">
                        Please provide your details to begin
                    </h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="block w-full p-2 mb-4 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={userDetails.name}
                        onChange={handleUserDetailsChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="block w-full p-2 mb-4 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={userDetails.email}
                        onChange={handleUserDetailsChange}
                    />
                    <button
                        onClick={handleUserDetailsSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        Start Questions
                    </button>
                </>
            )}

            {currentStep === 1 && (
                <>
                    <label
                        htmlFor={`question-${currentQuestionIndex}`}
                        className="font-bold text-xl text-center mb-4"
                    >
                        {questions[currentQuestionIndex]}
                    </label>
                    <textarea
                        id={`question-${currentQuestionIndex}`}
                        rows="4"
                        className="block w-full p-2 mb-4 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type your answer here..."
                        value={answers[questions[currentQuestionIndex]] || ""}
                        onChange={handleInputChange}
                    ></textarea>
                    <button
                        onClick={handleNext}
                        disabled={!answers[questions[currentQuestionIndex]?.trim()]}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${answers[questions[currentQuestionIndex]?.trim()]
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
                    </button>
                </>
            )}

            {currentStep === 2 && (
                <>
                    <h2 className="font-bold text-xl text-center mb-4">
                        Thank you, {userDetails.name}!
                    </h2>
                    <p className="text-gray-700 text-center mb-4">
                        Your responses have been recorded. We will reach out to you at{" "}
                        <strong>{userDetails.email}</strong>.
                    </p>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                        onClick={handleRestart}
                        className="mt-2 px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                    >
                        Restart
                    </button>
                </>
            )}
        </div>
    );
};

export default QuestionForm;
