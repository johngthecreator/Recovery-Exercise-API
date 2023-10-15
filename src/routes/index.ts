import express, { Express, Request, Response } from 'express';
import {exercises} from "./exerciseRoutes.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: 'json'};

const app: Express = express();
const port = 3000;

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({status:"Running", message:" Welcome to the Recovery Exercise API!"})
})
app.use("/exercises", exercises);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});