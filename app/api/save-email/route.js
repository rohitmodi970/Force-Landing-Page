import { NextResponse } from "next/server";
import Email from "@/models/Email"; // Mongoose Email model
import connectDB from "@/db/connectDb"; // Ensure MongoDB connection

export async function POST(request) {
    try {
        await connectDB(); // Ensure the database is connected

        const { email } = await request.json();

        // Validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Save email to the database
        const emailEntry = new Email({ email });
        await emailEntry.save();

        return NextResponse.json(
            { success: true, message: "Email saved successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error saving email:", error.message);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
