import {Router} from "express";
import { adminLoginController, loginController, regsiterController } from "../controller/authController.js";
import { validateAdminLoginBody, validateLoginBody, validateRegisterBody } from "../middleware/authMiddleware.js";

const authRouter = Router();

// POST /auth/register - Register a new user (patient or doctor)
authRouter.post("/register", validateRegisterBody, regsiterController);

// POST /auth/login - Login a user and return a JWT token
authRouter.post("/login", validateLoginBody, loginController );

// POST /auth/admin/login - Admin login with email and password
authRouter.post("/admin/login", validateAdminLoginBody, adminLoginController);

export default authRouter;