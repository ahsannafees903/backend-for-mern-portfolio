import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_PERSONAL_PORTFOLIO",
      useNewUrlParser: true,         // Ensures parsing MongoDB connection strings correctly
      useUnifiedTopology: true,     // Uses new connection management engine
    });
    console.log("Connected to database successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit process on failure to prevent undefined behavior
  }
};
