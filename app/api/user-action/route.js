import { NextResponse } from "next/server";
import Form from "@/models/Questions";
import connectDB from "@/db/connectDb";
import fs from "fs/promises";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    try {
        // Ensure database connection
        await connectDB();

        // Create upload directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        // Read the form data
        const formData = await req.formData();

        // Extract fields
        const name = formData.get('name');
        const email = formData.get('email');
        const responsesString = formData.get('responses');

        // Validate required fields
        if (!name || !email || !responsesString) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Parse responses
        let responses;
        try {
            responses = JSON.parse(responsesString);
        } catch (parseError) {
            return NextResponse.json(
                { success: false, error: "Invalid responses format" },
                { status: 400 }
            );
        }

        // Handle file uploads
        const savedFiles = [];
        for (const [key, value] of formData.entries()) {
            if (value instanceof File && value.size > 0) {
                const bytes = await value.arrayBuffer();
                const buffer = Buffer.from(bytes);
                
                const filename = `${Date.now()}-${value.name}`;
                const filePath = path.join(uploadDir, filename);
                
                await fs.writeFile(filePath, buffer);
                savedFiles.push(filePath);
            }
        }

        // Save data to MongoDB
        const formSubmission = new Form({
            name,
            email,
            responses,
            files: savedFiles,
        });

        await formSubmission.save();

        return NextResponse.json(
            { success: true, message: "Form data saved successfully", data: formSubmission },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error saving form data:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}