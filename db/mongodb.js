const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected: " + conn.connection.db.databaseName);
  } catch (error) {
    console.log("Error connecting to MongoDB: " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
