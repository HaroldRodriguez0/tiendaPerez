import { Box, TextField } from "@mui/material";

export const NewProductoColor = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        name="valueColor"
        variant="standard"
        label="Color"
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
        name="cantAlmacenColor"
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
        name="cantTiendaColor"
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
