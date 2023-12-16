import { CopieInventario } from "../models/index.js";

export const autocalcularAlmacenAdmin = async (data, lastProduct) => {
  const { id, products } = await CopieInventario.findOne();
  let dataValor,
    lastProValor,
    cont,
    tipoProd,
    cantidadTienda = 0,
    cantidadAlmacen = 0;

  if (data.numero) {
    dataValor = data.numero;
    lastProValor = lastProduct.numero;
    cont = 1;
    tipoProd = "numero";
  }
  if (data.color) {
    cont = 2;
    tipoProd = "color";
    dataValor = data.color;
    lastProValor = lastProduct.color;
  }
  if (data.tipo) {
    cont = 3;
    tipoProd = "tipo";
    dataValor = data.tipo;
    lastProValor = lastProduct.tipo;
  }

  if (cont) {
    dataValor.forEach(async function (valor, clave) {
      // Comprobar si el segundo objeto Map tiene la misma clave
      if (lastProValor.has(clave)) {
        // Obtener el valor asociado a la clave del lastProValor
        let last = lastProValor.get(clave);
        if (valor.tienda > last.tienda && valor.almacen === last.almacen) {
          // ↓↓↓↓↓ bien ( si los 2 aumentan o si aumenta tienda y almacen aum o dis )
          // Si el Admin añade productos a la tienda tiene q sumar a la cantidadTienda de CopieInventario
          const diferencia = valor.tienda - last.tienda;
          valor.almacen = Math.max(valor.almacen - diferencia, 0);
          dataValor.set(clave, valor);
          const productEncontrado = await products.find(
            (elemento) =>
              elemento.name === data.name &&
              elemento.modelo === data.modelo &&
              elemento[tipoProd] === clave &&
              elemento.precio === data.precio
          );
          if (productEncontrado &&
            (data.name !== lastProduct.name ||
            data.precio !== lastProduct.precio ||
            data.modelo !== lastProduct.modelo)
          ) {
            throw new Error(
              `En estos momentos no puede realizar estos cambios`
            );
          } else if (productEncontrado) {
            console.log(1);
            await CopieInventario.updateOne(
              { _id: id },
              { $inc: { "products.$[elem].cantidadTienda": diferencia } },
              {
                // Usa arrayFilters para especificar las condiciones del producto
                arrayFilters: [
                  {
                    "elem.precio": data.precio,
                    "elem.name": data.name,
                    "elem.modelo": data.modelo,
                    [`elem.${tipoProd}`]: clave,
                  },
                ],
              }
            );
          }/*  else {
            //console.log(2);
            await CopieInventario.updateOne(
              { _id: id },
              {
                $push: {
                  products: {
                    name: data.name,
                    categoria: data.categoria,
                    cantidad: diferencia,
                    precio: data.precio,
                    modelo: data.modelo,
                    [tipoProd]: clave,
                  },
                },
              }
            );
          } */
        }
      }
    });

    dataValor.forEach(async function (valor, clave) {
      console.log(valor.almacen + "  " + valor.tienda);
      cantidadTienda += valor.tienda;
      cantidadAlmacen += valor.almacen;
    });

    data.cantAlmacen = cantidadAlmacen;
    data.cantTienda = cantidadTienda;
  }

  switch (cont) {
    case 1:
      data.numero = dataValor;
      console.log(data);
      break;
    case 2:
      data.color = dataValor;
      break;
    case 3:
      data.tipo = dataValor;
      break;
    default:
      // solo editar la cantTienda-cantAlmacen si no viene ningun valor
      // si la cantidad en tienda a editar es mayor a la actual autocalcular cantidad en almacen

      if (
        data.cantTienda > lastProduct.cantTienda &&
        data.cantAlmacen === lastProduct.cantAlmacen
      ) {
        const diferencia = data.cantTienda - lastProduct.cantTienda;
        const productEncontrado = await products.find(
          (elemento) =>
            elemento.name === data.name && elemento.precio === data.precio
        );
        if ( productEncontrado &&
          (data.name !== lastProduct.name ||
          data.precio !== lastProduct.precio)
        ) {
          throw new Error(`En estos momentos no puede realizar estos cambios`);
        } else if (productEncontrado) {
          await CopieInventario.updateOne(
            { _id: id },
            { $inc: { "products.$[elem].cantidadTienda": diferencia } },
            {
              // Usa arrayFilters para especificar las condiciones del producto
              arrayFilters: [
                {
                  "elem.precio": data.precio,
                  "elem.name": data.name,
                },
              ],
            }
          );
        }/*  else {
          console.log(1);
          await CopieInventario.updateOne(
            { _id: id },
            {
              $push: {
                products: {
                  name: data.name,
                  categoria: data.categoria,
                  cantidad: diferencia,
                  precio: data.precio,
                },
              },
            }
          );
        } */
        data.cantAlmacen = Math.max(data.cantAlmacen - diferencia, 0);
      }
  }
};
