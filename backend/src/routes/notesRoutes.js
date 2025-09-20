import express from 'express';
import { getAllNotes,createNote, updateNote, deleteNote, getNoteById } from '../controllers/notesController.js';

const notesRoutes = express.Router();

notesRoutes.get('/', getAllNotes);
notesRoutes.post('/', createNote);
notesRoutes.put('/:id', updateNote);
notesRoutes.delete('/:id', deleteNote);
notesRoutes.get('/:id', getNoteById);


export default notesRoutes;