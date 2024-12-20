import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../backend/config/config.env" });

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_SECERT_KEY,
});

// Test Function to Upload Image
const testCloudinary = async () => {
    try {
        const result = await cloudinary.uploader.upload(
            "C:/Users/Admin/Desktop/nn/backend/assets/imges/Screenshot 2024-09-07 110925.png", // Your file path
            {
                folder: "test_uploads", // Optional: Folder in Cloudinary
            }
        );

        console.log("Upload Successful!");
        console.log("Public ID:", result.public_id);
        console.log("Secure URL:", result.secure_url);
    } catch (error) {
        console.error("Cloudinary Upload Error:", error.message);
    }
};

testCloudinary();
