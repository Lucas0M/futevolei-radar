import express from "express";
import eventoRouter from "./routes/eventos";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/eventos", eventoRouter);

app.use(errorHandler);

export default app;
