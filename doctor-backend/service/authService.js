//create login and register service functions here
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Patient from "../model/patientModel.js";
import Doctor from "../model/doctorModel.js";
import Admin from "../model/adminModel.js";


const registerPatientService = async (patientData) => {
    try {
        // Check if email already exists
        const existingPatient = await Patient.findOne({ email: patientData.email });
        if (existingPatient) {
            throw new Error("Email already in use");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(patientData.password, 10);
        patientData.password = hashedPassword;

        // Create and save the patient
        const newPatient = new Patient(patientData);
        await newPatient.save();

        return { message: "Patient registered successfully" };
    } catch (error) {
        throw error;
    }
};

const registerDoctorService = async (doctorData) => {
    try {
        // Check if email already exists
        const existingDoctor = await Doctor.findOne({ email: doctorData.email });
        if (existingDoctor) {
            throw new Error("Email already in use");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(doctorData.password, 10);
        doctorData.password = hashedPassword;

        // Create and save the doctor
        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        return { message: "Doctor registered successfully" };
    } catch (error) {
        throw error;
    }
};

const loginService = async (email, password, role) => {
    try {
        // Check if user exists in patients
        let user;
        if (role === "patient") {
            user = await Patient.findOne({ email });
        } else if (role === "doctor") {
            user = await Doctor.findOne({ email });
        } else if (role === "admin") {
            user = await Admin.findOne({ email });
        } else {
            throw new Error("Invalid role specified");
        }

        if (!user) {
            throw new Error("User not found");
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const userId = user._id.toString();
        const response = {
            message: "User logged in successfully",
            token,
            role,
            userId,
        };

        if (role === "doctor") {
            response.doctorId = userId;
        } else if (role === "patient") {
            response.patientId = userId;
        } else if (role === "admin") {
            response.adminId = userId;
        }

        return response;
    } catch (error) {
        throw error;
    }
};

const adminLoginService = async (email, password) => {
    try {
        const user = await Admin.findOne({ email });

       

        if (!user) {
            throw new Error("User not found");
        }

        // const isMatch = await bcrypt.compare(password, user.password);
        if(password !== user.password) {
            throw new Error("Invalid credentials");
        }
        // if (!isMatch) {
        // //     throw new Error("Invalid credentials");
        // }

        const role = "admin";
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const userId = user._id.toString();

        return {
            message: "User logged in successfully",
            token,
            role,
            userId,
            adminId: userId,
        };
    } catch (error) {
        throw error;
    }
};

export { registerPatientService, registerDoctorService, loginService, adminLoginService };