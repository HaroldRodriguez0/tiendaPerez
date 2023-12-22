/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material"
import { Producto } from "./Producto"
import { SkeletonProduct } from "./SkeletonProduct";



export const Productos = ({products}) => {

  const skeletons = [...Array(8)].fill('');

  return (
    <Box flexGrow={1} >
    <Grid container spacing={{ xs: 1, sm: 2 }}>
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
