import { Request, Response } from "express";
import { eventoRepository } from "../repositories/eventoRepository";
import type { Prisma } from "../../generated/prisma/client";

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

export const updateEvent = async (req: Request, res: Response) => {
  const id: string = String(req.params.id);
  const data: Prisma.EventoUpdateInput = req.body;

  if (!data) {
    return res.status(400).json({ error: "Not enough data to update!" });
  }

  try {
    const updated = await eventoRepository.updateEvent(id, data);
    res.json(updated);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error trying update event!", details: error });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const id: string = String(req.params.id);

  await eventoRepository.deleteEvent(id);

  res.status(202).send();
};

export default { findAllEvents, createEvent, updateEvent, deleteEvent };
