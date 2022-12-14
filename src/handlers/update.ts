import express from "express";
import prisma from "../db";

// Get All
export const getAllUpdatesForAProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id_userId: {
          id: req.body.productId,
          userId: req.user.id,
        },
      },
      select: {
        updates: {
          include: {
            updatePoints: true,
          },
        },
      },
    });

    res.json({ data: product.updates });
  } catch (e) {
    next(e);
  }
};

// Get One
export const getOneUpdateForAProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
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
          include: {
            updatePoints: true,
          },
        },
      },
    });

    res.json({ data: product.updates[0] });
  } catch (e) {
    next(e);
  }
};

export const createNewUpdateForAProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
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
      res.status(404).json({ message: "Product doesn't exist" });
      return;
    }

    const update = await prisma.update.create({
      data: { ...req.body },
    });

    res.json({ data: update });
  } catch (e) {
    next(e);
  }
};

export const updateUpdateForAProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
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
      res.status(404).json({ message: "Product doesn't exist" });
      return;
    }

    const updatedUpdate = await prisma.update.update({
      where: {
        id,
      },
      data: { ...req.body },
    });

    res.json({ data: updatedUpdate });
  } catch (e) {
    next(e);
  }
};

export const deleteUpdateForAProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
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
      res.status(404).json({ message: "Product doesn't exist" });
      return;
    }

    const updatedUpdate = await prisma.update.delete({
      where: {
        id,
      },
    });

    res.json({ data: updatedUpdate });
  } catch (e) {
    next(e);
  }
};
