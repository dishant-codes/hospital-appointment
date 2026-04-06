import { Router } from "express";
import { validateRegisterBody, valiedateLoginBody } from "../middleware/authMiddleware";
import { loginController, registerController } from "../controller/authController";


const authRouter = Router();

// POST /auth/register
authRouter.post('/register', validateRegisterBody, registerController);

// POST /auth/login
authRouter.post('/login', valiedateLoginBody, loginController)

// POST /auth/admin/login
authRouter.post('/admin/login')

export {authRouter}