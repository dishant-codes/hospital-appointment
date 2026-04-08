import {Router} from "express";
import {
	getAllAppointmentsController,
	getAppointmentsByDoctorIdController,
	getAppointmentByIdController,
	createAppointmentController,
	updateAppointmentController,
	deleteAppointmentController,
} from "../controller/appointmentController.js";
import { authorizeRoles, verifyAdmin } from "../middleware/authoraization.js";
import {
	validateCreateAppointmentBody,
	validateUpdateAppointmentBody,
} from "../middleware/appointmentMiddleware.js";

const appointmentRouter = Router();
const verifyAuthenticatedUser = authorizeRoles("patient", "doctor", "admin");
const verifyDoctorOrAdmin = authorizeRoles("doctor", "admin");

// GET /appointments - Get all appointments (admin only)
appointmentRouter.get("/", verifyAdmin, getAllAppointmentsController);

// GET /appointments/doctor/:doctorId - Get all appointments for a specific doctor (doctor/admin)
appointmentRouter.get("/doctor/:doctorId", verifyDoctorOrAdmin, getAppointmentsByDoctorIdController);

// GET /appointments/:id - Get a specific appointment by ID
appointmentRouter.get("/:id", verifyAuthenticatedUser, getAppointmentByIdController);

// POST /appointments - Create a new appointment
appointmentRouter.post("/", verifyAuthenticatedUser, validateCreateAppointmentBody, createAppointmentController);

// PUT /appointments/:id - Update an appointment's information
appointmentRouter.put("/:id", verifyAuthenticatedUser, validateUpdateAppointmentBody, updateAppointmentController);

// DELETE /appointments/:id - Delete an appointment (admin only)
appointmentRouter.delete("/:id", verifyAdmin, deleteAppointmentController);

export default appointmentRouter;
