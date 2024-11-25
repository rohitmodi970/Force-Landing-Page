import mongoose from "mongoose";

const WaitListSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        
        poc: { type: String },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.models.WaitList || mongoose.model("WaitList", WaitListSchema);
