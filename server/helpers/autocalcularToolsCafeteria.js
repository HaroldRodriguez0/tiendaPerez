import { response } from "express";

export const autocalcularToolsCafeteria = (data, lastProduct, res = response) => {
  let dataValor, lastProValor, cont;

  if (data.numero) {
    dataValor = data.numero;
    lastProValor = lastProduct.numero;
    cont = 1;
  }
  if (data.color) {
    cont = 2;
    dataValor = data.color;
    lastProValor = lastProduct.color;
  }
  if (data.tipo) {
    cont = 3;
    dataValor = data.tipo;
    lastProValor = lastProduct.tipo;
  }

  if (cont) {
    data.cantTienda = lastProduct.cantTienda;

    for (const key in dataValor) {

      if (lastProValor.get(key)) {

        if (dataValor[key].tienda < lastProValor.get(key).tienda) {

          data.cantTienda = Math.max( data.cantTienda - ( lastProValor.get(key).tienda - dataValor[key].tienda ), 0) ;
        }
        else if( dataValor[key].tienda > lastProValor.get(key).tienda ){
          return res.status(400).json({
            msg: 'Valores Incorrectos'
          })
        }
        lastProValor.get(key).tienda = dataValor[key].tienda ;
      }
    }
  }

  switch (cont) {
    case 1:
      data.numero = lastProValor;
      break;
    case 2:
      data.color = lastProValor;
      break;
    case 3:
      data.tipo = lastProValor;
      break;
    default:
        // solo editar la cantTienda-cantAlmacen si no viene ningun valor
      if ( data.cantTienda > lastProduct.cantTienda ) {
        return res.status(400).json({
          msg: 'Valores Incorrectos'
        })
      }
      break;
  }
};
