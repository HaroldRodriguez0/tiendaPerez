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

  costoProducto: {
    type: Number,
  },

  descuento: {
    type: Number,
  },

  categoria: {
    type: String,
    required: [true, "la categoria es obligatoria"],
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

  desc: {
    type: String,
  },

  imgDesc: {
    type: String,
  },

  img: {
    type: String,
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

  marked: {
    type: Boolean,
  },

});

ProductSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  data.tipo && (data.tipo = Object.fromEntries(data.tipo));
  data.numero && (data.numero = Object.fromEntries(data.numero));
  data.color && (data.color = Object.fromEntries(data.color));
  return data;
};

const Product = model("Product", ProductSchema);
export default Product;
