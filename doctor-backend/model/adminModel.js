import mongoose from "mongoose";

import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true
    },
    password:{
        type: String,
        required:true
    },
    role: {
        type: String,
        enum: ["admin"],
        default: "admin"
    }   
}, {timestamps:true})


const Admin = model("Admin", adminSchema);

export default Admin;