import express from "express";

import prisma from "../db";
import { comparePasswords, createJwt, hashPassword } from "../modules/auth";

export const createNewUser = async (
  req: express.Request,
  res: express.Response
) => {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJwt(user);
  res.json({ token });
};

export const signInUser = async (
  req: express.Request,
  res: express.Response
) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValidPassword = await comparePasswords(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    res.status(401);
    res.send({
      message: "Invalid username or password",
    });
    return;
  }

  const token = createJwt(user);
  res.json({ token });
};
