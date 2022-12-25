import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import express from "express";

export const createJwt = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protectRoute = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send({ message: "Not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.send({ message: "Bearer token doesn't exist" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      username: string;
    };
    req.user = payload;
    console.log(payload);
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Invalid token");
  }
};
