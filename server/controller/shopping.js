import { CopieInventario, Product, Shopping } from "../models/index.js";
import { editCopieInventario, editNewCopie } from "./inventario.js";

const newShopping = async (req, res) => {
  try {
    let shopping,
      descuento = 0, arrProdts = [];
    const { receptor, direccion, envio, movil, products } = req.body;
    const nameUser = req.user.name;

    const found = await Shopping.findOne({ nameUser });

    for (let i = 0; i < products.length; i++) {
      descuento += products[i].precio * products[i].cantidad;
      arrProdts.push({ ...products[i], precio: products[i].precio * 0.99})
    }

    if (!found) {
      shopping = new Shopping({
        nameUser,
        descuento,
        pedidos: [
          {
            date: new Date(),
            receptor,
            movil,
            direccion,
            envio,
            estado: "Procesando",
            products,
          },
        ],
      });

      await shopping.save();
    } else {
      await Shopping.updateOne(
        { _id: found._id }, // Filtra el documento por el _id
        {
          descuento: found.descuento < 10000 ? found.descuento + descuento : 0,
          $push: {
            pedidos: {
              // Agrega un nuevo elemento al array de pedidos
              date: new Date(),
              receptor,
              movil,
              direccion,
              envio,
              descuento: found.descuento > 10000 ? true : false,
              estado: "Procesando",
              products: found.descuento > 10000 ?arrProdts :products,
            },
          },
        }
      );
    }

    for await (const prod of products) {
      req.body = {
        name: prod.name,
        precio: found?.descuento > 10000 ? prod.precio * 0.99 : prod.precio,
        categoria: prod.categoria,
        cantidad: prod.cantidad,
        modelo: prod.modelo,
        numero: prod.numero,
        color: prod.color,
        tipo: prod.tipo,
      };
      // Hacer la modificacion en PRODUCT y CopieInventario.
      await editNewCopie(req, res);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const accionShopping = async (req, res = response) => {
  try {
    const { id, products } = await CopieInventario.findOne();
    const { nameUser, date, products: productsVendidos } = req.body;
    req.body = [];

    const found = await Shopping.findOne({ nameUser });

    await Shopping.updateOne(
      { _id: found._id },
      {
        $set: {
          "pedidos.$[pedido].estado": productsVendidos
            ? "Cancelado"
            : "Enviando",
        },
      },
      { arrayFilters: [{ "pedido.date": date }] }
    );

    if (!productsVendidos)
      res.status(200).json({
        msg: "Estado actualizado",
      });
    else
      await Shopping.updateOne(
        { _id: found._id },
        {
          $set: {
            "pedidos.$[pedido].products": productsVendidos,
          },
        },
        { arrayFilters: [{ "pedido.date": date }] }
      );
    for await (const prod of productsVendidos) {
      const indexProd = products.findIndex(
        (elemento) =>
          elemento.name === prod.name &&
          elemento.precio === prod.precio &&
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
    }

    // Hacer la modificacion en PRODUCT y CopieInventario.
  await editCopieInventario(req, res);
  } catch (error) {
    console.log(error.message);
  }
};

const editShopping = async (req, res = response) => {
  try {
    const { id, products } = await CopieInventario.findOne();
    const { nameUser, date, products: productsVendidos } = req.body;
    req.body = [];

    //const found = await Shopping.findOne({ nameUser });

    const found = await Shopping.findOneAndUpdate(
      { nameUser },
      { $set: { "pedidos.$[pedido].products": productsVendidos } },
      { arrayFilters: [{ "pedido.date": date }] }
    );
    const arr = found.pedidos.find(ped => new Date(ped.date).getTime() === new Date(date).getTime());

    for await (const prod of productsVendidos) {
      const indexProd = products.findIndex(
        (elemento) =>
          elemento.name === prod.name &&
          elemento.precio === prod.precio &&
          elemento?.modelo === prod?.modelo &&
          elemento?.numero === prod?.numero &&
          elemento?.color === prod?.color &&
          elemento?.tipo === prod?.tipo
      );
      const indexShop = arr.products.findIndex(
        (elemento) =>
          elemento.name === prod.name &&
          elemento.precio === prod.precio &&
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
          cantidad: products[indexProd].cantidad - (arr.products[indexShop].cantidad - prod.cantidad),
          modelo: prod.modelo,
          numero: prod.numero,
          color: prod.color,
          tipo: prod.tipo,
        },
      ];
    }
    // Hacer la modificacion en PRODUCT y CopieInventario.
    await editCopieInventario(req, res);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteShopping = async (req, res = response) => {
  try {
    await Shopping.updateMany(
      {},
      {
        $pull: {
          pedidos: { estado: "Cancelado" },
        },
      }
    );

    res.status(200).json({
      msg: "Pedidos eliminados con exito !",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const getShopping = async (req, res = response) => {
  try {
    const { nameUser, descuento, pedidos } = await Shopping.findOne({
      nameUser: req.user.name,
    });
    const datos = [];
    const iniFecha = new Date();

    pedidos.map((ped, i) => {
      const date = new Date(ped.date);
      date.setHours(0, 0, 0, 0) === iniFecha.setHours(0, 0, 0, 0) &&
        datos.push({
          nameUser,
          descuentoTotal: descuento,
          date: ped.date,
          receptor: ped.receptor,
          movil: ped.movil,
          direccion: ped.direccion,
          envio: ped.envio,
          descuento: ped.descuento,
          estado: ped.estado,
          products: ped.products,
        });
    });

    res
      .status(200)
      .json(datos.length > 0 ? datos : { msg: "No tiene Pedidos" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const getShoppingPedidos = async (req, res = response) => {
  try {
    if (req.user.rol === "ADMIN_ROLE") {
      const allShopping = await Shopping.find();

      res.status(200).json(allShopping);
    } else {
      const iniFecha = new Date();
      const finFecha = new Date();

      const datos = [];

      const todayShopping = await Shopping.find({
        "pedidos.date": {
          $gte: iniFecha.setHours(0, 0, 0, 0),
          $lte: finFecha.setUTCHours(23, 59, 59, 999),
        },
      });

      todayShopping.map((user, i) => {
        user.pedidos.map((pedidos, i) => {
          const date = new Date(pedidos.date);
          date.setHours(0, 0, 0, 0) === iniFecha.setHours(0, 0, 0, 0) &&
            datos.push({
              nameUser: user.nameUser,
              date: pedidos.date,
              receptor: pedidos.receptor,
              movil: pedidos.movil,
              direccion: pedidos.direccion,
              envio: pedidos.envio,
              descuento: pedidos.descuento,
              estado: pedidos.estado,
              products: pedidos.products,
            });
        });
      });

      res.status(200).json(datos);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

export {
  newShopping,
  accionShopping,
  editShopping,
  getShopping,
  getShoppingPedidos,
  deleteShopping,
};
