import { request, response } from "express";
import { CopieInventario, Product } from "../models/index.js";

const newCopieInventario = async (req, res = response) => {
  try {
    const { name, precio, categoria, cantidad, modelo, numero, color, tipo } =
      req.body;
    const copieInventario = new CopieInventario({
      products: [
        {
          name,
          categoria,
          cantidad,
          precio,
          modelo,
          numero,
          color,
          tipo,
        },
      ],
    });

    await copieInventario.save();

    res.status(200).json({
      msg: "Producto creado con !Exito",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

const editCopieInventario = async (req, res = response) => {
  try {
    let lastProValor, cont = null , valor;
    const { id } = await CopieInventario.findOne();

    // lo que se manda es un arreglo de los productos que se desea editar con estas propiedades y se va iterando 
    for (const { index, name, cantidad, modelo, numero, color, tipo, } of req.body) {

      // solo van a poder editar la cantidad y aqui defino la propiedad a editar
      const update = { $set: { [`products.${index}.cantidad`]: cantidad } };

      // se guarda el producto a editar con todas sus propiedades para hacer las respectivas modificaciones
      const lastProduct = modelo ?? false ? await Product.find({ name, modelo }) : await Product.find({ name });

      if (lastProduct) {

        if (lastProduct[0].numero) {
          lastProValor = lastProduct[0].numero;
          valor = numero;
          cont = 1;
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

          // tienda contiene la cantidad en tienda del producto 
          const { tienda } = lastProValor.get( valor );

          if ( tienda > cantidad) {

            await CopieInventario.updateOne( { _id: id } , update );
            ///// actualizar el producto ////////////////////////////////////////////////////////// llamar a edit

          } else {
            return res.status(400).json({
              msg: `No puedes vender mas de la cantidad existente en tiendaaa ${ tienda}`,
            });
          }
        }
        else if ( lastProduct[0].cantTienda > cantidad ) {
          
          await CopieInventario.updateOne( { _id: id } , update );
          ///// actualizar el producto /////////////////////////////////////////////////////////// llamar a edit

        } else {
          return res.status(400).json({
            msg: `No puedes vender mas de la cantidad existente en tiendaiii ${lastProduct[0].cantTienda}`,
          });
        }
      }else{
        return res.status(400).json({
        msg: "Producto que desea actualizar no existe",
      });
      }
    }

    res.status(200).json({
      msg: "Producto actualizado con !Exito",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Please talk to the administrator",
    });
  }
};

export { newCopieInventario, editCopieInventario };
