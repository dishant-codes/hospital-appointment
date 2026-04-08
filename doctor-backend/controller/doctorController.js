import {
	getAllDoctorsService,
	getDoctorByIdService,
	createDoctorService,
	updateDoctorService,
	deleteDoctorService,
} from "../service/doctorService.js";

const getAllDoctorsController = async (req, res) => {
	try {
		const doctors = await getAllDoctorsService();
		res.status(200).json(doctors);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch doctors", error: error.message });
	}
};

const getDoctorByIdController = async (req, res) => {
	try {
		const { id } = req.params;
		const doctor = await getDoctorByIdService(id);
		res.status(200).json(doctor);
	} catch (error) {
		const statusCode = error.message === "Doctor not found" ? 404 : 500;
		const message = error.message === "Doctor not found" ? "Doctor not found" : "Failed to fetch doctor";
		res.status(statusCode).json({ message, error: error.message });
	}
};

const createDoctorController = async (req, res) => {
	try {
		const doctorData = req.body;
		const result = await createDoctorService(doctorData);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ message: "Failed to create doctor", error: error.message });
	}
};

const updateDoctorController = async (req, res) => {
	try {
		const { id } = req.params;
		const doctorData = req.body;
		const result = await updateDoctorService(id, doctorData);
		res.status(200).json(result);
	} catch (error) {
		const statusCode = error.message === "Doctor not found" ? 404 : 500;
		const message = error.message === "Doctor not found" ? "Doctor not found" : "Failed to update doctor";
		res.status(statusCode).json({ message, error: error.message });
	}
};

const deleteDoctorController = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await deleteDoctorService(id);
		res.status(200).json(result);
	} catch (error) {
		const statusCode = error.message === "Doctor not found" ? 404 : 500;
		const message = error.message === "Doctor not found" ? "Doctor not found" : "Failed to delete doctor";
		res.status(statusCode).json({ message, error: error.message });
	}
};

export {
	getAllDoctorsController,
	getDoctorByIdController,
	createDoctorController,
	updateDoctorController,
	deleteDoctorController,
};
