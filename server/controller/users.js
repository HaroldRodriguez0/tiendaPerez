
import { response } from "express";
import { User } from "../models/index.js";



const users = async (req, res = response) => {
  try {

    const { limite = 15, desde = 0 } = req.query;
    const query = { estado: true, name: {$ne: "developer"} }
  
    const [ total, users ] = await Promise.all([
      User.countDocuments( query ),
      User.find( query )
        .skip( Number( desde ))
        .limit(Number( limite ))
    ])
    
    res.status(200).json({
      total, 
      users
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};



const usersBanned = async (req, res = response) => {
  try {

    const { limite = 15, desde = 0 } = req.query;
    const query = { estado: false, name: {$ne: "developer"} }
  
    const [ total, users ] = await Promise.all([
      User.countDocuments( query ),
      User.find( query )
        .skip( Number( desde ))
        .limit(Number( limite ))
    ])
    
    res.status(200).json({
      total, 
      users
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};



const usersPorNameEmail = async (req, res = response) => {
  try {
    
    const { name_email } = req.params;
    const { limite = 15, desde = 0 } = req.query;
    const regex = new RegExp( name_email, 'i' ); // busqueda insensible
    const query = { 
      $or: [{ name: regex }, { email: regex }], $and: [{ name : {$ne: "developer"} }]
     }
  
     const [ total, users ] = await Promise.all([
       User.countDocuments( query ),
       User.find( query )
         .skip( Number( desde ))
         .limit(Number( limite ))
     ])
  
    res.status(200).json({
      total,
      results: users 
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};



const usersEdit = async (req, res = response) => {
  try {

    const { movil, rol } = req.body;
    const { id } = req.params;

    if( movil ){
      await User.findByIdAndUpdate( id, {movil} );
      
      return res.status(200).json({
        msg: 'Movil actualizado con Exito'
      })
    }
    else if( rol ){
      await User.findByIdAndUpdate( id, {rol} );
      
      return res.status(200).json({
        msg: 'Rol actualizado con Exito'
      })
    }
    else{
      const user = await User.findById( id );
      if( user.rol === 'ADMIN_ROLE'){
        return res.status(400).json({
          msg: 'No tienes permisos'
        })
      }

      await User.findByIdAndUpdate( id, { estado: false });

      return res.status(200).json({
        msg: 'Usuario eliminado con Exito'
      })
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
}


export {
  users,
  usersBanned,
  usersPorNameEmail,
  usersEdit
}