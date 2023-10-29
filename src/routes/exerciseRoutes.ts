import express, { Express } from 'express';
const app: Express = express();
import { getAllExercises, addOneExercise, updateOneExercise, deleteOneExercise, getExercisesByCategory, getExercisesById } from '../controllers/exerciseControllers.js';

export const exercises = express.Router();
exercises.get('/', getAllExercises );
exercises.get('/category/:category', getExercisesByCategory );
exercises.get('/id/:id', getExercisesById);
exercises.post('/', addOneExercise);
exercises.put('/:id', updateOneExercise);
exercises.delete('/:id', deleteOneExercise)

