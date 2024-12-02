// "use server";

// import Questions from "@/models/Questions";
// import connectDB from "@/db/connectDb";
// import Email from "@/models/Email";
// import WaitList from "@/models/WaitList";

// export const QuestionFormHandler = async (formData) => {
//     try {
//         // Ensure the database is connected
//         await connectDB();
//         console.log("Connected to MongoDB!");

//         // Validate formData
//         const { name, email, responses } = formData;

//         if (!name || !email || !responses || typeof responses !== "object") {
//             throw new Error("Missing or invalid required fields: name, email, or responses");
//         }

//         // Prepare the data to save
//         const dataToSave = {
//             name,
//             email,
//             responses, // Store the plain object directly
//         };

//         // Save the data to the database
//         const question = await Questions.create(dataToSave);
//         console.log("Question saved:", question);

//         return { success: true, data: question };
//     } catch (error) {
//         console.error("Error saving data:", error.message);

//         // Return a detailed error response
//         return { success: false, error: error.message };
//     }
// };



// export const EmailHandler = async (formdata)=>{
//     try{
//         await connectDB();
//         console.log("Connected to MongoDB!");
//         const { email } = formdata;
//         if (!email || !responses || typeof responses !== "object") {
//             throw new Error("Missing or invalid required fields: email, or responses");
//         }
//         // Prepare the data to save
//         const emailToSave = {
//             email
//         };
//         const emails = await Email.create(emailToSave);
//         console.log("Email saved:", emails);
//         return { success: true, data: emails };
//     }  catch (error) {
//         console.error("Error saving email:", error.message);

//         // Return a detailed error response
//         return { success: false, error: error.message };
//     }
// }
// export const WaitListHandler = async (formdata)=>{
//     try{
//         await connectDB();
//         console.log("Connected to MongoDB!");
//         const { name, email, poc } = formdata;
//         if (!name || !email || !responses || typeof responses !== "object") {
//             throw new Error("Missing or invalid required fields: email, name ");
//         }
//         // Prepare the data to save
//         const emailToSave = {
//             email,
//             email,
//             poc
//         };
//         const waitlists = await Email.create(emailToSave);
//         console.log("Wailt List Form saved:", waitlists);
//         return { success: true, data: waitlists };
//     }  catch (error) {
//         console.error("Error saving email:", error.message);

//         // Return a detailed error response
//         return { success: false, error: error.message };
//     }
// }




