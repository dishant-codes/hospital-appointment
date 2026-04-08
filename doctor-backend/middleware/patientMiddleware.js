const isNonEmptyString = (value) => typeof value === "string" && value.trim() !== "";

const validateCreatePatientBody = (req, res, next) => {
	const { name, email, age, contactNumber, password, role, address } = req.body;

	if (
		!isNonEmptyString(name) ||
		!isNonEmptyString(email) ||
		typeof age !== "number" ||
		age <= 0 ||
		!isNonEmptyString(contactNumber) ||
		!isNonEmptyString(password) ||
		!isNonEmptyString(address)
	) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "name, email, age, contactNumber, password, and address are required",
		});
	}

	if (role !== undefined && role !== "patient") {
		return res.status(400).json({
			message: "Invalid request body",
			error: "role must be patient",
		});
	}

	next();
};

const validateUpdatePatientBody = (req, res, next) => {
	const updates = req.body;
	const allowedFields = ["name", "email", "age", "contactNumber", "password", "role", "address"];
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

	if (updates.role !== undefined && updates.role !== "patient") {
		return res.status(400).json({ message: "Invalid request body", error: "role must be patient" });
	}

	if (updates.address !== undefined && !isNonEmptyString(updates.address)) {
		return res.status(400).json({ message: "Invalid request body", error: "address must be a non-empty string" });
	}

	next();
};

export { validateCreatePatientBody, validateUpdatePatientBody };
