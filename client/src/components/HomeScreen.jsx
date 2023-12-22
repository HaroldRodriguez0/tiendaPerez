import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useProduts } from "../hooks/useProduts";
import Image from "./Image";
import { Productos } from "./producto/Productos";

export const HomeScreen = () => {
  const moreTitle = useMediaQuery("(max-width:830px)");
  const marked = useProduts("marked");

  console.log(marked.isSuccess && marked.data?.pages.flat());

  return (
    <>
      <Box>
        <Grid
          container
          sx={{
            background:
              "linear-gradient(270deg,#77c55b 5%, #387a17 50%, #77c55b 100%) 50%",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              fontWeight={400}
              color="white"
              textAlign="center"
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.2rem",
                  md: "2.4rem",
                  lg: "2.7rem",
                  xl: "3rem",
                },
                pl: { md: 5, lg: 10 },
                py: 1,
                mx: { xs: 1, xl: 16 },
              }}
            >
              {moreTitle
                ? "Bienvenido a la tienda"
                : "Bienvenido a la tienda donde encuentra todo lo que necesita"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              "&.MuiGrid-item": { p: 0 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ mx: { xl: 20, lg: 15, md: 8, sm: 4 } }}>
              <Image alt="icono" src="../../public/logoO.png" />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Container sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 3, md: 8 },
          }}
        >
          <Box
            sx={{
              mx: { xs: 7, sm: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box border={1} borderColor="greenyellow" mb={1}>
              <Image src="../../public/5991203.jpg" alt="Cafeteria" />
            </Box>
            <Button
              size={moreTitle ? "medium" : "large"}
              variant="outlined"
              color="success"
            >
              Cafeteria
            </Button>
          </Box>
          <Box
            sx={{
              mx: { xs: 7, sm: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box border={1} borderColor="greenyellow" mb={1}>
              <Image src="../../public/18327.jpg" alt="Utileria" />
            </Box>
            <Button
              size={moreTitle ? "medium" : "large"}
              variant="outlined"
              color="success"
            >
              Utileria
            </Button>
          </Box>
          <Box
            sx={{
              mx: { xs: 7, sm: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              border={1}
              borderColor="greenyellow"
              mb={1}
              sx={{ background: "white" }}
            >
              <Image src="../../public/163.png" alt="Calzado" />
            </Box>
            <Button
              size={moreTitle ? "medium" : "large"}
              variant="outlined"
              color="success"
            >
              Calzado
            </Button>
          </Box>
        </Box>

        <Box mt={3}>
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
              mt: 2,
              textAlign: "center",
              color: "green",
            }}
          >
            {" "}
            Más Vendidos
          </Typography>

          <Box mt={1}>
            <Productos products={marked} />
          </Box>
        </Box>
      </Container>

      <Box sx={{ mt: 3 }}>
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
            mt: 2,
            textAlign: "center",
            color: "green",
          }}
        >
          {" "}
          Sobre Nosotros
        </Typography>
        <Box className="bg" height="50vh">
          <Typography fontWeight='400' fontSize='1.1rem' color='black'>
            Hola cliente, somos DENIS & PÉREZ un emprendimiento cubano en el que
            tenemos el objetivo de satisfacer a la población de Matanzas en la
            compra de diversos productos desde cárnicos, confituras y bebidas
            hasta artículos de aseo ,útiles para el hogar y calzado. Brindamos
            ofertas tanto de venta al por mayor en variedad de productos o por
            individual. Destacamos por la buena atención y la calidad de nuestra
            mercancía. Asimismo para su comodidad ofrecemos servicio a domicilio
            además de nuestra sede en físico.
          </Typography>
        </Box>
      </Box>
    </>
  );
};
