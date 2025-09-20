import express from 'express';
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();



app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));
app.use(rateLimiter);
app.use((req, res, next) => {
    console.log(`The method is ${req.method} and the url is ${req.url}`);
    next();
})
app.use('/api/notes', notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    })
})


