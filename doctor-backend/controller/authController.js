import { loginService, registerDoctorService, registerPatientService } from "../service/authService";

const loginController = async (req, res)=>{

    try{
        const {email, password, role} = req.body;

        const result = await loginService(email,password, role);

        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message: `Login Failed : ${error.message}`})
    }
}


const registerController = async (req, res)=>{

    try{

        const data = req.body;

        const role = data.role;

        if(role == "doctor"){
            const result = await registerDoctorService(data);
            res.status(200).json(result)
        }
        else if(role == "patient"){
            const result = await registerPatientService(data);
            res.status(200).json(result)
        }
        else{
            res.status(400).json({message : "Invalid role specified"})
        }

    }
    catch(error){
        res.status(500).json({message: `Registeration Failed : ${error.message}`})
    }

}


export {registerController, loginController}