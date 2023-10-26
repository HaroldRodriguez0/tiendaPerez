/* 
import { NewProductoColor } from "./NewProductoColor";
import { NewProductoNumero } from "./NewProductoNumero";
import { NewProductoTipo } from "./NewProductoTipo";


export const agregarProductos = ({ i, seti, tipoModelo, tipoModeloNumero, setModeloNumero, cantAlmacenNumero, setcantAlmacenNumero, cantTiendaNumero, setcantTiendaNumero, tipoModeloColor, setModeloColor, cantAlmacenColor, setcantAlmacenColor, cantTiendaColor, setcantTiendaColor, tipoModeloTipo, setModeloTipo, cantAlmacenTipo, setcantAlmacenTipo, cantTiendaTipo, setcantTiendaTipo, setProductos,  productos, }) => {

  let nuevoProducto;

  tipoModelo === "Numero" ? (
    nuevoProducto = <NewProductoNumero i={i} tipoModeloNumero={tipoModeloNumero} setModeloNumero={setModeloNumero} cantAlmacenNumero={cantAlmacenNumero} setcantAlmacenNumero={setcantAlmacenNumero} cantTiendaNumero={cantTiendaNumero} setcantTiendaNumero={setcantTiendaNumero} />
  ) : tipoModelo === "Color" ? (
    nuevoProducto = <NewProductoColor tipoModeloColor={tipoModeloColor} setModeloColor={setModeloColor} cantAlmacenColor={cantAlmacenColor} setcantAlmacenColor={setcantAlmacenColor} cantTiendaColor={cantTiendaColor} setcantTiendaColor={setcantTiendaColor} />
  ) : tipoModelo === "Tipo" ? (
    nuevoProducto = <NewProductoTipo tipoModeloTipo={tipoModeloTipo} setModeloTipo={setModeloTipo} cantAlmacenTipo={cantAlmacenTipo} setcantAlmacenTipo={setcantAlmacenTipo} cantTiendaTipo={cantTiendaTipo} setcantTiendaTipo={setcantTiendaTipo}  />
  ) : (
    ""
  )

  setProductos([...productos, nuevoProducto]);

  seti( i + 1 );

}



 */