import { Role, User } from "../models/index.js";
// parseNumber ( brinda inf como el pais )
import parseNumber, { isValidPhoneNumber } from "libphonenumber-js";

const esRolValido = async (rol) => {
  if( rol ){
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`El rol ${rol} no esta registrado`);
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


export { esRolValido, emailExiste, nameExiste, movilValido, existeUsuarioxID };
