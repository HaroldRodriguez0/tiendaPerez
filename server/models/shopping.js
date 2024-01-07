import { Schema, model } from "mongoose";

const shoppingSchema = Schema({
  nameUser: {
    type: String ,
    unique: true
  },

  descuento: { type: Number },

  pedidos: {
    type: Array,
    of: {

      date: { type: Date },

      receptor: { type: String },

      movil: { type: String },

      direccion: { type: String },

      envio: { type: Number },

      descuento: { type: Boolean },

      estado: { type: String },

      products: {
        type: Array,
        of: {
    
          name: { type: String },
    
          precio: { type: Number, default: 0, min: 0 },

          categoria: { type: String },
    
          modelo: { type: String },
    
          numero: { type: String },
    
          color: { type: String },
     
          tipo: { type: String },

          cantidad: { type: Number, default: 1, min: 1 },
    
        },
      },

    },
  },
});

  
shoppingSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

const Shopping = model("Shopping", shoppingSchema);
export default Shopping;
