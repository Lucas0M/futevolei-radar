import express from "express";
import eventoRouter from "./routes/eventos";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/eventos", eventoRouter);

app.use(errorHandler);

export default app;
