import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import patientRouter from "./routes/patientRouter.js";
import dbConnect from "./utils/dbConnect.js";
import appointmentRouter from "./routes/appointmentRouter.js";

dotenv.config(); //loading environment variables from .env file

const app = express(); //creating an instance of express
const PORT = process.env.PORT || 3000; //defining the port number

dbConnect(process.env.MONGODB_URI); //connecting to the database

app.use(cors({ origin: "*" })); //enabling CORS for the frontend URL

app.use(express.json()); //middleware to parse JSON bodies


// Define a simple route to test the server
app.get("/", (req, res)=>{
    res.send("Welcome to the Doctor's Appointment API");
});

app.use("/api/auth", authRouter); //mounting the auth router
app.use("/api/doctors", doctorRouter); //mounting the doctor router
app.use("/api/patients", patientRouter); //mounting the patient router
app.use("/api/appointments", appointmentRouter); //mounting the appointment router

//invalid route handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



