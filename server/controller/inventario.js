import { request, response } from "express";
import { CopieInventario, Inventario, Product } from "../models/index.js";
import { edit } from "./product.js";

/* const newCopieInventario = async (req, res = response) => {
  try {

    let lastProValor = null, cont = null, cantidadTienda = null, valor = null;
    const { name, precio, categoria, cantidad, modelo, numero, color, tipo } = req.body;
    // se guarda el producto a editar con todas sus propiedades para hacer las respectivas modificaciones
    const lastProduct = modelo ?? false ? await Product.find({ name, modelo }) : await Product.find({ name });
    
    if (lastProduct.numero) {
      cont = 1;
      valor = numero;
      lastProValor = lastProduct.numero;
    }
    if (lastProduct.color) {
      cont = 2;
      valor = color;
      lastProValor = lastProduct.color;
    }
    if (lastProduct.tipo) {
      cont = 3;
      valor = tipo;
      lastProValor = lastProduct.tipo;
    }
    if (cont) {
      cantidadTienda = lastProValor.get( valor ).tienda;
    }
    else{
      cantidadTienda = lastProValor.cantTienda;
    }

    if( cantidadTienda < cantidad ){
      return res.status(400).json({
        msg: `No puedes vender mas de la cantidad existente en tienda ${ cantidadTienda }`,
      });
    }

    const copieInventario = new CopieInventario({
      products: [
        {
          name,
          categoria,
          cantidad,
          cantidadTienda,
          precio,
          modelo,
          numero,
          color,
          tipo,
        },
      ],
    });

    await copieInventario.save();

    if( cont ){
      // pasarle al req.body.numero (para que funcione el edit) el lastProValor.get( valor ).tienda - cantidad pero este objeto es un map y hay q convertirlo a un objeto de objetos
      lastProValor.get( valor ).tienda -= cantidad;
      req.params.id = lastProduct._id ;
      req.body.numero = Object.fromEntries(lastProValor) ;
      edit( req, res );
    }
    else{
      req.params.id = lastProduct._id ;
      req.body.cantTienda = lastProduct.cantTienda - cantidad;
      edit( req, res );
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};
 */

