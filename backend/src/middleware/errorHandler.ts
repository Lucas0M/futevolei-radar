import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";
import { Prisma } from "../../generated/prisma/client";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Register not found!" });
    }
  }

  console.log(err);
  return res.status(500).json({ error: "Internal error from server" });
};
