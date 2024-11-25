import { useState } from "react";

const EmailForm = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        if (!email.trim()) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch("/api/save-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                alert("You've successfully subscribed!");
                setEmail(""); // Clear the input field
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to save email.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex gap-7 justify-center items-center">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
            <input
                type="email"
                id="email-address-icon"
                className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 py-4  dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:text-blue-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@force.com"
                value={email}
                onChange={handleInputChange}
            />
            <button
                type="button"
                 className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  rounded-lg text-sm px-5 py-4 text-center text-nowrap"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Get notified"}
            </button>
        </div>
    );
};

export default EmailForm;
