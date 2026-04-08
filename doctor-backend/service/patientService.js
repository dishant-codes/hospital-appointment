//create patient service functions here
import Patient from "../model/patientModel.js";

const getAllPatientsService = async () => {
    try {
        const patients = await Patient.find();
        return patients;
    } catch (error) {
        throw error;
    }
};

const getPatientByIdService = async (id) => {
    try {
        const patient = await Patient.findById(id);
        if (!patient) {
            throw new Error("Patient not found");
        }
        return patient;
    } catch (error) {
        throw error;
    }
};

const createPatientService = async (patientData) => {
    try {
        const newPatient = new Patient(patientData);
        await newPatient.save();
        return { message: "Patient created successfully" };
    } catch (error) {
        throw error;
    }
};

const updatePatientService = async (id, patientData) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, patientData, { new: true });
        if (!updatedPatient) {
            throw new Error("Patient not found");
        }
        return { message: "Patient updated successfully", patient: updatedPatient };
    } catch (error) {
        throw error;
    }
};

const deletePatientService = async (id) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(id);
        if (!deletedPatient) {
            throw new Error("Patient not found");
        }
        return { message: "Patient deleted successfully" };
    } catch (error) {
        throw error;
    }
};

export {
    getAllPatientsService,
    getPatientByIdService,
    createPatientService,
    updatePatientService,
    deletePatientService,
};