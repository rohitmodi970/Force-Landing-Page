import React, { useState } from "react";

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    poc: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.poc) {
      setError("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(""); // Clear error
    setLoading(true); // Set loading to true

    try {
      const response = await fetch("/api/submit-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setSuccess("You have been added to the waitlist successfully!");
          setTimeout(() => setSuccess(""), 5000); // Clear success message after 5 seconds
          setFormData({ name: "", email: "", poc: "" });
        } else {
          setError(result.error || "Something went wrong. Please try again.");
        }
      } else {
        setError("An error occurred. Please try again later.");
      }
    } catch (error) {
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] w-[35vw] bg-[#f09824] flex justify-center items-center rounded-3xl fixed right-10 top-24 z-50 p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-orange-600 mb-4">Get Early Access</h2>
        <p className="text-center text-gray-700 text-base mb-6 hover:text-orange-900">
          Join the waitlist for early access to Force. We’ll reach out to you as more spots become available.
        </p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mb-4">
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              placeholder="Your Name*"
            />
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              placeholder="Email Address*"
            />
            <input
              type="text"
              id="poc"
              value={formData.poc}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              placeholder="How did you hear about us?"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 z-30${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Join Waitlist"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WaitlistForm;
