
import {response} from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';


const validarJWT = async ( req, res = response, next ) => {

  // x-token headers
  const tokeno = req.header('x-token');

  if ( !tokeno ){
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    })
  }

  try {

    let arr = [...tokeno];
    arr.splice(45, 47);
    let token = arr.join("");

    const { uid } = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // leer el usuario que corresponde al uid
    const { _doc } = await User.findById( uid );
    const { password, __v, ...user  } = _doc;

    if( !user ){
      return res.status(401).json({
        msg: 'Token no valido '
      })
    }

    // Verificar si el uid tiene estado en true
    if( !user.estado ){
      return res.status(401).json({
        msg: 'Token no valido '
      })
    }

    req.user = user;

    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Token no valido '
    })
  }

}

export {
  validarJWT
}