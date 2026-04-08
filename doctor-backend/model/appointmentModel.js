import mongoose from "mongoose";

import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({
   
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required:true,
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentDate:{
        type: Date,
        required: true,
    },
    appointmentTime:{
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type:String,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled"
    }

}, {timestamps:true})


const Appointment = model("appointment", appointmentSchema);

export default Appointment;