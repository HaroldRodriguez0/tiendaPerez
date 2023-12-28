/* 
host + /api/shopping/...
*/

import { Router } from "express";
import { check } from "express-validator";
import {
  deleteShopping,
  getShopping,
  newShopping,
} from "../controller/shopping.js";
import { tieneRole, validarCampo, validarJWT } from "../middlewares/index.js";

const router = Router();

/* Routes with Files */ 
router.post(
  "/new",
  [ 
    // middlewares 
    validarJWT,
    check("nameUser", "El nombre es obligatorio").not().isEmpty(),
    check("date", "El nombre es obligatorio").not().isEmpty(),
    check("products", "El nombre es obligatorio").not().isEmpty(),
    validarCampo, 
  ],
  newShopping
);

router.put(
  "/delete",
  [
    // middlewares
    validarJWT,
    tieneRole("ADMIN_ROLE", "TOOLS_ROLE", "CAFETERIA_ROLE"),
    validarCampo, 
  ],
  deleteShopping
);

router.get(
  "/",
  [
    // middlewares
    validarJWT, // HACER ESTA VALIDACION DENTRO PARA SABER QUE ROL ES
    tieneRole("ADMIN_ROLE", "TOOLS_ROLE", "CAFETERIA_ROLE"),
    validarCampo, 
  ],
  getShopping
);

export default router;
