import jwt from "jsonwebtoken";
import Patient from "../model/patientModel.js";
import Doctor from "../model/doctorModel.js";

const getTokenFromHeader = (req) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return null;
	}

	return authHeader.split(" ")[1];
};

const authenticatePatientDoctor = async (req, res, next) => {
	try {
		const token = getTokenFromHeader(req);

		if (!token) {
			return res.status(401).json({
				message: "Authentication failed",
				error: "Missing or invalid authorization token",
			});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { id, role } = decoded;

		if (!id || !role) {
			return res.status(401).json({
				message: "Authentication failed",
				error: "Invalid token payload",
			});
		}

		if (role !== "patient" && role !== "doctor") {
			return res.status(403).json({
				message: "Authorization failed",
				error: "Only patient or doctor can access this route",
			});
		}

		const user =
			role === "patient"
				? await Patient.findById(id).select("-password")
				: await Doctor.findById(id).select("-password");

		if (!user) {
			return res.status(401).json({
				message: "Authentication failed",
				error: "User not found",
			});
		}

		req.user = {
			id: user._id.toString(),
			role,
		};
		req.authenticatedUser = user;

		next();
	} catch (error) {
		if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
			return res.status(401).json({
				message: "Authentication failed",
				error: "Invalid or expired token",
			});
		}

		return res.status(500).json({
			message: "Authentication process failed",
			error: error.message,
		});
	}
};

const verifyToken = authenticatePatientDoctor;

export { authenticatePatientDoctor, verifyToken };
