import "dotenv/config";
import express from "express";
import prisma from "./prisma";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Futevolei Radar API rodando" });
});

app.get("/eventos", async (_req, res) => {
  const eventos = await prisma.evento.findMany({
    orderBy: { dataInicio: "asc" },
  });
  res.json(eventos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
