import { Schema, model } from "mongoose";

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },

  precio: {
    type: Number,
    default: 0,
    min: 0
  },

  categoria: {
    type: String,
    required: true,
  },

  cantAlmacen: {
    type: Number,
    required: [true, "la cantidad en Almacen es obligatorio"],
    min: 0
  },

  cantTienda: {
    type: Number,
    required: [true, "la cantidad en Tienda es obligatorio"],
    min: 0
  },

  img: {
    type: String,
    required: [true, "la imagen es obligatoria"],
  },

  modelo: {
    type: String,
  },
  
  numero: {
    type: Map,
    of: {
      tienda: { type: Number, required: [true ,  "la cantidad en Tienda es obligatorio"], min: 0 },
      almacen: { type: Number, required: [true, "la cantidad en Almacen es obligatorio"], min: 0 },
    },
  },

  color: {
    type: Map,
    of: {
      tienda: { type: Number, required: [true ,  "la cantidad en Tienda es obligatorio"], min: 0 },
      almacen: { type: Number, required: [true, "la cantidad en Almacen es obligatorio"], min: 0 },
    },
  },

  tipo: {
    type: Map,
    of: {
      tienda: { type: Number, required: [true ,  "la cantidad en Tienda es obligatorio"], min: 0 },
      almacen: { type: Number, required: [true, "la cantidad en Almacen es obligatorio"], min: 0 },
    },
  },

});

ProductSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

const Product = model("Product", ProductSchema);
export default Product;
