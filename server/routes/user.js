/* 
host + /api/users/...
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { users, usersBanned, usersEdit, usersPorNameEmail, usersxId } from '../controller/users.js';
import { esRolValido, existeUsuarioxID, movilValido } from '../middlewares/dbValidator.js';
import { esAdminRole, validarCampo, validarJWT } from '../middlewares/index.js';

const router = Router();

// Todas tienen que pasar por la validacion del JWT
// router.use( validarJWT, esAdminRole );

router.get( '/',[ validarJWT, esAdminRole ], users );

router.get( '/:id',
[ // middlewares
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeUsuarioxID ), 
], usersxId );

router.get( '/banned',[ validarJWT, esAdminRole ], usersBanned );

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