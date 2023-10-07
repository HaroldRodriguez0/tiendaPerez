
import { Box, Grid } from "@mui/material";
import { Producto } from "./producto/Producto";


export const HomeScreen = () => {

  const productos = new Array(6).fill(null);
  const name = ['A'];

  return (

    <Box flexGrow={1} mt={5}>
      <Grid container spacing={{ xs: 1, sm: 2 }} >
        {productos.map((_, i ) => (
          <Grid sx={{ display:'flex', justifyContent: 'center', alignItems: 'center'}} item xs={6} sm={4} md={3} key={i}>
            <Producto i={i} /> 
          </Grid>
        ))}
      </Grid>
    
  </Box>
      


  );
};
