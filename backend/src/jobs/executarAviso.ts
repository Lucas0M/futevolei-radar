// src/jobs/executarAviso.ts
import "dotenv/config";
import { buscarTorneioProximoFimDeSemana } from "../services/avisoService";
import { sendEmail } from "../services/emailService";

async function main() {
  console.log("Verificando torneios do fim de semana...");
  const evento = await buscarTorneioProximoFimDeSemana();
  if (evento) {
    await sendEmail(evento);
    console.log(`Email enviado: ${evento.torneio}`);
  } else {
    console.log("Nenhum torneio agendado para este fim de semana.");
  }
  process.exit(0);
}

main();
