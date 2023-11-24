
import { response } from "express";
import { User } from "../models/index.js";


const users = async (req, res = response) => {
  try {

    const { limite = 15, desde = 0 } = req.query;
    const query = { name: {$ne: "developer"} }
  
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


const enabled = async (req, res = response) => {
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

const usersxId = async (req, res = response) => {
  try {

    const user = await User.findById( req.params.id )

    res.status(200).json({
      user
    })
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
}

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
    console.log(name_email)
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
  users,
  usersxId,
  usersBanned,
  usersPorNameEmail,
  usersEdit,
  enabled
}