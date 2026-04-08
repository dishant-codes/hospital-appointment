//create appointment service functions here
import Appointment from "../model/appointmentModel.js";

const getAllAppointmentsService = async () => {
    try {
        const appointments = await Appointment.find();
        return appointments;
    } catch (error) {
        throw error;
    }
};

const getAppointmentsByDoctorIdService = async (doctorId) => {
    try {
        const appointments = await Appointment.find({ doctorId })
            .populate("patientId", "name email contactNumber age")
            .sort({ appointmentDate: 1, createdAt: -1 });
        return appointments;
    } catch (error) {
        throw error;
    }
};

const getAppointmentByIdService = async (id) => {
    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            throw new Error("Appointment not found");
        }
        return appointment;
    } catch (error) {
        throw error;
    }
};

const createAppointmentService = async (appointmentData) => {
    try {
        const newAppointment = new Appointment(appointmentData);
        await newAppointment.save();
        return { message: "Appointment created successfully" };
    } catch (error) {
        throw error;
    }
};

const updateAppointmentService = async (id, appointmentData) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, appointmentData, { new: true });
        if (!updatedAppointment) {
            throw new Error("Appointment not found");
        }
        return { message: "Appointment updated successfully", appointment: updatedAppointment };
    } catch (error) {
        throw error;
    }
};

const deleteAppointmentService = async (id) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            throw new Error("Appointment not found");
        }
        return { message: "Appointment deleted successfully" };
    } catch (error) {
        throw error;
    }
};

export {
    getAllAppointmentsService,
    getAppointmentsByDoctorIdService,
    getAppointmentByIdService,
    createAppointmentService,
    updateAppointmentService,
    deleteAppointmentService
};