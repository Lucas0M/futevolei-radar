import { Request, Response, NextFunction } from "express";
import { eventoRepository } from "../repositories/eventoRepository";
import type { Prisma } from "../../generated/prisma/client";
import { AppError } from "../error/AppError";

export const findAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const eventos = await eventoRepository.findAllEvents();
    res.json(eventos);
  } catch (error) {
    next(error);
  }
};

export const findEventById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const evento = await eventoRepository.findEventById(String(req.params.id));
    if (!evento) throw new AppError("Event not found", 404);

    res.json(evento);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { torneio, dataInicio } = req.body;

  if (!torneio || !dataInicio) {
    throw new AppError("Tournment name and date must be exists!");
  }

  try {
    const evento = await eventoRepository.createEvent({ torneio, dataInicio });
    res.status(201).json(evento);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updated = await eventoRepository.updateEvent(
      String(req.params.id),
      req.body,
    );
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await eventoRepository.deleteEvent(String(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
