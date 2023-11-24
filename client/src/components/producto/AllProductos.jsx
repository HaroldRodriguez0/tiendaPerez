import { Box, Grid, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/myApi";
import { Producto } from "./Producto";

export const AllProductos = () => {
  const [products, setProducts] = useState();
  const {rol} = useSelector( state => state.auth );
  const vistaRol = (rol !== 'ADMIN_ROLE') && true;

  useEffect(() => {
    const functiom = async () => {
      const { data } = await api.get("/product");
      setProducts(data.product);
    };
    functiom();
  }, [setProducts]);

  if (!products) {
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
          {products.map(
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
