import { Router } from "express";
import { body } from "express-validator";
import {
  createNewProduct,
  deleteProduct,
  getOneProduct,
  getAllProducts,
  updateProduct,
} from "./handlers/product";
import {
  createNewUpdateForAProduct,
  deleteUpdateForAProduct,
  getAllUpdatesForAProduct,
  getOneUpdateForAProduct,
  updateUpdateForAProduct,
} from "./handlers/update";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */
router.get("/product", getAllProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createNewProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get(
  "/update",
  body("productId").isString(),
  handleInputErrors,
  getAllUpdatesForAProduct
);
router.get(
  "/update/:id",
  body("productId").isString(),
  handleInputErrors,
  getOneUpdateForAProduct
);
router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional().isString(),
  body("productId").isString(),
  handleInputErrors,
  updateUpdateForAProduct
);
router.post(
  "/update",
  body("title").isString(),
  body("body").isString(),
  body("productId").isString(),
  handleInputErrors,
  createNewUpdateForAProduct
);
router.delete(
  "/update/:id",
  body("productId").isString(),
  handleInputErrors,
  deleteUpdateForAProduct
);

/**
 * Update Point
 */
router.get("/update-point", () => {});
router.get("/update-point/:id", () => {});
router.put(
  "/update-point/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/update-point",
  body("name").isString(),
  body("description").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.delete("/update-point/:id", () => {});

export default router;
