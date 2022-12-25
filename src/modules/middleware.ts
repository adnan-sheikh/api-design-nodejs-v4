import express from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.send({ errors: errors.array() });
    return;
  }
  next();
};
