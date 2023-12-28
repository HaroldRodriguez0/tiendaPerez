import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useSelector } from "react-redux";
import { Shopp } from "./Shopp";


export const Shopping = () => {

  const { products } = useSelector((state) => state.shopping);

  return (
    <Container>
      <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.2rem",
                md: "2.4rem",
                lg: "2.7rem",
                xl: "3rem",
              },
              mt: 10,
              mb: { sm: 2 },
              textAlign: "center",
              color: "green",
            }}
          >
            Carrito de Compra
          </Typography>
          {
            products.map((prod,i) => (
              <Shopp key={i} product={prod}/>
            ))
          }
    </Container>
  )
}
