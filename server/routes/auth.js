
/* 
host + /api/auth/...
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { contactEmail, forgotPassword, login, loginToken, register, verificationDelete, verificationEmail } from '../controller/auth.js';
import { emailExiste, esRolValido, movilValido, nameExiste } from '../middlewares/dbValidator.js';
import { validarCampo, validarJWT } from '../middlewares/index.js';

const router = Router();


router.post(
  '/login',
  [// middlewares
    check('password','La Contraseña debe de ser de 6 caracteres').isLength({ min:6 }),
    validarCampo
  ], 
   login );

router.post(  
  '/register',
  [// middlewares
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('name','El nombre es demasiado largo').isLength({max: 100}),
    check('name').custom( nameExiste ),
    check('email','El email es obligatorio').isEmail(),
    check('email').custom( emailExiste ),
    check('password','La Contraseña debe de ser de 6 caracteres').isLength({ min:6 }),
    check('movil','El movil es obligatorio').not().isEmpty(),
    check('movil').custom( movilValido ),
    check('rol').custom( esRolValido ),
    validarCampo,
  ],
  register );

  router.put(
    '/forgotPassword',
    [// middlewares
      check('name','El nombre es obligatorio').not().isEmpty(),
      check('email','El email es obligatorio').isEmail(),
      check('movil','El movil es obligatorio').not().isEmpty(),
      check('password','La Contraseña debe de ser de 6 caracteres').isLength({ min:6 }),
      validarCampo
    ],
  forgotPassword );
 // hacer el loginToken y quitar del reducer que guarde el token hay que ponerlo independiente en cada accion 
  router.post( '/loginToken', validarJWT, loginToken )

  router.get( '/verification/:token', (verificationEmail) );

  router.delete( '/verification/delete', (verificationDelete) );

  router.post( '/contact', contactEmail );

  export default router;


