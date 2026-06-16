import { Request, Response } from "express";
import { eventoRepository } from "../repositories/eventoRepository";
import type { Prisma } from "../../generated/prisma/client";

export const findAllEvents = async (req: Request, res: Response) => {
  try {
    const eventos = await eventoRepository.findAllEvents();
    res.json(eventos);
  } catch (error) {
    return res.status(500).json({ error: "Internal error", details: error });
  }
};

export const findEventById = async (req: Request, res: Response) => {
  const id: string = String(req.params.id);

  try {
    const evento = await eventoRepository.findEventById(id);
    if (!evento) return res.status(404).json({ error: "Event not found!" });
    res.json(evento);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Cannot find the event", details: error });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const { torneio, dataInicio } = req.body;

  if (!torneio || !dataInicio) {
    return res
      .status(400)
      .json({ error: "Tournment name and date must be exists!" });
  }

  try {
    const evento = await eventoRepository.createEvent({ torneio, dataInicio });
    res.status(201).json(evento);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error to create event!", details: error });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const id: string = String(req.params.id);
  const data: Prisma.EventoUpdateInput = req.body;

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

  try {
    await eventoRepository.deleteEvent(id);
    res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error trying delete a event!", details: error });
  }
};
