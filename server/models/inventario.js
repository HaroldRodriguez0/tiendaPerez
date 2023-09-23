import { Schema, model } from "mongoose";

const InventarioSchema = Schema({

  fecha: {
    type: Date,
    required: true
  },

  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },

  productos: {
    type: Map,
    of: {
      name: { type: String, required: [true ,  "el name es obligatorio"] },
      cantidad: { type: Number, required: [true ,  "la cantidad es obligatorio"], min: 0 },
      precio: { type: Number, required: [true, "el precio es obligatorio"], min: 0 },
      modelo: { type: String },
      numero: { type: String },
      color: { type: String },
      tipo: { type: String },
    },
  },
});


InventarioSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

const Inventario = model( 'Inventario', InventarioSchema );
export default Inventario;