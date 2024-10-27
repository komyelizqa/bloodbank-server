import express from "express";
import * as appointmentController from "../controllers/appointment-controller.js";

const router = express.Router();

router.get("/calendar", appointmentController.getCalendar);

router.post("/appointments", appointmentController.createAppointment);

router.delete("/appointments/:appointmentId", appointmentController.deleteAppointment);

export default router;
