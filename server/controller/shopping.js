import { response } from "express";
import { CopieInventario, Product, Shopping } from "../models/index.js";
import { editCopieInventario, editNewCopie } from "./inventario.js";

const newShopping = async (req, res = response) => {
  try {
    let shopping;
    const { nameUser, direccion, products } = req.body;

    const found = await Shopping.findOne({ nameUser });

    if (!found) {
      shopping = new Shopping({
        nameUser,
        pedidos: [{ date: new Date(), direccion, products }],
      });

      await shopping.save();
    } else {
      await Shopping.updateOne(
        { _id: found._id }, // Filtra el documento por el _id
        {
          $push: {
            pedidos: {
              // Agrega un nuevo elemento al array de pedidos
              date: new Date(),
              direccion: direccion,
              products: products,
            },
          },
        }
      );
    }

    for await (const prod of products) {
      req.body = {
        name: prod.name,
        precio: prod.precio,
        categoria: prod.categoria,
        cantidad: prod.cantidad,
        modelo: prod.modelo,
        numero: prod.numero,
        color: prod.color,
        tipo: prod.tipo,
      };
      // Hacer la modificacion en PRODUCT y CopieInventario.
      editNewCopie(req, res);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteShopping = async (req, res = response) => {
  try {
    const { id, products } = await CopieInventario.findOne();
    const { nameUser, date, products: productsVendidos } = req.body;
    req.body = [];

    const found = await Shopping.findOne({ nameUser });

    await Shopping.updateOne(
      { _id: found._id },
      { $pull: { pedidos: { date } } }
    );

    for await (const prod of productsVendidos) {
      const indexProd = products.findIndex(
        (elemento) =>
          elemento.name === prod.name &&
          elemento?.modelo === prod?.modelo &&
          elemento?.numero === prod?.numero &&
          elemento?.color === prod?.color &&
          elemento?.tipo === prod?.tipo
      );

      req.body = [
        ...req.body,
        {
          index: indexProd,
          name: prod.name,
          cantidad: products[indexProd].cantidad - prod.cantidad,
          modelo: prod.modelo,
          numero: prod.numero,
          color: prod.color,
          tipo: prod.tipo,
        },
      ];

      // Hacer la modificacion en PRODUCT y CopieInventario.
      editCopieInventario(req, res);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getShopping = async (req, res = response) => {
  try {
    if (req.user.rol === "ADMIN_ROLE") {
      //const allShopping = await Shopping.find();

      //res.status(200).json(allShopping);

      const iniFecha = new Date();
      const finFecha = new Date();

      const resul = [];

      const todayShopping = await Shopping.find({
        "pedidos.date": {
          $gte: iniFecha.setHours(0, 0, 0, 0),
          $lte: finFecha.setUTCHours(23, 59, 59, 999),
        },
      });

      todayShopping.map((user,i) => {

        user.pedidos.map((pedidos,i) => {

          pedidos.date.setHours(0, 0, 0, 0) === iniFecha.setHours(0, 0, 0, 0) 
            && resul.push(pedidos.products)
        })
      })

      res.status(200).json(resul);
    } else {
      res.status(200).json(todayShopping);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

export { newShopping, deleteShopping, getShopping };
