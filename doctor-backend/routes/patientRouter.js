import {Router} from "express";
import {
  getAllPatientsController,
  getPatientByIdController,
  createPatientController,
  updatePatientController,
  deletePatientController,
} from "../controller/patientController.js";
import { authorizeRoles, verifyAdmin } from "../middleware/authoraization.js";
import { validateCreatePatientBody, validateUpdatePatientBody } from "../middleware/patientMiddleware.js";

const patientRouter = Router();
const verifyAuthenticatedUser = authorizeRoles("patient", "doctor", "admin");

// GET /patients - Get all patients (admin only)
patientRouter.get("/", verifyAdmin, getAllPatientsController);

// GET /patients/:id - Get a specific patient by ID
patientRouter.get("/:id", verifyAuthenticatedUser, getPatientByIdController);

// POST /patients - Create a new patient (admin only)
patientRouter.post("/", verifyAdmin, validateCreatePatientBody, createPatientController);

// PUT /patients/:id - Update a patient's information
patientRouter.put("/:id", verifyAuthenticatedUser, validateUpdatePatientBody, updatePatientController);

// DELETE /patients/:id - Delete a patient (admin only)
patientRouter.delete("/:id", verifyAdmin, deletePatientController);

export default patientRouter;