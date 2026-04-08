import mongoose from "mongoose";

const allowedStatus = ["scheduled", "completed", "cancelled"];

const isNonEmptyString = (value) => typeof value === "string" && value.trim() !== "";

const isValidDateValue = (value) => {
	const date = new Date(value);
	return !Number.isNaN(date.getTime());
};

const isValidObjectId = (id) => isNonEmptyString(id) && mongoose.Types.ObjectId.isValid(id);

const validateCreateAppointmentBody = (req, res, next) => {
	const { patientId, doctorId, appointmentDate, appointmentTime, status } = req.body;

	if (
		!isValidObjectId(patientId) ||
		!isValidObjectId(doctorId) ||
		!isValidDateValue(appointmentDate) ||
		!isNonEmptyString(appointmentTime)
	) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "patientId, doctorId, appointmentDate, and appointmentTime are required with valid values",
		});
	}

	if (status !== undefined && !allowedStatus.includes(status)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "status must be one of scheduled/completed/cancelled",
		});
	}

	next();
};

const validateUpdateAppointmentBody = (req, res, next) => {
	const updates = req.body;
	const allowedFields = ["patientId", "doctorId", "appointmentDate", "appointmentTime", "status"];
	const keys = Object.keys(updates);

	if (keys.length === 0) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "At least one field is required for update",
		});
	}

	const hasInvalidField = keys.some((key) => !allowedFields.includes(key));
	if (hasInvalidField) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "Request contains unsupported fields",
		});
	}

	if (updates.patientId !== undefined && !isValidObjectId(updates.patientId)) {
		return res.status(400).json({ message: "Invalid request body", error: "patientId must be a valid ObjectId" });
	}

	if (updates.doctorId !== undefined && !isValidObjectId(updates.doctorId)) {
		return res.status(400).json({ message: "Invalid request body", error: "doctorId must be a valid ObjectId" });
	}

	if (updates.appointmentDate !== undefined && !isValidDateValue(updates.appointmentDate)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "appointmentDate must be a valid date",
		});
	}

	if (updates.appointmentTime !== undefined && !isNonEmptyString(updates.appointmentTime)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "appointmentTime must be a non-empty string",
		});
	}

	if (updates.status !== undefined && !allowedStatus.includes(updates.status)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "status must be one of scheduled/completed/cancelled",
		});
	}

	next();
};

export { validateCreateAppointmentBody, validateUpdateAppointmentBody };
