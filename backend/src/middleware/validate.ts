import { ZodObject } from "zod";
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { AppError } from "../error/AppError";

export const validate = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const err = result as any;
      return next(new AppError(err.error.issues[0].message, 400));
    }

    req.body = result.data
    next();
  };
};
