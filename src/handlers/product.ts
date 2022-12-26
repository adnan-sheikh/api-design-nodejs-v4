import express from "express";
import prisma from "../db";

// Get All
export const getAllProducts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });
    res.json({ data: user.products });
  } catch (e) {
    next(e);
  }
};

// Get One
export const getOneProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
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
  } catch (e) {
    next(e);
  }
};

export const createNewProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    });
    res.json({ data: product });
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
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
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id_userId: {
          id: req.params.id,
          userId: req.user.id,
        },
      },
    });
    res.json({ data: deletedProduct });
  } catch (e) {
    next(e);
  }
};
