import { response } from "express"
import { Product } from "../models/index.js";


const newProduct = async (req, res = response) => {

  try {

    const  { name, precio, categoria, cantAlmacen, cantTienda, img, modelo, numero, color, tipo, } = req.body;
    const product = new Product({ name, precio, categoria, cantAlmacen, cantTienda, img, modelo, numero, color, tipo, });

    // Guardar en DB
    await product.save();

    res.status(201).json({
      product
    })
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
}

export {
  newProduct,
}