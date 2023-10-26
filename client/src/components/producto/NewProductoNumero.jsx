import { Box, TextField } from "@mui/material"
import { useEffect } from "react";


// eslint-disable-next-line react/prop-types
export const NewProductoNumero = ({ i, seti, tipoModeloNumero = '', setModeloNumero, cantAlmacenNumero = '', setcantAlmacenNumero, cantTiendaNumero = '', setcantTiendaNumero }) => {

  
  let newtipoModeloNumero;

  const handleChangeTipo = (event) => {
    newtipoModeloNumero = [...tipoModeloNumero] 
    newtipoModeloNumero.splice(i, 1, event.target.value)
    setModeloNumero(newtipoModeloNumero);
  };

  const handleChangeAlmacen = (event) => {
    setcantAlmacenNumero(event.target.value);
  };

  const handleChangeTienda = (event) => {
    setcantTiendaNumero(event.target.value);
  };

  useEffect(() => {
    seti( i + 1 )
  }, [])
  
  console.log( tipoModeloNumero[i]+'__'+i)

  return (
    <Box
    sx={{ display: "flex" }}
  >
    <TextField
      type="number"
      name="valueNumero"
      variant="standard"
      label="Número"
      color="success"
      size="small"
      value={tipoModeloNumero[i]}
      onChange={handleChangeTipo}
   /* error={erroremail ?true :false}
    helperText={ erroremail }  */
      sx={{ pr: 1 }}
      InputLabelProps={{ style: { fontSize: ".9rem" } }}
    />
    <TextField
      type="number"
      name="cantAlmacenNumero"
      variant="standard"
      label="Almacen"
      color="success"
      size="small"
      value={cantAlmacenNumero}
      onChange={handleChangeAlmacen}
   /* error={erroremail ?true :false}
    helperText={ erroremail }  */
      sx={{ pr: 1 }}
      InputLabelProps={{ style: { fontSize: ".9rem" } }}
    />
    <TextField
      type="number"
      name="cantTiendaNumero"
      variant="standard"
      label="Tienda"
      color="success"
      size="small"
      value={cantTiendaNumero}
      onChange={handleChangeTienda}
   /* error={erroremail ?true :false}
    helperText={ erroremail }  */
      InputLabelProps={{ style: { fontSize: ".9rem" } }}
    />
  </Box>
  )
}
