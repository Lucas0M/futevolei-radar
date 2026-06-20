import express from "express";
import eventoRouter from "./routes/eventos";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import { sendEmail } from "./services/emailService";
import { buscarTorneioProximoFimDeSemana } from "./services/avisoService";

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/eventos", eventoRouter);

// app.ts
app.get("/aviso-fim-de-semana", async (req, res) => {
  const chave = req.query.chave;
  if (chave !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  const evento = await buscarTorneioProximoFimDeSemana();
  if (evento) await sendEmail(evento);
  res.json({ evento });
});

app.use(errorHandler);

export default app;
