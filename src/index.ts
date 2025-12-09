//Dependencies
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

//Routes
import authroutes from "./routes/auth.schema";
import todoroutes from "./routes/todo.routes";

//Middleware to validate
import { handler } from "./middleware/handler";
import { validation } from "./middleware/validation";

const app = express();
const port = 3000;

//Global Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//API routes
app.use('/auth', authroutes);
app.use('/todo', todoroutes);

//Error handling
app.use(handler);
app.use(validation);

//Simple test
app.get('/', (req, res) => {
    res.send({status: 'ok'});
});

//Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});