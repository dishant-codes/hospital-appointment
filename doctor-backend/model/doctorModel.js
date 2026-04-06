import mongoose from "mongoose";


const {Schema, model} = mongoose;

const doctorSchema = new Schema({
    name : {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type:String,
        required: true,
        unqiue:true,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: true
    },
    contactNumber:{
        type:String,
        required: true,
        trim: true
    },
    password:{
        type: String, 
        required: true
    }, 
    role: {
        type: String, 
        enum: ["doctor"],
        default: "doctor"
    },
    specialization:{
        type: String,
        required: true,
        trim: true,
    },
    exprerience:{
        type: Number,
        required: true,
    }, 
    timeSlots:{
        availableTimeSlots:{
            type:[{}],
            default: []
        },
        bookedTimeSlots:{
            type: [{}],
            default: []
        }
    },
    address:{
        type: String,
        required: true,
        trim: true,
    }

}, {
    timestamps:true,
});

const Doctor = model("Doctor",patientSchema);

export default Doctor;