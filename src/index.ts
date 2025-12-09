//Dependencies
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

//Routes
import authroutes from "./routes/auth.routes";
//import todoroutes from "./routes/todo.routes";

//Middleware to validate
import { handler } from "./middleware/handler";
import { validate } from "./middleware/validation";

const app = express();
const port = 3000;

//Global Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API routes
app.use('/auth', authroutes);
//app.use('/todo', todoroutes);

//Simple test
app.get('/test', (req, res) => {
    res.send({status: 'ok'});
});

//Error handling
app.use(handler);

//Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});