const Appointment = require("../models/appointment.model.js");
const Doctor = require("../models/doctor.model.js");
const User = require("../models/user.model.js"); // You forgot to import this earlier

// ✅ Book a single appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;

    // create appointment
    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      time
    });

    // push appointment to patient
    await User.findByIdAndUpdate(patientId, {
      $push: { appointments: appointment._id }
    });

    // push appointment to doctor
    await Doctor.findByIdAndUpdate(doctorId, {
      $push: { appointments: appointment._id }
    });

    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all appointments for a user
exports.userAppointments = async (req, res) => {
  try {
    // ✅ read patientId from query
    const userId = req.query.patientId;

    const appointments = await Appointment.find({ user: userId })
      .populate("doctor", "name specialization email");

    res.json({ appointments });
  } catch (err) {
    console.error("User Appointments error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get all appointments for a doctor
exports.doctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("user", "name email"); // populate user info
    res.json({ appointments });
  } catch (err) {
    console.error("Doctor Appointments error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Bulk add multiple appointments
exports.bulkAddAppointments = async (req, res) => {
  try {
    const appointments = req.body;

    if (!Array.isArray(appointments) || appointments.length === 0) {
      return res.status(400).json({ error: "Provide a list of appointments" });
    }

    // Insert appointments
    const createdAppointments = await Appointment.insertMany(appointments);

    // Group by doctorId & userId
    const doctorUpdates = {};
    const userUpdates = {};

    createdAppointments.forEach(app => {
      // doctor updates
      if (!doctorUpdates[app.doctor]) {
        doctorUpdates[app.doctor] = [];
      }
      doctorUpdates[app.doctor].push(app._id);

      // user updates
      if (!userUpdates[app.user]) {
        userUpdates[app.user] = [];
      }
      userUpdates[app.user].push(app._id);
    });

    // Update doctors
    const doctorPromises = Object.keys(doctorUpdates).map(doctorId => {
      return Doctor.findByIdAndUpdate(
        doctorId,
        { $push: { appointments: { $each: doctorUpdates[doctorId] } } },
        { new: true }
      );
    });

    // Update users
    const userPromises = Object.keys(userUpdates).map(userId => {
      return User.findByIdAndUpdate(
        userId,
        { $push: { appointments: { $each: userUpdates[userId] } } },
        { new: true }
      );
    });

    await Promise.all([...doctorPromises, ...userPromises]);

    res.status(201).json({
      message: "Appointments added successfully",
      count: createdAppointments.length,
      appointments: createdAppointments
    });
  } catch (err) {
    console.error("Bulk Appointments Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
