const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  initials: {
    required: true,
    type: String,
  },
  name: String,
  specialty: String,
  experience: String,
  availability: String,
});

module.exports = mongoose.model("Doctor", doctorSchema);