const editNewCopie = async (req, res) => {
  try {
    let lastProValor = null, cont = null, cantidadTienda = null, valor = null, tipoProd = null ;
    const { name, precio, categoria, cantidad, modelo, numero, color, tipo } = req.body;
    // se guarda el producto a editar con todas sus propiedades para hacer las respectivas modificaciones
    const lastProduct = modelo ?? false ? await Product.findOne({ name, modelo }) : await Product.findOne({ name });
    const { id, products } = await CopieInventario.findOne();
    
    if (lastProduct.numero) {
      tipoProd = 'numero',
      cont = 1;
      valor = numero;
      lastProValor = lastProduct.numero;
    }
    if (lastProduct.color) {
      tipoProd = 'color',
      cont = 2;
      valor = color;
      lastProValor = lastProduct.color;
    }
    if (lastProduct.tipo) {
      tipoProd = 'tipo',
      cont = 3;
      valor = tipo;
      lastProValor = lastProduct.tipo;
    }
    if (cont) {
      cantidadTienda = lastProValor.get( valor ).tienda;
    }
    else{
      cantidadTienda = lastProduct.cantTienda;
    }

    if( cantidadTienda < cantidad ){
      return res.status(400).json({
        msg: `No puedes vender mas de la cantidad existente en tienda ${ cantidadTienda }`,
      });
    }
    // Hacer la modificacion en CopieInventario
    if( cont ){
      const productEncontrado = products.find( elemento => elemento.name === name && elemento.modelo === modelo && elemento[ tipoProd ] === valor && elemento.precio === precio);
      
      if( productEncontrado ){

        await CopieInventario.updateOne(
          { _id: id },
          { $inc: { "products.$[elem].cantidad": cantidad } },
          { // Usa arrayFilters para especificar las condiciones del producto
            arrayFilters: [
              {
                "elem.precio": precio,
                "elem.name": name,
                "elem.modelo": modelo,
                "elem.categoria": categoria,
                [`elem.${tipoProd}`]: valor
              }
            ]
          }
        )
      }
      else{
        await CopieInventario.updateOne(
          { _id: id },
          { $push: { products: {
            "name": name,
            "categoria": categoria,
            "cantidad": cantidad,
            "precio": precio,
            "cantidadTienda": cantidadTienda,
            "modelo": modelo,
            [tipoProd]: valor
          } } }
        )
      }
      // Hacer la modificacion en PRODUCT
      // pasarle al req.body.numero (para que funcione el edit) el lastProValor.get( valor ).tienda - cantidad pero este objeto es un map y hay q convertirlo a un objeto de objetos
      lastProValor.get( valor ).tienda -= cantidad;
      req.params.id = lastProduct._id ;
      numero && ( req.body.numero = Object.fromEntries(lastProValor) );
      color && ( req.body.color = Object.fromEntries(lastProValor) );
      tipo && ( req.body.tipo = Object.fromEntries(lastProValor) );
      await edit( req, res );
    }
    else{
      const productEncontrado = products.find( elemento => elemento.name === name && elemento.precio === parseInt(precio) );
      if( productEncontrado ){
        await CopieInventario.updateOne(
          { _id: id },
          { $inc: { "products.$[elem].cantidad": cantidad } },
          { // Usa arrayFilters para especificar las condiciones del producto
            arrayFilters: [
              {
                "elem.precio": precio,
                "elem.name": name,
                "elem.categoria": categoria,
              }
            ]
          }
        )
      }
      else{

        await CopieInventario.updateOne(
          { _id: id },
          { $push: { products: {
            "name": name,
            "categoria": categoria,
            "cantidad": cantidad,
            "precio": precio,
            "cantidadTienda": cantidadTienda,
          } } }
        )
      }
      // Hacer la modificacion en PRODUCT
      req.params.id = lastProduct._id ;
      req.body.cantTienda = lastProduct.cantTienda - cantidad;
      await edit( req, res );
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
}

const editCopieInventario = async (req, res = response) => {
  try {
    let lastProValor, cont = null , valor = null , data = null, tipoProd = null, cantidadProd = null, cantTienda = null;
    const { id, products } = await CopieInventario.findOne();

    // lo que se manda es un arreglo de los productos que se desea editar con estas propiedades y se va iterando 
    for (const { index, name, cantidad, modelo, numero, color, tipo, } of req.body) {

      const { cantidadTienda, cantidad:cantinventario } = products[ index ];

      // solo van a poder editar la cantidad y aqui defino la propiedad a editar
      const update = { $set: { [`products.${index}.cantidad`]: cantidad } };

      // se guarda el producto a editar con todas sus propiedades para hacer las respectivas modificaciones
      const lastProduct = modelo ?? false ? await Product.findOne({ name, modelo }) : await Product.findOne({ name });
      

      if (lastProduct) {

        if (lastProduct.numero) {
          tipoProd = 'numero',
          valor = numero;
          cont = 1;
          lastProValor = lastProduct.numero;
        }
        if (lastProduct.color) {
          tipoProd = 'color',
          cont = 2;
          valor = color;
          lastProValor = lastProduct.color;
        }
        if (lastProduct.tipo) {
          tipoProd = 'tipo',
          cont = 3;
          valor = tipo;
          lastProValor = lastProduct.tipo;
        }
        if ( cantidadTienda >= cantidad ) {

          cantTienda = lastProduct.cantTienda - ( cantidad - cantinventario ) ;

          if (cont) {
            // cantidad Productos en tienda = cantidad total de productos que existian en tienda desde que se vendio el 1er producto - cantidad de procutos vendidos
            cantidadProd = cantidadTienda - cantidad ;
            // cancant total de productos en Tienda = lastProduct.cantTienda - ( la cantidad que he vendido - la cantidad vendida en el inventario )
            const cambios = { $set: { [`${tipoProd}.${valor}.tienda`]: cantidadProd, cantTienda } };

            await Product.updateOne( { _id: lastProduct.id } , cambios );
          }
          else{
            await Product.updateOne( { _id: lastProduct.id } , { $set: { cantTienda } } );
          }

          await CopieInventario.updateOne( { _id: id } , update );

        } else {
          return res.status(400).json({
            msg: `No puedes vender mas de la cantidad existente en tienda ${ cantidadTienda }`,
          });
        }

      }else{
        return res.status(400).json({
        msg: "Producto que desea actualizar no existe",
      });
      }
    }
    return res.status(200).json({
      msg: "Producto actualizado con exito",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};


const getCopieInventario = async (req, res = response) => {
  try {
    const copieInventario = await CopieInventario.aggregate([
      {
        $project: {
          products: {
            $filter: {
              input: "$products",
              as: "product",
              cond: { $ne: ["$$product.cantidad", 0] }
            }
          }
        }
      }
    ])
    const {products} = copieInventario[0];

    res.status(200).json({
      products
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};


const newInventario = async (req, res = response) => {
  try {
    const { id } = await CopieInventario.findOne();
    const { products } = await CopieInventario.findOne();
    const date = new Date(); date.setHours(0, 0, 0, 0);
    
    const encontrarDate = await Inventario.find({ date: { $eq: date } })

    if( encontrarDate.length !== 0 ){
      return res.status(400).json({
        msg: "Ya existe un inventario con la misma fecha",
      });
    }

    const inventario = new Inventario({
      date ,
      usuario: req.user,
      products
    });

    await inventario.save();

    await CopieInventario.updateOne(
      { _id: id }, { $set: { products: [] } }
    ) 

    return res.status(200).json({
      inventario,
      msg: "Inventario creado",
    });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
}

const editInventario = async (req, res = response) => {
  try {

    const { id, index, cantidad, } = req.body;

    await Inventario.updateOne({products: {$elemMatch: { _id: id }}}, { $set: { 
      [`products.${index}.cantidad`]: cantidad, } })

    return res.status(200).json({
      msg: "Inventario actualizado con exito",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
}


const getInventario = async (req, res = response) => {
  try {

    let inventario;
    const { year, month, day } = req.query;

    if(day){
      const startDate = new Date(year, month, day, 0, 0, 0, 0)
      const endDate = new Date(year, month, day + 1, 0, 0, 0, 0);
      //inventario = await Inventario.find({ date: { $gt: startDate, $lt: endDate } });
      inventario = await Inventario.findOne({ date: new Date(year, month, day) });
    }
    else if(month){
      const startDate = new Date(year, month, 1, 0, 0, 0, 0);
      const endDate = new Date(year, month, 31);
      inventario = await Inventario.find({ date: { $gte: startDate, $lte: endDate } }); 
           
    }
    else if(year){
      const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
      const endDate = new Date(Date.UTC(year, 12, 31));
      inventario = await Inventario.find({ date: { $gte: startDate, $lte: endDate } });
    }

    return res.status(200).json(
      inventario
    );
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
}

export { /* newCopieInventario, */ editCopieInventario, editNewCopie, getCopieInventario, newInventario, editInventario, getInventario, };
