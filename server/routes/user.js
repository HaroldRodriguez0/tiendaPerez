/* 
host + /api/users/...
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { user, users, usersEdit, usersPorNameEmail } from '../controller/users.js';
import { esRolValido, existeUsuarioxID, movilValido } from '../middlewares/dbValidator.js';
import { esAdminRole, validarCampo, validarJWT } from '../middlewares/index.js';

const router = Router();

router.get( '/uid/:uid?' , user )

router.get( '/',[ validarJWT, esAdminRole ], users );

router.get( '/:name_email',[ validarJWT, esAdminRole ], usersPorNameEmail );

router.put( '/edit/:id',
[// middlewares
  validarJWT, 
  esAdminRole, 
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeUsuarioxID ),
  check('movil').custom( movilValido ),
  check('rol').custom( esRolValido ),
  validarCampo
], usersEdit )


export default router;