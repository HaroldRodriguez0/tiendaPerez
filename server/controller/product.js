import { response } from "express";
import { imagemin_sharp } from "../helpers/index.js";
import { Product } from "../models/index.js";

const newProduct = async (req, res = response) => {
  try {
    const {
      name,
      precio,
      categoria,
      cantAlmacen,
      cantTienda,
      modelo,
      numero,
      color,
      tipo,
    } = req.body;
    const product = new Product({
      name,
      precio,
      categoria,
      cantAlmacen,
      cantTienda,
      modelo,
      numero,
      color,
      tipo,
    });

    if (!req.file) {
      return res.status(400).json({
        msg: "La Imagen es obligatoria",
      });
    }
    const { path, destination, filename } = req.file;

    await imagemin_sharp(path, destination, filename, product.img).then(
      (result) => {
        product.img = result;
      }
    );

    // Guardar en DB
    product.img = filename;
    await product.save();

    res.status(201).json({
      product,
      msg: "Producto creado con !Exito",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const editAdmin = async (req, res = response) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const lastProduct = await Product.findById(id);

    if (req.file) {
      const { path, destination, filename } = req.file;

      await imagemin_sharp(path, destination, filename, lastProduct.img).then(
        (result) => {
          data.img = result;
        }
      );
    }

    // si la cantidad en tienda a editar es mayor a la actual autocalcular cantidad en almacen
    if (data.cantTienda && data.cantTienda > lastProduct.cantTienda) {
      data.cantAlmacen -= ( data.cantTienda - lastProduct.cantTienda );
    }
    
    data.cantAlmacen = lastProduct.cantAlmacen

    // si la cantidad en tienda () a editar es mayor a la actual autocalcular cantidad en almacen
    for (const key in data.numero) {
        if (lastProduct.numero.get(key).tienda  && data.numero[key].tienda > lastProduct.numero.get(key).tienda ) {

          data.numero[key].almacen -= ( data.numero[key].tienda - lastProduct.numero.get(key).tienda );
          data.cantAlmacen -= ( data.numero[key].tienda - lastProduct.numero.get(key).tienda );
        } 
    } 

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      product,
      msg: "Producto actualizado con !Exito",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const editShop = async (req, res = response) => {
  try {
    const { cantTienda } = req.body;
    const { id } = req.params;
    const lastProduct = await Product.findById(req.params.id);

    if (cantTienda > lastProduct.cantTienda) {
    }

    const product = await Product.findByIdAndUpdate(id, cantTienda, {
      new: true,
    });

    res.status(200).json({
      product,
      msg: "Producto actualizado con !Exito",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const deleteProduct = async (req, res = response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      msg: "Producto eliminado con !Exito",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const getProduct = async (req, res = response) => {
  try {
    const { limite = 8, desde = 0 } = req.query;

    const [total, product] = await Promise.all([
      Product.countDocuments(),
      Product.find().skip(Number(desde)).limit(Number(limite)),
    ]);

    res.status(200).json({
      total,
      product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const getProductName = async (req, res = response) => {
  try {
    const { name } = req.params;
    const { limite = 10, desde = 0 } = req.query;
    const regex = new RegExp(name, "i"); // busqueda insensible
    const query = {
      $or: [{ name: regex }],
    };

    const [total, product] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.status(200).json({
      total,
      product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

export {
  newProduct,
  editAdmin,
  editShop,
  deleteProduct,
  getProduct,
  getProductName,
};
