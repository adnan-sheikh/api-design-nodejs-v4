import { Product } from "@prisma/client";
import express from "express";
import prisma from "../db";

// Get All
export const getAllUpdatesForAProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: req.body.productId,
        userId: req.user.id,
      },
    },
    select: {
      updates: true,
    },
  });

  res.json({ data: product.updates });
};

// Get One
export const getOneUpdate = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const userId = req.user.id;
  const productId = req.body.productId;

  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: productId,
        userId,
      },
    },
    select: {
      updates: {
        where: {
          id,
        },
      },
    },
  });

  res.json({ data: product.updates });
};

export const createNewUpdate = async (
  req: express.Request,
  res: express.Response
) => {
  const productId = req.body.productId;
  const userId = req.user.id;

  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: productId,
        userId,
      },
    },
  });

  if (!product) {
    // product doesn't belong to the user
    res.json({ message: "Product doesn't exist" });
    return;
  }

  const update = await prisma.update.create({
    data: {
      productId,
      title: req.body.title,
      body: req.body.body,
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const userId = req.user.id;
  const productId = req.body.productId;

  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: productId,
        userId,
      },
    },
    select: {
      updates: {
        where: {
          id,
        },
      },
    },
  });

  if (!product || product.updates.length === 0) {
    // product doesn't belong to the user
    res.json({ message: "Product doesn't exist" });
    return;
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id,
    },
    data: { ...req.body },
  });

  res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const userId = req.user.id;
  const productId = req.body.productId;

  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: productId,
        userId,
      },
    },
    select: {
      updates: {
        where: {
          id,
        },
      },
    },
  });

  if (!product || product.updates.length === 0) {
    // product doesn't belong to the user
    // OR
    // update doesn't exist in the product available
    res.json({ message: "Product doesn't exist" });
    return;
  }

  const updatedUpdate = await prisma.update.delete({
    where: {
      id,
    },
  });

  res.json({ data: updatedUpdate });
};
