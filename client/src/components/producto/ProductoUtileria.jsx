import { Box, Grid, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { api } from "../../api/myApi";
import { Producto } from "./Producto";


export const ProductoUtileria = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const functiom = async () => {
      const { data } = await api.get("/product/utiles");
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
                  <Producto {...product}/>
                </Grid>
              )
            )
          )}
        </Grid>
      </Box>

      <Outlet />
    </>
  ); 
};
