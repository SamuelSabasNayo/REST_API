import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './config/config';
import allRoutes from './routes/blogRoutes';

const basePath = '/api';

// express app
const app = express();

dotenv.config();

// connect to mongoDB
mongoose.connect(config.dbURL);
mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log(`Error at mongo: ${err}`);
});

// add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// blog routes
app.use(basePath, allRoutes);

// app listening
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

export default app;
