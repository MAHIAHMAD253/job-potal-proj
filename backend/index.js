
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db-connect.js';
import userRoute from './router/user.js';
import companyRoute from './router/company.js';
import jobRoute from './router/job.js'
import applicationRoute from './router/application.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOption = {
    origin: 'http://localhost:5174',
    credentials: true,
};
app.use(cors(corsOption));

// Routes
app.use('/api/user', userRoute);
app.use('/api/company',companyRoute);
app.use('/api/job',jobRoute);
app.use('/api/application',applicationRoute)

connectDB()
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((error) => {
        console.log(error);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
