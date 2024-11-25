import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EmailSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


export default mongoose.models.Email || model("Email", EmailSchema);
