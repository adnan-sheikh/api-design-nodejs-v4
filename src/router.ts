import express from "express";
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

const router = express.Router();

/**
 * Product
 */
router.get("/product", getAllProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name")
    .isString()
    .withMessage("Should be a string!")
    .isLength({ max: 255 }),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name")
    .isString()
    .withMessage("Should be a string!")
    .isLength({ max: 255 })
    .withMessage("Maximum 255 characters supported!"),
  handleInputErrors,
  createNewProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get(
  "/update",
  body("productId").isString().withMessage("Should be a string!"),
  handleInputErrors,
  getAllUpdatesForAProduct
);
router.get(
  "/update/:id",
  body("productId").isString().withMessage("Should be a string!"),
  handleInputErrors,
  getOneUpdateForAProduct
);
router.put(
  "/update/:id",
  body("title").optional().isString().withMessage("Should be a string!"),
  body("body").optional().isString().withMessage("Should be a string!"),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional().isString().withMessage("Should be a string!"),
  body("productId").isString().withMessage("Should be a string!"),
  handleInputErrors,
  updateUpdateForAProduct
);
router.post(
  "/update",
  body("title").isString().withMessage("Should be a string!"),
  body("body").isString().withMessage("Should be a string!"),
  body("productId").isString().withMessage("Should be a string!"),
  handleInputErrors,
  createNewUpdateForAProduct
);
router.delete(
  "/update/:id",
  body("productId").isString().withMessage("Should be a string!"),
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
  body("name")
    .optional()
    .isString()
    .withMessage("Should be a string!")
    .isLength({ max: 255 })
    .withMessage("Maximum 255 characters supported!"),
  body("description").optional().isString().withMessage("Should be a string!"),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/update-point",
  body("name")
    .isString()
    .withMessage("Should be a string!")
    .isLength({ max: 255 })
    .withMessage("Maximum 255 characters supported!"),
  body("description").isString().withMessage("Should be a string!"),
  handleInputErrors,
  (req, res) => {}
);
router.delete("/update-point/:id", () => {});

router.use(
  (
    err: Error & { type: string },
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ error: "Something's wrong with the server" });
  }
);

export default router;
