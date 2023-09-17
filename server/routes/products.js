
/* 
host + /api/product/...
*/

import multer from "multer";
import { Router } from 'express';
import { check } from 'express-validator';
import { newProduct } from "../controller/product.js";
import { categorialValida, modeloValido } from "../middlewares/dbValidator.js";
import { esAdminRole, validarCampo, validarJWT } from "../middlewares/index.js";


/* File Storage ( guardar archivos ) */
const storage = multer.diskStorage({
  destination: function( req, file, cb ){
    cb(null, 'public/assets' );
  },
  filename: function( req, file, cb ){
    cb( null, file.originalname );
  }
})
const upload = multer({ storage });

const router = Router();

/* Routes with Files */
router.post('/new',
[// middlewares
  validarJWT, 
  esAdminRole,
  check('name','El nombre es obligatorio').not().isEmpty(),
  check('name','El nombre es demasiado largo').isLength({max: 100}),
  check('name',).custom( modeloValido ),
  check('precio','El precio es obligatorio').isFloat({min: 0.01}) ,
  check('categoria','La categoria es obligatoria').not().isEmpty(),
  check('categoria').custom( categorialValida),
  check('cantAlmacen','La cantidad en Almacen es obligatoria').isFloat({min: 0.01}) ,
  check('cantTienda','La cantidad en Tienda es obligatoria').isFloat({min: 0.01}) ,
  check('img','La imagen es obligatoria').not().isEmpty(),
  validarCampo,
], upload.single('picture'), newProduct );


export default router;