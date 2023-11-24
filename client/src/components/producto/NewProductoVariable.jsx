
import { Box, TextField } from "@mui/material"

// eslint-disable-next-line react/prop-types
export const NewProductoVariable = ({ i , tipoModelo, cambiarModeloVariable, cambiarAlmacenVariable, cambiarTiendaVariable, tipoModeloVariable = '',  cantAlmacenVariable = '', cantTiendaVariable = '' }) => {

  return (
    <Box
    sx={{ display: tipoModelo ?'flex' :'none' }}
  >
    <TextField
      required={!!(tipoModelo && true)}
      type={ tipoModelo === 'Numero' 
      ? 'number'
      : 'text' }
      variant="standard"
      label={ tipoModelo === 'Numero'
      ? 'Número'
      : tipoModelo === 'Color'
       ? 'Color'
       : 'Tipo' }
      color="success"
      size="small"
      value={tipoModeloVariable}
      onChange={(event) => cambiarModeloVariable ( event.target.value, i )}
      sx={{ pr: 1 }}
      InputLabelProps={{ style: { fontSize: ".9rem" } }}
    />
    <TextField
      required={!!(tipoModelo && true)}
      type="number"
      variant="standard"
      label="Almacen"
      color="success"
      size="small"
      value={cantAlmacenVariable}
      onChange={(event) => cambiarAlmacenVariable ( event.target.value, i )}
      sx={{ pr: 1 }}
      InputLabelProps={{ style: { fontSize: ".9rem" } }}
      onKeyPress={(event) => { 
        if (event.key === '-') { event.preventDefault(); } }} 
    />
    <TextField
      required={!!(tipoModelo && true)}
      type="number"
      variant="standard"
      label="Tienda"
      color="success"
      size="small"
      value={cantTiendaVariable}
      onChange={(event) => cambiarTiendaVariable ( event.target.value, i )}  
      InputLabelProps={{ style: { fontSize: ".9rem" } }}
      onKeyPress={(event) => { 
        if (event.key === '-') { event.preventDefault(); } }} 
    />
  </Box>
  )
}
