const isNonEmptyString = (value) => typeof value === "string" && value.trim() !== "";

const isValidTimeSlots = (timeSlots) => {
	if (typeof timeSlots !== "object" || timeSlots === null) {
		return false;
	}

	const { availableTimeSlots, bookedTimeSlots } = timeSlots;

	if (availableTimeSlots !== undefined) {
		if (!Array.isArray(availableTimeSlots) || !availableTimeSlots.every((slot) => isNonEmptyString(slot))) {
			return false;
		}
	}

	if (bookedTimeSlots !== undefined) {
		if (!Array.isArray(bookedTimeSlots) || !bookedTimeSlots.every((slot) => isNonEmptyString(slot))) {
			return false;
		}
	}

	return true;
};

const validateCreateDoctorBody = (req, res, next) => {
	const {
		name,
		email,
		age,
		contactNumber,
		password,
		role,
		specialization,
		experience,
		timeSlots,
		address,
	} = req.body;

	if (
		!isNonEmptyString(name) ||
		!isNonEmptyString(email) ||
		typeof age !== "number" ||
		age <= 0 ||
		!isNonEmptyString(contactNumber) ||
		!isNonEmptyString(password) ||
		!isNonEmptyString(specialization) ||
		typeof experience !== "number" ||
		experience < 0 ||
		!isNonEmptyString(address)
	) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "name, email, age, contactNumber, password, specialization, experience, and address are required",
		});
	}

	if (role !== undefined && role !== "doctor") {
		return res.status(400).json({
			message: "Invalid request body",
			error: "role must be doctor",
		});
	}

	if (timeSlots !== undefined && !isValidTimeSlots(timeSlots)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "timeSlots must have string arrays for availableTimeSlots/bookedTimeSlots",
		});
	}

	next();
};

const validateUpdateDoctorBody = (req, res, next) => {
	const updates = req.body;
	const allowedFields = [
		"name",
		"email",
		"age",
		"contactNumber",
		"password",
		"role",
		"specialization",
		"experience",
		"timeSlots",
		"address",
	];
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

	if (updates.name !== undefined && !isNonEmptyString(updates.name)) {
		return res.status(400).json({ message: "Invalid request body", error: "name must be a non-empty string" });
	}

	if (updates.email !== undefined && !isNonEmptyString(updates.email)) {
		return res.status(400).json({ message: "Invalid request body", error: "email must be a non-empty string" });
	}

	if (updates.age !== undefined && (typeof updates.age !== "number" || updates.age <= 0)) {
		return res.status(400).json({ message: "Invalid request body", error: "age must be a positive number" });
	}

	if (updates.contactNumber !== undefined && !isNonEmptyString(updates.contactNumber)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "contactNumber must be a non-empty string",
		});
	}

	if (updates.password !== undefined && !isNonEmptyString(updates.password)) {
		return res.status(400).json({ message: "Invalid request body", error: "password must be a non-empty string" });
	}

	if (updates.role !== undefined && updates.role !== "doctor") {
		return res.status(400).json({ message: "Invalid request body", error: "role must be doctor" });
	}

	if (updates.specialization !== undefined && !isNonEmptyString(updates.specialization)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "specialization must be a non-empty string",
		});
	}

	if (updates.experience !== undefined && (typeof updates.experience !== "number" || updates.experience < 0)) {
		return res.status(400).json({ message: "Invalid request body", error: "experience must be a non-negative number" });
	}

	if (updates.timeSlots !== undefined && !isValidTimeSlots(updates.timeSlots)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "timeSlots must have string arrays for availableTimeSlots/bookedTimeSlots",
		});
	}

	if (updates.address !== undefined && !isNonEmptyString(updates.address)) {
		return res.status(400).json({ message: "Invalid request body", error: "address must be a non-empty string" });
	}

	next();
};

export { validateCreateDoctorBody, validateUpdateDoctorBody };
