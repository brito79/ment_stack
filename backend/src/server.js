import express from 'express';
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();



app.use(express.json());

app.use(rateLimiter);
app.use((req, res, next) => {
    console.log(`The method is ${req.method} and the url is ${req.url}`);
    next();
})
app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend','dist', 'index.html'));
    });
}



connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    })
})


