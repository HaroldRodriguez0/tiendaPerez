import { Schema, model } from "mongoose";

const InventarioSchema = Schema({

  date: {
    type: Date,
    required: true,
    undefined, 
  },

  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
  },

  products: {
    type: Array,
    of: {
      name: { type: String, required: [true ,  "el name es obligatorio"] },
      cantidad: { type: Number, required: [true ,  "la cantidad es obligatorio"], min: 0 },
      precio: { type: Number, required: [true, "el precio es obligatorio"], min: 0 },
      categoria: { type: String, required: [true ,  "La categoria es obligatoria"] },
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