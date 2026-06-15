import express from "express";
import eventoRouter from "./routes/eventos";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Futevolei Radar API rodando" });
});

app.use("/eventos", eventoRouter);

export default app;
