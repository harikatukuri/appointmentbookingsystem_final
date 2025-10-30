const mongoose = require("mongoose");
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("🔁 Using existing MongoDB connection");
    return;
  }

  try {
    const mongoURI = "mongodb+srv://harika_db_user:VC1WBCrPb0HyuOKb@cluster0.ls18rx6.mongodb.net/?appName=Cluster0";
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
