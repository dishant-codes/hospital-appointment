const isNonEmptyString = (value)=>{
    return typeof value === "string" && value.trim() !== "";
}

const isValidPositiveNumber = (value)=>{
    return typeof value === "number" &&  value > 0
}

const isValidNonNegativeNumber = (value)=>{
    return typeof value === "number" &&  value >= 0
}


const valiedateLoginBody = (req, res, next)=>{

    const {email, password, role} = req.body;

    if(!isNonEmptyString(email) || !isNonEmptyString(password) || !isNonEmptyString(role)){

        return res.status(400).json({
            message: "Invalid request body",
            error: "email, password, and role are required"
        })

    }

    next();
}


const validateRegisterBody = (req, res, next)=>{

    const {
        name, 
        email, 
        age, 
        contactNumber, 
        password, 
        role, 
        address, 
        specialization, 
        exprerience} = req.body;

        if(!isNonEmptyString(role)){
            return res.status(400).json({
                message: "Invalid Request body",
                error: "role is requried"
            })
        }

        if(role !== "patient" && role !== "doctor"){
            return res.status(400).json({
                message: "Invalid Request body",
                error: "role must be either patient or doctor"
            })
        }


        if(
            !isNonEmptyString(name) ||
            !isNonEmptyString(email) ||
            !isValidPositiveNumber(age) ||
            !isNonEmptyString(contactNumber) ||
            !isNonEmptyString(password) || 
            !isNonEmptyString(address)
        ){
            return res.status(400).json({
                message: "Invalid request body",
                error: "name, email, age, contactNumber, password, and address are required"
            })
        }


        if(role === "patient"){
            return next();
        }

        if(!isNonEmptyString(specialization) || !isValidNonNegativeNumber(exprerience)){
            return res.status(400).json({
                message: "Invalid request body",
                error: "specialization and experience are required for doctor registration"
            })
        }


        next();

}


export {valiedateLoginBody, validateRegisterBody}
