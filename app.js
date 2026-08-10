import express from 'express';
import { router as studentRoutes } from './routes/app.route.js';

const app = express();

app.use(express.json());
app.use("/students", studentRoutes);

app.listen(3000, () => {
    console.log('Server is running');
})
