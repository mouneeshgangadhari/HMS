const router = require("express").Router();
const { requireAuth, requireRole } = require("../middleware/auth.middleware");
const ctrl=require("../controller/appointment.controller");

router.post("/book", requireAuth, ctrl.createAppointment);
router.get("/my", requireAuth, ctrl.userAppointments);
router.get("/doctor", requireAuth, requireRole("Doctor"), ctrl.doctorAppointments);
router.post("/bulk", ctrl.bulkAddAppointments);
module.exports = router;