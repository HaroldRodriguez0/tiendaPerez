import { Schema, model } from "mongoose";

const CategoriaSchema = Schema({

  categoria: {
    type: String,
    require: [true, "La Categoria es obligatoria"],
  },
});

const Categoria = model("Categoria", CategoriaSchema);
export default Categoria;
