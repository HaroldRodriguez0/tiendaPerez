

export const autocalcularAlmacen = ( data ) => {
  let dataValor, cont, tienda=0, almacen=0 ;

  if (data.numero) {
    cont = 1;
    dataValor = data.numero;
  }
  if (data.color) {
    cont = 2;
    dataValor = data.color;
  }
  if (data.tipo) {
    cont = 3;
    dataValor = data.tipo;
  }

  if( cont ){
  
    for (let [key, value] of dataValor) {

      tienda += value.tienda ;
      almacen += value.almacen ;
      
    }

    data.cantAlmacen = almacen;
    data.cantTienda = tienda;

  }

};
