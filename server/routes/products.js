/* 
host + /api/product/...
*/

import { Router } from "express";
import { check } from "express-validator";
import multer from "multer";
import {
  deleteProduct,
  edit,
  editAdmin,
  getProduct,
  getProductCafeteria,
  getProductCalzado,
  getProductName,
  getProductUtiles,
  newProduct,
} from "../controller/product.js";
import { upload } from "../helpers/index.js";
import {
  categorialValida,
  existeProductoxID,
  modeloValido,
  validarProductorole,
} from "../middlewares/dbValidator.js";
import {
  esAdminRole,
  tieneRole,
  validarCampo,
  validarJWT,
} from "../middlewares/index.js";

const router = Router();

/* Routes with Files */
router.post(
  "/new",[ 
    validarJWT,
    esAdminRole, 
    upload.fields([{ name: 'picture', maxCount: 2 }]),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name", "El nombre es demasiado largo").isLength({ max: 100 }),
    check("name").custom(modeloValido),
    check("precio", "El precio es obligatorio").isFloat({ min: 0 }),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("categoria").custom(categorialValida),
    check("cantAlmacen", "La cantidad en Almacen es obligatoria").isFloat({
      min: 0,
    }),
    check("cantTienda", "La cantidad en Tienda es obligatoria").isFloat({
      min: 0,
    }), 
    validarCampo, 
  ],
  newProduct
);

router.put(
  "/editAdmin/:id",
  [
    // middlewares
    validarJWT,
    esAdminRole,
    upload.fields([{ name: 'picture', maxCount: 2 }]),
    check("id", "No es un id de Mongo ").isMongoId(),
    check("id").custom(existeProductoxID),
    check("categoria").custom(categorialValida),
    validarCampo,
  ],
  editAdmin
);

router.put(
  "/edit/:id",
  [
    // middlewares
    validarJWT,
    tieneRole("ADMIN_ROLE", "TOOLS_ROLE", "CAFETERIA_ROLE"),
    check("id", "No es un id de Mongo ").isMongoId(),
    validarProductorole(),
    validarCampo,
  ],
  edit
);

router.delete(
  "/delete/:id",
  [
    // middlewares
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo ").isMongoId(),
    check("id").custom(existeProductoxID),
    validarCampo,
  ],
  deleteProduct
);

router.get("/", getProduct);

router.get("/utiles", getProductUtiles);

router.get("/cafeteria", getProductCafeteria);

router.get("/calzado", getProductCalzado);

router.get("/:name", getProductName);

export default router;
