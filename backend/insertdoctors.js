const mongoose = require("mongoose");
const connectDB = require("./lib/db"); // your db.js
const Doctor = require("./models/Doctor");
const User = require("./models/users");
// Load env variables if needed


// Doctors data
const doctorsData = [
  { initials: "SJ", name: "Dr. Sarah Johnson", specialty: "Cardiologist", experience: "15 years experience", availability: "Available" },
  { initials: "MC", name: "Dr. Michael Chen", specialty: "Neurologist", experience: "12 years experience", availability: "Available" },
  { initials: "ER", name: "Dr. Emily Rodriguez", specialty: "Pediatrician", experience: "8 years experience", availability: "Available" },
  { initials: "JW", name: "Dr. James Wilson", specialty: "Orthopedic Surgeon", experience: "20 years experience", availability: "Busy" },
  { initials: "AK", name: "Dr. Ananya Kapoor", specialty: "Dermatologist", experience: "10 years experience", availability: "Available" },
  { initials: "RS", name: "Dr. Rajesh Sharma", specialty: "General Physician", experience: "18 years experience", availability: "Available" },
  { initials: "LP", name: "Dr. Laura Patel", specialty: "Gynecologist", experience: "14 years experience", availability: "Busy" },
  { initials: "OM", name: "Dr. Omar Malik", specialty: "ENT Specialist", experience: "11 years experience", availability: "Available" },
  { initials: "NT", name: "Dr. Neha Thakur", specialty: "Psychiatrist", experience: "9 years experience", availability: "Available" },
  { initials: "VK", name: "Dr. Vivek Khanna", specialty: "Oncologist", experience: "16 years experience", availability: "Busy" },
  { initials: "SL", name: "Dr. Sophia Lee", specialty: "Endocrinologist", experience: "13 years experience", availability: "Available" },
  { initials: "AM", name: "Dr. Ahmed Mustafa", specialty: "Pulmonologist", experience: "7 years experience", availability: "Available" }
];

const insertDoctors = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/appointmentbooking");
    console.log("✅ MongoDB Connected to database:", mongoose.connection.name);

    // Optional: clear existing data
    await Doctor.deleteMany({});
    console.log("🧹 Existing doctors cleared");

    // Insert new data
    const inserted = await Doctor.insertMany(doctorsData);
    console.log("✅ Doctors data inserted successfully!");
    console.log("Inserted documents count:", inserted.length);

    const insertuser = await User.insertOne({ username: "admin", password: "admin" });
    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting doctors:", error);
    mongoose.connection.close();
  }
};

// Run the insert function
insertDoctors();
