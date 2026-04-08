import {
	getAllPatientsService,
	getPatientByIdService,
	createPatientService,
	updatePatientService,
	deletePatientService,
} from "../service/patientService.js";

const getAllPatientsController = async (req, res) => {
	try {
		const patients = await getAllPatientsService();
		res.status(200).json(patients);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch patients", error: error.message });
	}
};

const getPatientByIdController = async (req, res) => {
	try {
		const { id } = req.params;
		const patient = await getPatientByIdService(id);
		res.status(200).json(patient);
	} catch (error) {
		const statusCode = error.message === "Patient not found" ? 404 : 500;
		const message = error.message === "Patient not found" ? "Patient not found" : "Failed to fetch patient";
		res.status(statusCode).json({ message, error: error.message });
	}
};

const createPatientController = async (req, res) => {
	try {
		const patientData = req.body;
		const result = await createPatientService(patientData);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ message: "Failed to create patient", error: error.message });
	}
};

const updatePatientController = async (req, res) => {
	try {
		const { id } = req.params;
		const patientData = req.body;
		const result = await updatePatientService(id, patientData);
		res.status(200).json(result);
	} catch (error) {
		const statusCode = error.message === "Patient not found" ? 404 : 500;
		const message = error.message === "Patient not found" ? "Patient not found" : "Failed to update patient";
		res.status(statusCode).json({ message, error: error.message });
	}
};

const deletePatientController = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await deletePatientService(id);
		res.status(200).json(result);
	} catch (error) {
		const statusCode = error.message === "Patient not found" ? 404 : 500;
		const message = error.message === "Patient not found" ? "Patient not found" : "Failed to delete patient";
		res.status(statusCode).json({ message, error: error.message });
	}
};

export {
	getAllPatientsController,
	getPatientByIdController,
	createPatientController,
	updatePatientController,
	deletePatientController,
};
