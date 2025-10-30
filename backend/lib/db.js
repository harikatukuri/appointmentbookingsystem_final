const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = "mongodb+srv://harika_db_user:VC1WBCrPb0HyuOKb@cluster0.ls18rx6.mongodb.net/?appName=Cluster0";

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
