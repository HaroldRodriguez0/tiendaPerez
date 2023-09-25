
/* 
host + /api/inventario/...
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { editCopieInventario, editNewCopie, newCopieInventario } from '../controller/inventario.js';
import { categorialValida, nameNoExiste } from '../middlewares/dbValidator.js';
import { tieneRole, validarCampo, validarJWT } from '../middlewares/index.js';

const router = Router();

router.post(  
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
  newCopieInventario );

router.put(
  '/editNewCopie',
  [// middlewares
    validarJWT,
    tieneRole('ADMIN_ROLE','TOOLS_ROLE','CAFETERIA_ROLE'),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('name').custom( nameNoExiste ),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom( categorialValida ),
    check('cantidad','La cantidad es obligatoria').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    validarCampo
  ],
  editNewCopie );

router.put(
  '/editCopie',
  [// middlewares
    validarJWT,
    tieneRole('ADMIN_ROLE','TOOLS_ROLE','CAFETERIA_ROLE'),
    validarCampo
  ],
  editCopieInventario );

  // get que muestre el [] de productos
  // Si el Admin annade productos a la tienda tiene q sumar a la cantidadTienda de copieInventario


  export default router;