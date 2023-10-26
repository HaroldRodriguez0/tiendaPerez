import { Box, TextField } from "@mui/material";

export const NewProductoTipo = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        name="valueTipo"
        variant="standard"
        label="Tipo"
        color="success"
        size="small"
        /* value={email}
                    onChange={handleregisterForm}
                    error={erroremail ?true :false}
                    helperText={ erroremail }  */
        sx={{ pr: 1 }}
        InputLabelProps={{ style: { fontSize: ".9rem" } }}
      />
      <TextField
        type="number"
        name="cantAlmacenTipo"
        variant="standard"
        label="Almacen"
        color="success"
        size="small"
        /* value={email}
                    onChange={handleregisterForm}
                    error={erroremail ?true :false}
                    helperText={ erroremail }  */
        sx={{ pr: 1 }}
        InputLabelProps={{ style: { fontSize: ".9rem" } }}
      />
      <TextField
        type="number"
        name="cantTiendaTipo"
        variant="standard"
        label="Tienda"
        color="success"
        size="small"
        /* value={email}
                    onChange={handleregisterForm}
                    error={erroremail ?true :false}
                    helperText={ erroremail }  */
        InputLabelProps={{ style: { fontSize: ".9rem" } }}
      />
    </Box>
  );
};
