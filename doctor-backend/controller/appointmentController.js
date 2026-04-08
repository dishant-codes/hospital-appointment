import {
	getAllAppointmentsService,
	getAppointmentsByDoctorIdService,
	getAppointmentByIdService,
	createAppointmentService,
	updateAppointmentService,
	deleteAppointmentService,
} from "../service/appointmentService.js";

const getAllAppointmentsController = async (req, res) => {
	try {
		const appointments = await getAllAppointmentsService();
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
	}
};

const getAppointmentsByDoctorIdController = async (req, res) => {
	try {
		const { doctorId } = req.params;

		if (req.user.role === "doctor" && req.user.id !== doctorId) {
			return res.status(403).json({
				message: "Authorization failed",
				error: "Doctors can only view their own appointments",
			});
		}

		const appointments = await getAppointmentsByDoctorIdService(doctorId);
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch doctor appointments", error: error.message });
	}
};

const getAppointmentByIdController = async (req, res) => {
	try {
		const { id } = req.params;
		const appointment = await getAppointmentByIdService(id);
		res.status(200).json(appointment);
	} catch (error) {
		const statusCode = error.message === "Appointment not found" ? 404 : 500;
		const message = error.message === "Appointment not found" ? "Appointment not found" : "Failed to fetch appointment";
		res.status(statusCode).json({ message, error: error.message });
	}
};

const createAppointmentController = async (req, res) => {
	try {
		const appointmentData = req.body;
		const result = await createAppointmentService(appointmentData);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ message: "Failed to create appointment", error: error.message });
	}
};

const updateAppointmentController = async (req, res) => {
	try {
		const { id } = req.params;
		const appointmentData = req.body;
		const result = await updateAppointmentService(id, appointmentData);
		res.status(200).json(result);
	} catch (error) {
		const statusCode = error.message === "Appointment not found" ? 404 : 500;
		const message = error.message === "Appointment not found" ? "Appointment not found" : "Failed to update appointment";
		res.status(statusCode).json({ message, error: error.message });
	}
};

const deleteAppointmentController = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await deleteAppointmentService(id);
		res.status(200).json(result);
	} catch (error) {
		const statusCode = error.message === "Appointment not found" ? 404 : 500;
		const message = error.message === "Appointment not found" ? "Appointment not found" : "Failed to delete appointment";
		res.status(statusCode).json({ message, error: error.message });
	}
};

export {
	getAllAppointmentsController,
	getAppointmentsByDoctorIdController,
	getAppointmentByIdController,
	createAppointmentController,
	updateAppointmentController,
	deleteAppointmentController,
};
