import cron from "node-cron";
import { buscarTorneioProximoFimDeSemana } from "../services/avisoService";
import { sendEmail } from "../services/emailService";

cron.schedule("0 9 * * 5", async () => {
  console.log("Verificando torneios para o próximo fim de semana...");
  const evento = await buscarTorneioProximoFimDeSemana();
  if (evento) {
    await sendEmail(evento);
    console.log(`Email enviado para o torneio: ${evento.torneio}`);
  } else {
    console.log("Nenhum torneio encontrado para o próximo fim de semana.");
  }
});
