
import { Schema, model } from "mongoose";

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    movil: {
        type: String,
        required: [true, 'El movil es obligatorio'],
        unique: true
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
    },
    estado: {
        type: Boolean,  
    },
});





UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

const User = model( 'User', UserSchema );
export default User;