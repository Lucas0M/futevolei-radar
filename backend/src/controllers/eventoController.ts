import { Request, Response, NextFunction } from "express";
import { eventoRepository } from "../repositories/eventoRepository";
import type { Prisma } from "../../generated/prisma/client";
import { AppError } from "../error/AppError";
import type { EnumStatusEventoFilter } from "../../generated/prisma/commonInputTypes";

export const findAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const filters: { status?: EnumStatusEventoFilter; cidade?: string } = {};

    if (req.query.status)
      filters.status = req.query.status as EnumStatusEventoFilter;
    if (req.query.cidade) filters.cidade = req.query.cidade as string;

    const eventos = await eventoRepository.findAllEvents(
      page,
      limit,
      filters.status,
      filters.cidade,
    );
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
  try {
    const { torneio, dataInicio } = req.body;
    if (!torneio || !dataInicio) {
      throw new AppError("Tournament name and date must be included!");
    }

    const evento = await eventoRepository.createEvent(req.body);
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
