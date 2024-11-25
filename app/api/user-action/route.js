import { NextResponse } from "next/server";
import Form from "@/models/Questions"; // Your Mongoose model
import connectDB from "@/db/connectDb"; // Ensure database connection


export async function POST(request) {
    try {
        // Ensure database connection
        await connectDB();

        // Parse incoming JSON data
        const formData = await request.json();

        // Validate required fields
        const { name, email, responses } = formData;
        if (!name || !email || !responses || typeof responses !== "object") {
            return NextResponse.json(
                { success: false, error: "Missing or invalid required fields" },
                { status: 400 }
            );
        }

        // Save data to MongoDB
        const form = new Form({ name, email, responses }); // Plain object stored directly
        await form.save();

        return NextResponse.json(
            { success: true, message: "Form data saved successfully", data: form },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error saving form data:", error.message);
        const statusCode = error.name === "ValidationError" ? 400 : 500;
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: statusCode }
        );
    }
}
