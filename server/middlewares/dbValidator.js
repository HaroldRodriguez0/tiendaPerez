import { Categoria, Product, Role, User } from "../models/index.js";
// parseNumber ( brinda inf como el pais )
import parseNumber, { isValidPhoneNumber } from "libphonenumber-js";

const esRolValido = async (rol) => {
  if (rol) {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`El rol ${rol} no esta registrado`);
    }
  }
};

const categorialValida = async (categoria) => {
  if (categoria || categoria === '') {
    const existeRol = await Categoria.findOne({ categoria });
    if (!existeRol) {
      throw new Error(`La categoria ${categoria} no esta registrada`);
    }
  }
};

const emailExiste = async (email = "") => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email ${email} ya esta registrado`);
  }
};

const nameExiste = async (name = "") => {
  const existeEmail = await User.findOne({ name });
  if (existeEmail) {
    throw new Error(`El name ${name} ya esta registrado`);
  }
};

const movilValido = async (movil) => {
  if (movil) {
    const existeEmail = await User.findOne({ movil });
    if (existeEmail) {
      throw new Error(`El movil ${movil} ya esta registrado`);
    }

    const number = isValidPhoneNumber(movil, { extended: true });
    if (!number) {
      throw new Error(`El movil ${movil} no valido`);
    }
  }
};

const existeUsuarioxID = async (id) => {
  const existeUsuario = await User.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ID ${id} no existe `);
  }
};

const existeProductoxID = async ( id ) => {
  const existeProducto = await Product.findById( id );
  if ( !existeProducto ) {
    throw new Error(`El ID ${id} no existe `);
  }
};

const modeloValido = async (name,data) => {
  const { modelo } = data.req.body;
   if (!modelo) {
    const nameDuplicado = await Product.findOne({ name });
    if (nameDuplicado) {
      throw new Error(
        `El modelo es obligatorio si existe otro producto con el mismo nombre`
      );
    }
  } else {
    const modeloDuplicado = await Product.findOne({ modelo });
    if (modeloDuplicado) {
      throw new Error(
        `El modelo ya existe`
      );
    }
  } 
};

export {
  esRolValido,
  emailExiste,
  nameExiste,
  movilValido,
  existeUsuarioxID,
  categorialValida,
  modeloValido,
  existeProductoxID,
};
