import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import Patient from "../model/patientModel";
import Doctor from "../model/doctorModel";


const registerPatientService = async (patientData) =>{


    try{

        const existingPatient = await Patient.findOne({email: patientData.email});
        if(existingPatient){
            throw new Error("Email Already in use");
        }


        const hashPassword = await bcrypt.hash(patientData.password, 10);
        patientData.password = hashPassword;


        const newPatient = new Patient(patientData);
        await newPatient.save();


        return {
            message: "Patient is Registered"
        }

    }
    catch(error){
        throw error;
    }
    
}


const registerDoctorService = async (doctorData)=>{

    try{
        const existingDoctor = await Doctor.findOne({email: doctorData.email});
        if(existingDoctor){
            throw new Error("Email Already in use");
        }

        const hashPassword = await bcrypt.hash(doctorData.password, 10);
        doctorData.password = hashPassword;


        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();
    }
    catch(error){
        throw error;
    }

}


const loginService = async (email, password, role)=>{

    try{

        if(role == "patient"){
            user = await Patient.findOne({email});
        }else if(role == "doctor"){
            user = await Doctor.findOne({email});
        }else{
            throw new Error("invalid role specified!")
        }



        if(!user){
            throw new Error("User Not Found")
        }



        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error("Invalid Credentials");
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

        if(role == "doctor"){
            response.doctorId = userId;
        }else if(role == "patient"){
            response.patientId = userId;
        }


        return response;
    }
    catch(error){
        throw error;
    }
}


export {registerDoctorService, registerPatientService, loginService};