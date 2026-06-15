import { Request, Response } from "express";
import { eventoRepository } from "../repositories/eventoRepository";

export const findAllEvents = async (req: Request, res: Response) => {
  const eventos = await eventoRepository.findAllEvents();
  res.json(eventos);
};

export const createEvent = async (req: Request, res: Response) => {
  const { torneio, dataInicio } = req.body;

  if (!torneio || !dataInicio) {
    return res
      .status(400)
      .json({ error: "Torneio e data de início são obrigatórios" });
  }

  try {
    const evento = await eventoRepository.createEvent({ torneio, dataInicio });
    res.status(201).json(evento);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao criar evento", details: error });
  }
};

export default { findAllEvents, createEvent };
