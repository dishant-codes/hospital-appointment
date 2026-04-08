const isNonEmptyString = (value) => typeof value === "string" && value.trim() !== "";
const isValidPositiveNumber = (value) => typeof value === "number" && value > 0;
const isValidNonNegativeNumber = (value) => typeof value === "number" && value >= 0;

const validateLoginBody = (req, res, next) => {
	const { email, password, role } = req.body;

	if (!isNonEmptyString(email) || !isNonEmptyString(password) || !isNonEmptyString(role)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "email, password, and role are required"
		});
	}

	next();
};

const validateAdminLoginBody = (req, res, next) => {
	const { email, password } = req.body;

	if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "email and password are required"
		});
	}

	next();
};

const validateRegisterBody = (req, res, next) => {
	const {
		name,
		email,
		age,
		contactNumber,
		password,
		role,
		address,
		specialization,
		experience
	} = req.body;

	if (!isNonEmptyString(role)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "role is required"
		});
	}

	if (role !== "patient" && role !== "doctor") {
		return res.status(400).json({
			message: "Invalid request body",
			error: "role must be either patient or doctor"
		});
	}

	if (
		!isNonEmptyString(name) ||
		!isNonEmptyString(email) ||
		!isValidPositiveNumber(age) ||
		!isNonEmptyString(contactNumber) ||
		!isNonEmptyString(password) ||
		!isNonEmptyString(address)
	) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "name, email, age, contactNumber, password, and address are required"
		});
	}

	if (role === "patient") {
		return next();
	}

	if (!isNonEmptyString(specialization) || !isValidNonNegativeNumber(experience)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "specialization and experience are required for doctor registration"
		});
	}

	next();
};

export { validateLoginBody, validateAdminLoginBody, validateRegisterBody };
