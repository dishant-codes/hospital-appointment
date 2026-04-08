//Create doctor service functions here
import Doctor from "../model/doctorModel.js";

const getAllDoctorsService = async () => {
    try {
        const doctors = await Doctor.find();
        return doctors;
    } catch (error) {
        throw error;
    }
};

const getDoctorByIdService = async (id) => {
    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            throw new Error("Doctor not found");
        }
        return doctor;
    } catch (error) {
        throw error;
    }
};

const createDoctorService = async (doctorData) => {
    try {
        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();
        return { message: "Doctor created successfully" };
    } catch (error) {
        throw error;
    }
};

const updateDoctorService = async (id, doctorData) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorData, { new: true });
        if (!updatedDoctor) {
            throw new Error("Doctor not found");
        }
        return { message: "Doctor updated successfully", doctor: updatedDoctor };
    } catch (error) {
        throw error;
    }
};

const deleteDoctorService = async (id) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        if (!deletedDoctor) {
            throw new Error("Doctor not found");
        }
        return { message: "Doctor deleted successfully" };
    } catch (error) {
        throw error;
    }
};

export {
    getAllDoctorsService,
    getDoctorByIdService,
    createDoctorService,
    updateDoctorService,
    deleteDoctorService,
};