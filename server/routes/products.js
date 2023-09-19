
/* 
host + /api/product/...
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { deleteProduct, editAdmin, editShop, getProduct, getProductName, newProduct } from "../controller/product.js";
import { upload } from '../helpers/index.js';
import { categorialValida, existeProductoxID, modeloValido } from "../middlewares/dbValidator.js";
import { esAdminRole, tieneRole, validarCampo, validarJWT } from "../middlewares/index.js";

const router = Router();

/* Routes with Files */
router.post('/new',
[// middlewares
  validarJWT, 
  esAdminRole,
  check('name','El nombre es obligatorio').not().isEmpty(),
  check('name','El nombre es demasiado largo').isLength({max: 100}),
  check('name',).custom( modeloValido ),
  check('precio','El precio es obligatorio').isFloat({min: 0}) ,
  check('categoria','La categoria es obligatoria').not().isEmpty(),
  check('categoria').custom( categorialValida),
  check('cantAlmacen','La cantidad en Almacen es obligatoria').isFloat({min: 0}) ,
  check('cantTienda','La cantidad en Tienda es obligatoria').isFloat({min: 0}) , 
  validarCampo, 
], upload.single('picture'), newProduct );

router.put('/editAdmin/:id',
[// middlewares
  validarJWT, 
  esAdminRole,
  check('id', 'No es un id de Mongo ').isMongoId(),
  check('id').custom( existeProductoxID ),
  check('name',).custom( modeloValido ),
  check('categoria').custom( categorialValida),
  validarCampo,
], upload.single('picture'), editAdmin );

router.put('/editShop/:id',
[// middlewares
  validarJWT, 
  tieneRole('ADMIN_ROLE','SHOP_ROLE'),
  check('id', 'No es un id de Mongo ').isMongoId(),
  check('id').custom( existeProductoxID ),
  validarCampo,
], editShop );

router.delete('/delete/:id',
[// middlewares
  validarJWT, 
  esAdminRole,
  check('id', 'No es un id de Mongo ').isMongoId(),
  check('id').custom( existeProductoxID ),
  validarCampo,
], deleteProduct );

router.get('/', getProduct );

router.get( '/:name', getProductName );


export default router;