import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB Connected Successfully")
    );
    mongoose.connection.on("error", (err) =>
      console.error("MongoDB Connection Error:", err)
    );

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
