const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  register,
  login,
  auth,
  applyDoctor,
  getDoctors,
  getDoctor,
  bookAppointment,
  getAppointments,
  cancelAppointment,
  getProfile,
} = require("../controller/userController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello world!");
});

router.post("/register", register);
router.post("/login", login);
router.post("/auth", authMiddleware, auth);
router.post("/bookappointment/:id", authMiddleware, bookAppointment);
router.post("/applydoctor", authMiddleware, applyDoctor);
router.get("/doctors", getDoctors);
router.post("/profile", authMiddleware, getProfile);
router.get("/doctor/:id", getDoctor);
router.post("/appointments", authMiddleware, getAppointments);
router.post("/cancelappointment/:id", authMiddleware, cancelAppointment);

module.exports = router;
