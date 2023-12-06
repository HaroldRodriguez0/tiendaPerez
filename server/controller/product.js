import { response } from "express";
import {
  cloudinaryDeleteImg,
  cloudinaryHelper,
} from "../helpers/cloudinaryHelper.js";
//import { cloudinary } from "../helpers/cloudinary.js";
import {
  autocalcularAlmacen,
  autocalcularAlmacenAdmin,
  autocalcularToolsCafeteria,
  imagemin_sharp,
} from "../helpers/index.js";
import { Product } from "../models/index.js";

const newProduct = async (req, res = response) => {
  let pathFileDesc = "";

  try {
    const {
      name,
      precio,
      categoria,
      cantAlmacen,
      cantTienda,
      modelo,
      numero: numeroReq,
      color: colorReq,
      tipo: tipoReq,
      fondoImgProduct,
      fondoImgDesc,
      desc,
    } = req.body;

    const numero = numeroReq && JSON.parse(numeroReq);
    const color = colorReq && JSON.parse(colorReq);
    const tipo = tipoReq && JSON.parse(tipoReq);

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
      desc,
    });

    const file = req.files.picture[0].path;
    const fileDesc = req.files.picture[1]?.path;

    const pathFile = await cloudinaryHelper(file, "", fondoImgProduct);
    fileDesc &&
      (pathFileDesc = await cloudinaryHelper(fileDesc, "", fondoImgDesc));

    if (!pathFile || (fileDesc && !pathFileDesc)) {
      return res.status(400).json({
        msg: "Ocurrio un error al guardar la imagen. Vulva a intentarlo ",
      });
    }

    autocalcularAlmacen(product);

    // Guardar en DB
    product.img = pathFile;
    product.imgDesc = pathFileDesc;
    await product.save();

    res.status(201).json({
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
    const {
      fondoImgProduct,
      fondoImgDesc,
      imgarr,
      numero: numeroReq,
      color: colorReq,
      tipo: tipoReq,
      ...data
    } = req.body;
    const numero = numeroReq && JSON.parse(numeroReq);
    const color = colorReq && JSON.parse(colorReq);
    const tipo = tipoReq && JSON.parse(tipoReq);
    const { id } = req.params;
    const { _doc } = await new Product({ numero, color, tipo, ...data });
    const { _id, ...product } = _doc;
    const lastProduct = await Product.findById(id);

    if (req.files.picture?.length === 2) {
      const file = req.files.picture[0].path;
      const fileDesc = req.files.picture[1]?.path;
      product.img = await cloudinaryHelper(
        file,
        lastProduct.img,
        fondoImgProduct
      );
      product.imgDesc = await cloudinaryHelper(
        fileDesc,
        lastProduct.imgDesc,
        fondoImgDesc
      );
    }

    if (req.files.picture?.length === 1) {
      if (imgarr === "imgDesc") {
        const fileDesc = req.files.picture[0]?.path;
        product.imgDesc = await cloudinaryHelper(
          fileDesc,
          lastProduct.imgDesc,
          fondoImgDesc
        );
      } else {
        const file = req.files.picture[0].path;
        product.img = await cloudinaryHelper(
          file,
          lastProduct.img,
          fondoImgProduct
        );
      }
    }

    await autocalcularAlmacenAdmin(product, lastProduct)
      .then(async () => {
        await Product.findByIdAndUpdate(id, product);

        return res.status(200).json({
          msg: "Producto actualizado con !Exito",
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(400).json({
          msg: error.message,
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
    const data = { cantTienda, numero, color, tipo };
    const { id } = req.params;
    const lastProduct = await Product.findById(id);

    const autocalcular = autocalcularToolsCafeteria(data, lastProduct, res);

    if (!autocalcular) {
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

    await Product.findByIdAndRemove(req.params.id)
      .then((deletedProduct) => {
        // Aquí puedes usar el producto eliminado
        cloudinaryDeleteImg(deletedProduct.img)
        deletedProduct.imgDesc && cloudinaryDeleteImg(deletedProduct.imgDesc)
    });

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
    const { limite = 12, page = 1, desde = (page - 1) * limite } = req.query;

    const [total, product] = await Promise.all([
      Product.countDocuments(),
      Product.find()
        .skip(Number(desde))
        .limit(Number(limite))
        .populate({ path: "tipo numero" }),
    ]);

/*     const nextCursor = () => {
      // Calcular el número de documentos obtenidos hasta el momento
      const docsObtenidos = desde + product.length;
      // Si el número de documentos obtenidos es menor que el total, devolver el cursor para la siguiente página
      if (docsObtenidos < total) {
        return (+page + 1);
      }
      // Si no, devolver null
      return null;
    }; */

    res.status(200).json( product );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const getProductUtiles = async (req, res = response) => {
  try {
    const { limite = 12, desde = 0 } = req.query;

    const [total, product] = await Promise.all([
      Product.countDocuments(),
      Product.find({ categoria: "UTILES" })
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.status(200).json(
      product
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const getProductCafeteria = async (req, res = response) => {
  try {
    const { limite = 12, desde = 0 } = req.query;

    const [total, product] = await Promise.all([
      Product.countDocuments(),
      Product.find({ categoria: "CAFETERIA" })
        .skip(Number(desde))
        .limit(Number(limite)),
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

const getProductCalzado = async (req, res = response) => {
  try {
    const { limite = 12, desde = 0 } = req.query;

    const [total, product] = await Promise.all([
      Product.countDocuments(),
      Product.find({ categoria: "CALZADO" })
        .skip(Number(desde))
        .limit(Number(limite)),
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
  getProductUtiles,
  getProductCafeteria,
  getProductCalzado,
};
