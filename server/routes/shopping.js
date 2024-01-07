/* 
host + /api/shopping/...
*/

import { Router } from "express";
import {
  accionShopping,
  deleteShopping,
  editShopping,
  getShopping,
  getShoppingPedidos,
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
    validarCampo, 
  ],
  newShopping
);

router.put(
  "/accion",
  [
    // middlewares
    validarJWT,
    tieneRole("ADMIN_ROLE", "TOOLS_ROLE", "CAFETERIA_ROLE"),
    validarCampo, 
  ],
  accionShopping
);

router.put(
  "/edit",
  [
    // middlewares
    validarJWT,
    tieneRole("ADMIN_ROLE", "TOOLS_ROLE", "CAFETERIA_ROLE"),
    validarCampo, 
  ],
  editShopping
);

router.put(
  "/delete",
  deleteShopping
);

router.get(
  "/",
  [
    // middlewares
    validarJWT,
    validarCampo, 
  ],
  getShopping
);

router.get(
  "/pedidos",
  [
    // middlewares
    validarJWT, 
    tieneRole("ADMIN_ROLE", "TOOLS_ROLE", "CAFETERIA_ROLE"),
    validarCampo, 
  ],
  getShoppingPedidos
);

export default router;
