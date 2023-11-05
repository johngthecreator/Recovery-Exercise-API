import express, { Express } from 'express';
const app: Express = express();
import { getAllExercises, addOneExercise, updateOneExercise, deleteOneExercise, getExercisesByCategory, getExercisesById } from '../controllers/exerciseControllers.js';
import { ensureAuthenticated } from '../services/authenticationController.js';

export const exercises = express.Router();
exercises.get('/', ensureAuthenticated, getAllExercises );
exercises.post('/', ensureAuthenticated, addOneExercise);
exercises.get('/:id', ensureAuthenticated, getExercisesById);
exercises.put('/:id', ensureAuthenticated, updateOneExercise);
exercises.delete('/:id', ensureAuthenticated, deleteOneExercise)

exercises.get('/category/:category', ensureAuthenticated, getExercisesByCategory );

