const Doctor = require("../models/doctor.model");
const Appointment = require("../models/appointment.model");
const { signAccessToken, signRefreshToken } = require("../utils/jwt.js");
const bcrypt = require("bcryptjs");

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ✅ only in production
  sameSite: "strict",
  path: "/"
};

const setAccessCookie = (res, token) => {
  res.cookie("accessToken", token, { ...cookieOpts, maxAge: 15 * 60 * 1000 }); // 15m
};

const setRefreshCookie = (res, token) => {
  res.cookie("refreshToken", token, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7d
};

// ------------------ CONTROLLERS ------------------

// Bulk insert doctors
const addDoctors = async (req, res) => {
  try {
    let doctors = req.body; // Expect array of doctors

    if (!Array.isArray(doctors) || doctors.length === 0) {
      return res.status(400).json({ error: "Request body must be a non-empty array of doctors." });
    }

    // Hash passwords before inserting
    doctors = await Promise.all(
      doctors.map(async (doc) => {
        const hashedPassword = await bcrypt.hash(doc.password, 10);
        return { ...doc, password: hashedPassword };
      })
    );

    const insertedDoctors = await Doctor.insertMany(doctors, { ordered: false });

    res.status(201).json({
      message: `${insertedDoctors.length} doctors added successfully!`,
      data: insertedDoctors
    });
  } catch (err) {
    console.error("Error inserting doctors:", err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "Some doctors already exist with the same email." });
    }
    res.status(500).json({ error: "Something went wrong while adding doctors." });
  }
};

// Register single doctor
const register = async (req, res) => {
  try {
    const { name, email, password, age, specialization, hospital } = req.body;
    const exists = await Doctor.findOne({ email }).lean();
    if (exists) return res.status(400).json({ message: "Doctor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      age,
      specialization,
      hospital
    });

    const accessToken = signAccessToken(doctor._id.toString(), "doctor");
    const refreshToken = signRefreshToken(doctor._id.toString(), "doctor");

    doctor.refreshTokenHash = await bcrypt.hash(refreshToken, 10); // ✅ hash token
    await doctor.save();

    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    return res.status(201).json({ 
      message: "Doctor registered successfully", 
      doctor, 
      accessToken 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login doctor
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email }).select("+password +refreshTokenHash");
    if (!doctor) return res.status(400).json({ message: "Invalid credentials" });

    const validPass = await bcrypt.compare(password, doctor.password);
    if (!validPass) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken(doctor._id.toString(), "doctor");
    const refreshToken = signRefreshToken(doctor._id.toString(), "doctor");

    doctor.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await doctor.save();

    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    return res.json({ message: "Login successful", doctor, accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all appointments for logged-in doctor
const getAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const appointments = await Appointment.find({ doctor: doctorId }).populate("user");
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password -refreshTokenHash");
    res.json({ doctors });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

// Get doctors by specialization
const getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.params;
    const doctors = await Doctor.find({ specialization }).select("-password -refreshTokenHash");
    res.json({ doctors });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

// Get current doctor profile
const me = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id).select("-password -refreshTokenHash");
    res.json({ doctor });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Update doctor profile
const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const updates = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, updates, { new: true }).select("-password -refreshTokenHash");
    res.json({ doctor });
  } catch (err) {
    res.status(500).json({ error: "Failed to update doctor" });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
    res.json({ appointment });
  } catch (err) {
    res.status(500).json({ error: "Failed to update appointment status" });
  }
};

// ------------------ EXPORTS ------------------
module.exports = {
  register,
  login,
  getAppointments,
  getAllDoctors,
  getDoctorsBySpecialization,
  me,
  updateDoctor,
  updateAppointmentStatus,
  addDoctors
};
