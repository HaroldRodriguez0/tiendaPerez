import { CopieInventario } from "../models/index.js";


export const autocalcularAlmacenAdmin = async ( data, lastProduct ) => {

  const { id, products } = await CopieInventario.findOne();
  let dataValor , lastProValor, cont, tipoProd ;

  if( data.numero ){
    dataValor = data.numero;
    lastProValor = lastProduct.numero;
    cont = 1;
    tipoProd = 'numero';
  }
  if( data.color ){
    cont = 2;
    tipoProd = 'color';
    dataValor = data.color;
    lastProValor = lastProduct.color;
  }
  if( data.tipo ){
    cont = 3;
    tipoProd = 'tipo';
    dataValor = data.tipo;
    lastProValor = lastProduct.tipo;
  }

  if( cont ){
    data.cantAlmacen = lastProduct.cantAlmacen;
    data.cantTienda = lastProduct.cantTienda;

    // si la cantidad en tienda (valor) a editar es mayor a la actual autocalcular cantidad en almacen
    for ( const key in dataValor ) {

      // se puede eliminar
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

      // Si el Admin añade productos a la tienda tiene q sumar a la cantidadTienda de CopieInventario
      const cambio = dataValor[key].tienda - lastProValor.get(key).tienda;
      const productEncontrado = await products.find( elemento => elemento.name === data.name && elemento.modelo === data.modelo && elemento[ tipoProd ] === key && elemento.precio === data.precio);

      if( productEncontrado ){
        await CopieInventario.updateOne(  
          { _id: id },
          { $inc: { "products.$[elem].cantidadTienda": cambio } },
          { // Usa arrayFilters para especificar las condiciones del producto
            arrayFilters: [
              {
                "elem.precio": data.precio,
                "elem.name": data.name,
                "elem.modelo": data.modelo,
                [`elem.${tipoProd}`]: key
              }
            ]
          }
        )
      }
      else if( data.name === lastProduct.name && data.modelo === lastProduct.modelo && data.modelo === lastProduct.modelo && dataValor[key].tienda === lastProValor.get(key).tienda){

        cantidadTienda = lastProValor.get( key ).tienda ;
        await CopieInventario.updateOne(
          { _id: id },
          { $push: { products: {
            "name": data.name,
            "categoria": data.categoria,
            "cantidad": data.cantidad,
            "precio": data.precio,
            "cantidadTienda": cantidadTienda,
            "modelo": data.modelo,
            [tipoProd]: key
          } } }
        )
      }else{
        throw new Error(`En estos momentos no puede realizar estos cambios`);
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
      const productEncontrado = products.find( elemento => elemento.name === data.name && elemento.precio === data.precio );

      if( productEncontrado ){
        await CopieInventario.updateOne(
          { _id: id },
          { $inc: { "products.$[elem].cantidad": cantidad } },
          { // Usa arrayFilters para especificar las condiciones del producto
            arrayFilters: [
              {
                "elem.precio": data.precio,
                "elem.name": data.name,
              }
            ]
          }
        )
      }
      else{
        cantidadTienda = lastProduct.cantTienda;
        await CopieInventario.updateOne(
          { _id: id },
          { $push: { products: {
            "name": data.name,
            "categoria": data.categoria,
            "cantidad": data.cantidad,
            "precio": data.precio,
            "cantidadTienda": cantidadTienda,
          } } }
        )
      }
      break;
  }
};
