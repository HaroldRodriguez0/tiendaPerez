import { Schema, model } from "mongoose";

const CopieInventarioSchema = new Schema({
  products: [{

    name: { type: String, required: [true ,  "el name es obligatorio"] },
    categoria: { type: String, required: [true ,  "La categoria es obligatoria"] },
    cantidad: { type: Number, required: [true ,  "la cantidad es obligatorio"], min: 0 },
    precio: { type: Number, required: [true, "el precio es obligatorio"], min: 0 },
    modelo: { type: String },
    numero: { type: String },
    color: { type: String },
    tipo: { type: String }
    
  }]
});

CopieInventarioSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

const CopieInventario = model( 'CopieInventario', CopieInventarioSchema );
export default CopieInventario;