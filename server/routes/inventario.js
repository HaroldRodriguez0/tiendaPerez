/* 
host + /api/inventario/...
*/

import { Router } from "express";
import { check } from "express-validator";
import {
  editCopieInventario,
  editInventario,
  editNewCopie,
  getCopieInventario, getInventario, /* newCopieInventario */
  newInventario,
} from "../controller/inventario.js";
import { categorialValida, inventarioExiste, nameNoExiste } from "../middlewares/dbValidator.js";
import { tieneRole, validarCampo, validarJWT } from "../middlewares/index.js";

const router = Router();

// COPIE - INVENTARIO

/* router.post(  
  '/newCopie',
  [// middlewares
    validarJWT,
    tieneRole('ADMIN_ROLE','TOOLS_ROLE','CAFETERIA_ROLE'),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('name').custom( nameNoExiste ),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom( categorialValida ),
    check('cantidad','La cantidad es obligatoria').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    validarCampo,
  ],
  newCopieInventario ); */

router.put(
  "/editNewCopie",
  [
    // middlewares
    validarJWT,
    tieneRole("ADMIN_ROLE", "TOOLS_ROLE", "CAFETERIA_ROLE"),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name").custom(nameNoExiste),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("categoria").custom(categorialValida),
    check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    validarCampo,
  ],
  editNewCopie
);

router.put(
  "/editCopie",
  [
    // middlewares
    validarJWT,
    tieneRole("ADMIN_ROLE", "TOOLS_ROLE", "CAFETERIA_ROLE"),
    validarCampo,
  ],
  editCopieInventario
);

router.get("/", getCopieInventario);

// INVENTARIO

router.post(
  "/newInventario",
  [
    // middlewares
    validarJWT,
    tieneRole("ADMIN_ROLE", "TOOLS_ROLE", "CAFETERIA_ROLE"),
    validarCampo,
  ],
  newInventario
);

router.post( "/newInventario/aut", newInventario );

router.put(
  "/editInventario/:id",
  [
    // middlewares
    validarJWT,
    tieneRole( "ADMIN_ROLE" ),
    check('id', 'No es un id de Mongo ').isMongoId(),
    check('id').custom( inventarioExiste ),
    validarCampo,
  ],
  editInventario
);

router.get("/get", getInventario );

export default router;
