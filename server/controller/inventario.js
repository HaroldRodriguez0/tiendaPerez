import { request, response } from "express";
import { CopieInventario, Product } from "../models/index.js";
import { edit } from "./product.js";

const newCopieInventario = async (req, res = response) => {
  try {

    let lastProValor = null, cont = null, cantidadTienda = null, valor = null;
    const { name, precio, categoria, cantidad, modelo, numero, color, tipo } = req.body;
    // se guarda el producto a editar con todas sus propiedades para hacer las respectivas modificaciones
    const lastProduct = modelo ?? false ? await Product.find({ name, modelo }) : await Product.find({ name });
    
    if (lastProduct[0].numero) {
      cont = 1;
      valor = numero;
      lastProValor = lastProduct[0].numero;
    }
    if (lastProduct[0].color) {
      cont = 2;
      valor = color;
      lastProValor = lastProduct[0].color;
    }
    if (lastProduct[0].tipo) {
      cont = 3;
      valor = tipo;
      lastProValor = lastProduct[0].tipo;
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
      req.params.id = lastProduct[0]._id ;
      req.body.numero = Object.fromEntries(lastProValor) ;
      edit( req, res );
    }
    else{
      req.params.id = lastProduct[0]._id ;
      req.body.cantTienda = lastProduct[0].cantTienda - cantidad;
      edit( req, res );
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};


const editNewCopie = async (req, res = response) => {
  try {
    let lastProValor = null, cont = null, cantidadTienda = null, valor = null, tipoProd = null ;
    const { name, precio, categoria, cantidad, modelo, numero, color, tipo } = req.body;
    // se guarda el producto a editar con todas sus propiedades para hacer las respectivas modificaciones
    const lastProduct = modelo ?? false ? await Product.find({ name, modelo }) : await Product.find({ name });
    const { id, products } = await CopieInventario.findOne();
    
    if (lastProduct[0].numero) {
      tipoProd = 'numero',
      cont = 1;
      valor = numero;
      lastProValor = lastProduct[0].numero;
    }
    if (lastProduct[0].color) {
      tipoProd = 'color',
      cont = 2;
      valor = color;
      lastProValor = lastProduct[0].color;
    }
    if (lastProduct[0].tipo) {
      tipoProd = 'tipo',
      cont = 3;
      valor = tipo;
      lastProValor = lastProduct[0].tipo;
    }
    if (cont) {
      cantidadTienda = lastProValor.get( valor ).tienda;
    }
    else{
      cantidadTienda = lastProduct[0].cantTienda;
    }

    if( cantidadTienda < cantidad ){
      return res.status(400).json({
        msg: `No puedes vender mas de la cantidad existente en tienda ${ cantidadTienda }`,
      });
    }
    // Hacer la modificacion en CopieInventario
    if( cont ){
      const productEncontrado = products.find( elemento => elemento.name === name && elemento.modelo === modelo && elemento[ tipoProd ] === valor );
      
      if( productEncontrado ){

        await CopieInventario.updateOne(
          { _id: id },
          { $inc: { "products.$[elem].cantidad": cantidad } },
          { // Usa arrayFilters para especificar las condiciones del producto
            arrayFilters: [
              {
                "elem.name": name,
                "elem.modelo": modelo,
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
      req.params.id = lastProduct[0]._id ;
      req.body.numero = Object.fromEntries(lastProValor) ;
      edit( req, res );
    }
    else{
      const productEncontrado = products.find( elemento => elemento.name === name );

      if( productEncontrado ){
        await CopieInventario.updateOne(
          { _id: id },
          { $inc: { "products.$[elem].cantidad": cantidad } },
          { // Usa arrayFilters para especificar las condiciones del producto
            arrayFilters: [
              {
                "elem.name": name,
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
      req.params.id = lastProduct[0]._id ;
      req.body.cantTienda = lastProduct[0].cantTienda - cantidad;
      edit( req, res );
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
      const lastProduct = modelo ?? false ? await Product.find({ name, modelo }) : await Product.find({ name });

      if (lastProduct) {

        if (lastProduct[0].numero) {
          tipoProd = 'numero',
          valor = numero;
          cont = 1;
          lastProValor = lastProduct[0].numero;
        }
        if (lastProduct[0].color) {
          tipoProd = 'color',
          cont = 2;
          valor = color;
          lastProValor = lastProduct[0].color;
        }
        if (lastProduct[0].tipo) {
          tipoProd = 'tipo',
          cont = 3;
          valor = tipo;
          lastProValor = lastProduct[0].tipo;
        }
        if ( cantidadTienda >= cantidad) {

          if (cont) {
            // cantidad Productos en tienda = cantidad total de productos que existian en tienda desde que se vendio el 1er producto - cantidad de procutos vendidos
            cantidadProd = cantidadTienda - cantidad ;
            // cancant total de productos en Tienda = lastProduct[0].cantTienda - ( la cantidad que he vendido - la cantidad vendida en el inventario )
            cantTienda = lastProduct[0].cantTienda - ( cantidad - cantinventario ) ;
            const cambios = { $set: { [`${tipoProd}.${valor}.tienda`]: cantidadProd, cantTienda } };

            await CopieInventario.updateOne( { _id: id } , update );
            await Product.updateOne( { _id: lastProduct[0].id } , cambios );
          
          }

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

export { newCopieInventario, editCopieInventario, editNewCopie };
