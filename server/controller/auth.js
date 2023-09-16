import { response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User } from "../models/index.js";
import { generarJWT, transporter } from "../helpers/index.js";

const register = async (req, res = response) => {
  try {
    const { name, email, password, movil } = req.body;
    const user = new User({ name, email, password, movil });

    // Encriptar la contrsena
    const salt = bcryptjs.genSaltSync(11);
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await user.save();

    // Generar el JWT
    const token = await generarJWT(user._id);

    console.log(token);

    // enviar mensaje
    const url = `http://localhost:4000/api/auth/verification/${token}`;
    const result = await transporter
      .sendMail({
        from: "Verificar Email <haroldrodriguez176@gmail.com>",
        to: email,
        subject: "Verificar tu Email ...",
        html: `<p>Hola <span>&#x1F44B;</span> verifica tu email haciendo click en el siguiente Link </p>
       <a href= ${url}> Verificar tu Email </a>`,
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(201).json({
      msg: "Mensaje enviado con Exito!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
    });
  }
};



const verificationEmail = async (req, res = response) => {
  try {
    const { token } = req.params;

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    // leer el usuario que corresponde al uid
    const user = await User.findById(uid);
    user.estado = 1;

    // Guardar en DB
    await user.save();

    if (user) {
      res.status(200).json({
        user,
        token,
      });
    } else {
      res.status(400).json({
        msg: "Verificacion fallida",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};



const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
      });
    }

    // Verificar si el usuario esta activo
    if (!user.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
      });
    }

    // Verificar la contrasena
    const valiPassword = bcryptjs.compareSync(password, user.password);
    if (!valiPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    console.log(token)

    res.status(200).json({
      user,
      token,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};



const verificationDelete = async (req, res = response) => {
  // Eliminando usuarios no verificados
  try {
    await User.deleteMany({ estado: undefined });

    res.status(200).json({
      msg: "Usuarios Eliminados con Exito",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};



const forgotPassword = async (req, res = response) => {
  try {

    const { name, email, password, movil } = req.body;
    const user = await User.findOne({ name });

    if( user && user.email === email && user.movil === movil ){

      // Encriptar la contrsena
      const salt = bcryptjs.genSaltSync(11);
      const newPassword = bcryptjs.hashSync(password, salt);
      
      await User.updateOne( {name}, { password: newPassword} );

      res.status(200).json({
        msg: "Contraseña cambiada con Exito",
      });
    }
    else{
      res.status(400).json({
        msg: "Credenciales invalidas",
      });
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
}


export { register, verificationEmail, verificationDelete, login, forgotPassword };
