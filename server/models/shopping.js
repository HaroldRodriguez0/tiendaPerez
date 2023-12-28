import { Schema, model } from "mongoose";

const shoppingSchema = Schema({
  nameUser: {
    type: String ,
    unique: true
  },

  pedidos: {
    type: Array,
    of: {

      date: { type: Date },

      direccion: { type: String },

      products: {
        type: Array,
        of: {
    
          receptor: { type: String },
    
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
