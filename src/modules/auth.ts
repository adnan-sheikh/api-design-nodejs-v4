import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import express from "express";
import * as bcrypt from "bcrypt";
import config from "../config";

export const createJwt = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.secrets.jwt
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
    res.send({ message: "Not authorized" });
    return;
  }

  try {
    const user = jwt.verify(token, config.secrets.jwt) as {
      id: string;
      username: string;
    };
    req.user = user;
    console.log(user);
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Invalid token");
  }
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
