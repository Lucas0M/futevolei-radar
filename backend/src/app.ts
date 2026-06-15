import express from "express";
import eventoRouter from "./routes/eventos";

const app = express();

app.use(express.json());

app.use("/eventos", eventoRouter);

export default app;
