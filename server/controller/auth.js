import { response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User } from "../models/index.js";
import { generarJWT, transporter } from "../helpers/index.js";

const contactEmail = async (req, res = response) => {
  
  const { email, comentario } = req.body;
  try {
    await transporter
      .sendMail({
        to: 'tiendadenisperez@gmail.com',
        subject: "Mensaje",
        html: `<p>Usuario: ${email}</p>
        <p>Comentario: ${comentario}</p>`
      })

    res.status(200).json({
      msg: "Mensaje enviado con Exito",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

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

    // enviar mensaje     
    const url = `${process.env.SERVER_URL}/auth/verification/${token}`;
    const result = await transporter
      .sendMail({
        from: "Verificar Email <tiendadenisperez@gmail.com>",
        to: email,
        subject: "Verificar tu Email ...",
        html: `<p>Hola <span>&#x1F44B;</span> verifica tu email haciendo click en el siguiente Link </p>
       <a href= ${url}> Verificar tu Email </a>`,
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(201).json({
      msg: "Se ha enviado un mensaje de confirmación a su Email, por favor compruébelo para que Inicie Sesión",
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

    const { token: tokeno } = req.params;

    let arr = [...tokeno];
    arr.splice(45, 47);
    let token = arr.join("");

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    // leer el usuario que corresponde al uid
    const user = await User.findById(uid);
    if (user) {

      // Guardar en DB
      user.estado = true 
      await user.save(); 

      // modificar el token
      let arr = [...token]
      arr.splice(45, 0, "Tk96ZmRWQVNzZGZBMTJQT0RFUjNzZGZIQUtFQVJNRWFkMjY");
      token = arr.join(""); 

      const data = {
        uid: user.id,
        token,
      };
      // guardar la informacion en los params
      const query = new URLSearchParams (data).toString ();
      const url = `${process.env.CLIENT_URL}verification`;  //REVISAR
      const fullUrl = url + "?" + query;
      res.redirect (fullUrl);

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

  const { nameEmail, password } = req.body;
  let user;
  try {
    const regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/i; 
    const isValid = regex.test(nameEmail);
    if (isValid) {
      // Verificar si el email existe
      user = await User.findOne({ email:nameEmail });
      if (!user) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos",
        });
      }
    }else{
      // Verificar si el name existe
      user = await User.findOne({ name:nameEmail });
      if (!user) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos",
        });
      }
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

    if (user && user.email === email && user.movil === movil) {
      // Encriptar la contrsena
      const salt = bcryptjs.genSaltSync(11);
      const newPassword = bcryptjs.hashSync(password, salt);

      await User.updateOne({ name }, { password: newPassword });

      res.status(200).json({
        msg: "Contraseña cambiada con Exito",
      });
    } else {
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
};

const loginToken = async (req, res = response) => {
  try {
    req.user.uid = req.user._id;
    req.user._id = undefined

    res.status(200).json({
      user: req.user
    });
     
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
}

export {
  register,
  verificationEmail,
  verificationDelete,
  login,
  forgotPassword,
  loginToken,
  contactEmail
};
