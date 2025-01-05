import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  if (connectionState === 2) {
    console.log("Connecting to MongoDB");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "nextjsAPIdb",
      bufferCommands: false,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error in Connecting in Database", err);
    throw new Error("Error in Connecting in Database");
  }
};

export default connect;
