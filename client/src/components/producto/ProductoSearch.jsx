import { Box, Grid, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { api } from "../../api/myApi";
import { Producto } from "./Producto";

export const ProductoSearch = () => {
  const { search } = useSelector((state) => state.product);
  const [products, setProducts] = useState();

  console.log(search)

  useEffect(() => {
    const functiom = async () => {
      const { data } = await api.get(`/product/${search}`);
      setProducts(data.product);
    };
    functiom();
  }, [setProducts, search]); 

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




  