import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        responses: { 
            type: Object, // Changed from Map to Object
            required: true 
        },
    },
    { timestamps: true }
);

export default mongoose.models.Questions || mongoose.model("Questions", QuestionsSchema);
