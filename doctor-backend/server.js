import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/authRouter';

dotenv.config();

const app = express();

const PORT = process.env.PORT;



app.use('/api/auth', authRouter);


app.listen(PORT, ()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
})