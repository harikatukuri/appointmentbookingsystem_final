const express = require("express");
const cors = require("cors");
const connectDB = require("./lib/db");
const Doctor = require("./models/Doctor");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const jwt = require("./jwt");
const booking = require("./booking");

app.get("/", (req, res) => {
  //get the doctors data
  res.send("Main Hello World!");
});

app.use("/auth", jwt);
app.use("/booking", booking);

app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("app listening on port 3000!");
});
