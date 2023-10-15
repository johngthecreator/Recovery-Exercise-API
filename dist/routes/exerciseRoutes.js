import express from 'express';
const app = express();
import { getAllExercises, addOneExercise, updateOneExercise, deleteOneExercise } from '../controllers/exerciseControllers.js';
export const exercises = express.Router();
exercises.get('/', getAllExercises);
// exercises.get('/:category', getExercisesByCategory );
// exercises.get('/:id', getExercisesById);
exercises.post('/', addOneExercise);
exercises.put('/:id', updateOneExercise);
exercises.delete('/:id', deleteOneExercise);
//# sourceMappingURL=exerciseRoutes.js.map