import express from "express";
import prisma from "../db";

// Get All
export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: user.products });
};

// Get One
export const getOneProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const userId = req.user.id;
  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
  });
  res.json({ data: product });
};

export const createNewProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      userId: req.user.id,
    },
  });
  res.json({ data: product });
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
    data: {
      name: req.body?.name,
    },
  });
  res.json({ data: updatedProduct });
};

export const deleteProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  });
  res.json({ data: deletedProduct });
};
