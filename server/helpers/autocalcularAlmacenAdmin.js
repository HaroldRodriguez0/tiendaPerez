

export const autocalcularAlmacenAdmin = ( data, lastProduct ) => {

  let dataValor , lastProValor, cont ;

  if( data.numero ){
    dataValor = data.numero;
    lastProValor = lastProduct.numero;
    cont = 1;
  }
  if( data.color ){
    cont = 2;
    dataValor = data.color;
    lastProValor = lastProduct.color;
  }
  if( data.tipo ){
    cont = 3;
    dataValor = data.tipo;
    lastProValor = lastProduct.tipo;
  }

  if( cont ){
    data.cantAlmacen = lastProduct.cantAlmacen;
    data.cantTienda = lastProduct.cantTienda;

    // si la cantidad en tienda (valor) a editar es mayor a la actual autocalcular cantidad en almacen
    for ( const key in dataValor ) {

      ( !dataValor[key].tienda ) && ( dataValor[key].tienda = lastProValor.get(key).tienda );
      ( !dataValor[key].almacen ) && ( dataValor[key].almacen = lastProValor.get(key).almacen );

      if( lastProValor.get(key) ) {

        if ( dataValor[key].tienda > lastProValor.get(key).tienda ) {

      // ↓↓↓↓↓ bien ( si los 2 aumentan o si aumenta tienda y almacen aum o dis )
        data.cantTienda += dataValor[key].tienda - lastProValor.get(key).tienda ;

        if( dataValor[key].almacen > lastProValor.get(key).almacen ) 

          data.cantAlmacen += dataValor[key].almacen - lastProValor.get(key).almacen ;

        else if( dataValor[key].almacen < lastProValor.get(key).almacen )
    
          data.cantAlmacen = Math.max( data.cantAlmacen - ( lastProValor.get(key).almacen - dataValor[key].almacen  ), 0) ;

        else data.cantAlmacen = Math.max( data.cantAlmacen - ( dataValor[key].tienda - lastProValor.get(key).tienda  ), 0),
             dataValor[key].almacen = Math.max( dataValor[key].almacen - ( dataValor[key].tienda - lastProValor.get(key).tienda  ), 0);

      } else{// ↓↓↓↓↓ bien ( si los 2 disminullen o si disminulle tienda y almacen aum o dis )
          data.cantTienda = Math.max( data.cantTienda - ( lastProValor.get(key).tienda - dataValor[key].tienda ), 0) ;

          ( lastProValor.get(key).almacen < dataValor[key].almacen )

          ?data.cantAlmacen += dataValor[key].almacen - lastProValor.get(key).almacen 
      
          :data.cantAlmacen -= lastProValor.get(key).almacen - dataValor[key].almacen ;
        }
      }
      else{
        data.cantTienda += dataValor[key].tienda;
        data.cantAlmacen += dataValor[key].almacen;
      }
    }
  }  
 
  switch (cont) {
    case 1:
      data.numero = dataValor;
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
      if ( data.cantTienda > lastProduct.cantTienda  && data.cantAlmacen ===  lastProduct.cantAlmacen ) {
        data.cantAlmacen = Math.max(data.cantAlmacen - ( data.cantTienda - lastProduct.cantTienda ), 0);
      }
      break;
  }

};
