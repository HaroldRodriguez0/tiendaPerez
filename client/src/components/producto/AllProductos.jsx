import { Box, Grid, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useProduts } from "../../hooks/useProduts";
import { Producto } from "./Producto";

export const AllProductos = () => {

  const products = useProduts();

  const {rol} = useSelector( state => state.auth );
  const vistaRol = (rol !== 'ADMIN_ROLE') && true;

/*   const productsQuery = useQuery();

  productsQuery.refetch */

  if (products.isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
      <LinearProgress color='success' />
    </Box>
    );
  }

  return (
    <>
      <Box flexGrow={1} my={5}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {products.data?.product.map(
            (product, i) => (
              (
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  key={i}
                >
                  <Producto {...product} vistaRol={vistaRol}/>
                </Grid>
              )
            )
          )}
        </Grid>
      </Box>

      <Box></Box>
    </>
  ); 
};
