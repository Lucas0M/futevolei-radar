import { Resend } from "resend";
import type { Evento } from "../types/evento";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (evento: Evento) => {
  await resend.emails.send({
    from: "Futevolei Radar <onboarding@resend.dev>",
    to: process.env.EMAIL_DESTINO!,
    subject: `🏐 Torneio neste fim de semana: ${evento.torneio}`,
    html: `
      <h2>${evento.torneio}</h2>
      <p>Acontece neste fim de semana${evento.cidade ? ` em ${evento.cidade}` : ""}.</p>
      <p>Data: ${evento.dataInicio.toLocaleDateString("pt-BR", { timeZone: "UTC" })}</p>
    `,
  });
};
