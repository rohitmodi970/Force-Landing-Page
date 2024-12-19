import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    responses: {
        type: Map,
        of: {
            answer: String,
            imageUrl: String // Store Cloudinary URL
        },
        required: true
    },
    // Track all uploaded images for this user
    uploads: [{
        questionId: String,
        cloudinaryId: String,
        imageUrl: String
    }]
}, { 
    timestamps: true 
});

// Add index for faster querying by email
QuestionsSchema.index({ email: 1 });

export default mongoose.models.Questions || mongoose.model("Questions", QuestionsSchema);