import { response } from "express";
import { cloudinaryHelper } from "../helpers/cloudinaryHelper.js";
//import { cloudinary } from "../helpers/cloudinary.js";
import { autocalcularAlmacen, autocalcularAlmacenAdmin, autocalcularToolsCafeteria, imagemin_sharp } from "../helpers/index.js";
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
      fondo
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

    // ver si quiero elegir entre fondo o no ///////////////////////////////////////////////
    const pathFile = await cloudinaryHelper( req.file.path, '', fondo );

    if( !pathFile ){
      return res.status(400).json({
        msg: "Ocurrio un error al guardar la imagen. Vulva a intentarlo ",
      }); 
    }

    autocalcularAlmacen( product );

    // Guardar en DB
    product.img = pathFile;
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
    const { fondo , ...data } = req.body;
    const { id } = req.params;
    const lastProduct = await Product.findById(id);

    if (req.file) {

      const pathFile = await cloudinaryHelper( req.file.path, lastProduct.img, fondo );

      if( !pathFile ){
        return res.status(400).json({
          msg: "Ocurrio un error al guardar la imagen. Vulva a intentarlo ",
        }); 
      }

      data.img = pathFile;
      console.log(data.img)

    }

    await autocalcularAlmacenAdmin( data, lastProduct )
    .then( async ()=> {
      const product = await Product.findByIdAndUpdate(id, data, { new: true });

      return res.status(200).json({
        product,
        msg: "Producto actualizado con !Exito",
      });
    })
    .catch(error => {
      console.error(error);
      return res.status(400).json({
        msg: error.message
      });
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const edit = async (req, res = response) => {
  try {
    const { cantTienda, numero, color, tipo } = req.body;
    const data = { cantTienda, numero, color, tipo } ;
    const { id } = req.params;
    const lastProduct = await Product.findById(req.params.id);

    const autocalcular = autocalcularToolsCafeteria( data, lastProduct, res );

    if(!autocalcular ) {
      const product = await Product.findByIdAndUpdate(id, data, { new: true });

      return res.status(200).json({
        product,
        msg: "Producto actualizado con !Exito",
      });
    }

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
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
  edit,
  deleteProduct,
  getProduct,
  getProductName,
};
