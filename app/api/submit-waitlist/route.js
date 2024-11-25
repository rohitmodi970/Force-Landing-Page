import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb"; // Import your database connection
import WaitList from "@/models/WaitList";

export async function POST(request) {
    try {
        await connectDB(); // Ensure the database is connected

        const { name, email, poc } = await request.json();

        // Validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email) || !name || !poc) {
            return NextResponse.json(
                { success: false, error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Save email to the database
        const newWaitlistEntry = new WaitList({ name, email, poc });
        await newWaitlistEntry.save();

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
