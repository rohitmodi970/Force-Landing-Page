"use server"
import { NextResponse } from "next/server";
import Form from "@/models/Questions";
import connectDB from "@/db/connectDb";
import { validateImage, sanitizeFileName } from "@/utils/imageValidation";
import cloudinary from 'cloudinary';
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export async function POST(req) {
    try {
        await connectDB();
        const formData = await req.formData();

        const name = formData.get('name');
        const email = formData.get('email');
        const responsesString = formData.get('responses');

        if (!name || !email || !responsesString) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create sanitized email folder name
        const sanitizedEmail = email.replace(/[^a-zA-Z0-9._@-]/g, '_');

        let responses;
        try {
            responses = JSON.parse(responsesString);
        } catch (error) {
            return NextResponse.json(
                { success: false, error: "Invalid responses format" },
                { status: 400 }
            );
        }

        const uploads = [];
        const processedResponses = new Map();

        for (const [question, answer] of Object.entries(responses)) {
            const fileKey = `file_${question}`;
            const file = formData.get(fileKey);
            
            let imageUrl = null;
            let cloudinaryId = null;

            if (file && file instanceof File) {
                // Validate image
                const validation = await validateImage(file);
                if (!validation.isValid) {
                    return NextResponse.json({
                        success: false,
                        error: `Image validation failed for question ${question}: ${validation.errors.join(', ')}`
                    }, { status: 400 });
                }

                try {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const sanitizedFileName = sanitizeFileName(file.name);
                    
                    // Create folder structure: email/question_number
                    const folderPath = `${sanitizedEmail}/question_${question}`;
                    
                    const uploadResult = await new Promise((resolve, reject) => {
                        cloudinary.v2.uploader.upload_stream(
                            {
                                folder: folderPath,
                                resource_type: 'image',
                                public_id: `${Date.now()}_${sanitizedFileName}`,
                                allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'heic'],
                                transformation: [
                                    { quality: 'auto:good' },
                                    { fetch_format: 'auto' }
                                ]
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        ).end(buffer);
                    });

                    imageUrl = uploadResult.secure_url;
                    cloudinaryId = uploadResult.public_id;

                    uploads.push({
                        questionId: question,
                        cloudinaryId,
                        imageUrl,
                        folderPath
                    });
                } catch (uploadError) {
                    console.error("Error uploading to Cloudinary:", uploadError);
                    return NextResponse.json({
                        success: false,
                        error: `Failed to upload image for question ${question}`
                    }, { status: 500 });
                }
            }

            processedResponses.set(question, {
                answer,
                imageUrl,
                cloudinaryId
            });
        }

        // Save to MongoDB
        const formSubmission = new Form({
            name,
            email,
            responses: processedResponses,
            uploads
        });

        await formSubmission.save();

        // Clean up old images if necessary (optional)
        const oldSubmissions = await Form.find({ 
            email, 
            _id: { $ne: formSubmission._id } 
        });

        for (const oldSub of oldSubmissions) {
            for (const upload of oldSub.uploads || []) {
                try {
                    await cloudinary.v2.uploader.destroy(upload.cloudinaryId);
                } catch (error) {
                    console.error("Error deleting old image:", error);
                }
            }
        }

        return NextResponse.json(
            { 
                success: true, 
                message: "Form data saved successfully",
                data: {
                    id: formSubmission._id,
                    uploads: uploads.map(u => ({
                        url: u.imageUrl,
                        folder: u.folderPath
                    }))
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

// Get user's uploaded photos
export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email is required" },
                { status: 400 }
            );
        }

        const sanitizedEmail = email.replace(/[^a-zA-Z0-9._@-]/g, '_');
        
        // Get all images from user's folder in Cloudinary
        const result = await cloudinary.v2.search
            .expression(`folder:${sanitizedEmail}/*`)
            .sort_by('created_at', 'desc')
            .max_results(500)
            .execute();

        return NextResponse.json({
            success: true,
            data: result.resources
        });

    } catch (error) {
        console.error("Error fetching user photos:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}