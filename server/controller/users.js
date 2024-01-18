
import { response } from "express";
import { User } from "../models/index.js";

const user = async (req, res = response) => {
  try {
    const { uid } = req.query;

    const user = await User.findById( uid )
    
    res.status(200).json(
      user,
);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};


const users = async (req, res = response) => {
  try {

    const { limite = 20, page = 1, desde = (page - 1) * limite } = req.query;
    const query = { name: {$ne: "developer"}, estado: {$exists: true} }
  
    const [ total, users ] = await Promise.all([
      User.countDocuments( query ),
      User.find( query )
        .skip( Number( desde ))
        .limit(Number( limite ))
    ])
    
    res.status(200).json(
      users
    );

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
    const { limite = 20, page = 1, desde = (page - 1) * limite } = req.query;
    const regex = new RegExp( name_email, 'i' ); // busqueda insensible
    const query = { 
      $or: [{ name: regex }, { email: regex }], $and: [{ name : {$ne: "developer"}, estado: {$exists: true} }]
     }
  
     const [ total, users ] = await Promise.all([
       User.countDocuments( query ),
       User.find( query )
         .skip( Number( desde ))
         .limit(Number( limite ))
     ])
  
    res.status(200).json(
      users 
    )

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};



const usersEdit = async (req, res = response) => {
  try {

    const { movil, rol, estado } = req.body;
    const { id } = req.params;
    const user = await User.findById( id );

    if( movil ){
      await User.findByIdAndUpdate( id, {movil} );
      
      return res.status(200).json({
        msg: 'Movil actualizado con Exito'
      })
    }
    else if( rol && user.rol !== 'ADMIN_ROLE' ){
      await User.findByIdAndUpdate( id, {rol} );
      
      return res.status(200).json({
        msg: 'Rol actualizado con Exito'
      })
    }
    else if( estado !== null && user.rol !== 'ADMIN_ROLE' ){
      await User.findByIdAndUpdate( id, { estado });

      return res.status(200).json({
        msg: 'Estado actualizado con Exito'
      })

    }else{
      return res.status(400).json({
        msg: 'No tienes permisos'
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
  user,
  users,
  usersPorNameEmail,
  usersEdit,
}