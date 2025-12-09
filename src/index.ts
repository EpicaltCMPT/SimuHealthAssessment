//Dependencies

import cors from "cors";
import express from "express";
import helmet from "helmet";
//Middleware to validate
import { handler } from "./middleware/handler";
//Routes
import authroutes from "./routes/auth.routes";
import todoroutes from "./routes/todo.routes";

const app = express();
const port = 3000;

//Global Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API routes
app.use("/auth", authroutes);
app.use("/todo", todoroutes);

//Simple test
app.get("/test", (_req, res) => {
	res.send({ status: "ok" });
});

//Error handling
app.use(handler);

//Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
