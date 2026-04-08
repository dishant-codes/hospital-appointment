import jwt from "jsonwebtoken";
import Patient from "../model/patientModel.js";
import Doctor from "../model/doctorModel.js";
import Admin from "../model/adminModel.js";

const getTokenFromHeader = (req) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return null;
	}

	return authHeader.split(" ")[1];
};

const findUserByRole = async (id, role) => {
	if (role === "patient") {
		return Patient.findById(id).select("-password");
	}

	if (role === "doctor") {
		return Doctor.findById(id).select("-password");
	}

	if (role === "admin") {
		return Admin.findById(id).select("-password");
	}

	return null;
};

const authorizeRoles = (...allowedRoles) => {
	return async (req, res, next) => {
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

			if (!allowedRoles.includes(role)) {
				return res.status(403).json({
					message: "Authorization failed",
					error: `Only ${allowedRoles.join("/")} can access this route`,
				});
			}

			const user = await findUserByRole(id, role);

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
				message: "Authorization process failed",
				error: error.message,
			});
		}
	};
};

const authorizePatient = authorizeRoles("patient");
const authorizeDoctor = authorizeRoles("doctor");
const authorizeAdmin = authorizeRoles("admin");

const verifyPatient = authorizePatient;
const verifyDoctor = authorizeDoctor;
const verifyAdmin = authorizeAdmin;

export {
	authorizeRoles,
	authorizePatient,
	authorizeDoctor,
	authorizeAdmin,
	verifyPatient,
	verifyDoctor,
	verifyAdmin,
};
