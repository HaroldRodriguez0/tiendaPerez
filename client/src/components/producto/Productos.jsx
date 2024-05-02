/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material"
import { Producto } from "./Producto"
import { SkeletonProduct } from "./SkeletonProduct";

export default function Productos ({products}) {

  const skeletons = [...Array(8)].fill('');

  return (
    <Box flexGrow={1} >
    <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}>
      {products.data?.pages.flat().map(
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
      {products.isFetching &&
          
          skeletons.map((skeleton, i) => (
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
          <SkeletonProduct  />
        </Grid>
      ))} 
    </Grid>
  </Box>
  )
}
