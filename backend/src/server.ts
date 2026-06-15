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

app.post("/eventos", async (req, res) => {
  const { torneio, dataInicio, dataFim, local } = req.body;

  if (!torneio || !dataInicio) {
    return res
      .status(400)
      .json({ error: "Torneio e data de início são obrigatórios" });
  }

  try {
    const evento = await prisma.evento.create({
      data: { torneio, dataInicio, dataFim, local },
    });
    res.status(201).json(evento);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao criar evento", details: error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
