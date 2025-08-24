const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctor.controller');
const { requireDoctorAuth } = require('../middleware/doctor.middleware');

router.post('/register', doctorController.register);
router.post('/login', doctorController.login);
router.get('/', doctorController.getAllDoctors);

router.get('/specialization', doctorController.getDoctorsBySpecialization);

router.get('/appointments', requireDoctorAuth, doctorController.getAppointments);

router.put('/update', requireDoctorAuth, doctorController.updateDoctor);
router.get('/me', requireDoctorAuth, doctorController.me);

router.put('/appointments/:id/status', requireDoctorAuth, doctorController.updateAppointmentStatus);

// 🔥 New bulk insert route
router.post('/bulk-register', doctorController.addDoctors);

module.exports = router;
