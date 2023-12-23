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
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import { useNavigate } from "react-router-dom";

const iconLocation = new L.icon({
  iconUrl: icon,
  iconSize: [25, 25], // size of the icon
  iconAnchor: [10, 20], // point of the icon which will correspond to marker's locationS
  popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
});

export const HomeScreen = () => {
  const navigate = useNavigate();
  const moreTitle = useMediaQuery("(max-width:830px)");
  const marked = useProduts("marked");

  return (
    <>
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

      <Container sx={{ mt:{xs:3, lg:4}}}>

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
              onClick={() => navigate("/product/cafeteria")}
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
              onClick={() => navigate("/product/utiles")}
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
              onClick={() => navigate("/product/calzado")}
              size={moreTitle ? "medium" : "large"}
              variant="outlined"
              color="success"
            >
              Calzado
            </Button>
          </Box>
        </Box>

        <Box mt={{xs:3, lg:5}}>
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

        <Box sx={{ mt:{xs:4, lg:5}}}>
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
              mb: { sm: 2 },
              textAlign: "center",
              color: "green",
            }}
          >
            {" "}
            Sobre Nosotros
          </Typography>
          <Grid
            sx={{ background: "white" }}
            container
            spacing={{ sx: 1 }}
            justifyContent="center"
            alignItems="center"
            pb={{ xs: 2, md: 0 }}
          >
            <Grid item xs={10} sm={8} md={6}>
              <Image alt="icono" src="../../public/6511570.jpg" />
            </Grid>
            <Grid item md={6}>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  pl: { md: 4 },
                  py: 1,
                }}
                color="black"
              >
                Somos un emprendimiento cubano con el objetivo de satisfacer a
                la población de Matanzas en la compra de diversos productos
                desde cárnicos, confituras y bebidas hasta artículos de aseo
                ,útiles para el hogar y calzado. Brindamos ofertas tanto de
                venta al por mayor en variedad de productos o por individual.
                Destacamos por la buena atención y la calidad de nuestra
                mercancía. Asimismo para su comodidad ofrecemos servicio a
                domicilio además de nuestra sede en físico.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box mt={{xs:3, lg:5}}>
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
              mb: 1,
              textAlign: "center",
              color: "green",
            }}
          >
            {" "}
            Dónde estamos ?
          </Typography>
          <MapContainer
            className="map"
            center={[23.037005, -81.57348]}
            zoom={22}
            scrollWheelZoom={false}
          >
            {/* añadir el controlador de capas al mapa */}
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Origen">
                <TileLayer
                  attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satelite">
                <TileLayer
                  maxZoom={22}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                  url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            {/* añadir el marcador con el icono personalizado y el popup */}
            <Marker position={[23.037023, -81.573489]} icon={iconLocation}>
              <Popup>Tienda Denis & Pérez</Popup>
            </Marker>
          </MapContainer>
          <Typography mt={.5} textAlign='center' sx={{fontSize:{ md: '1.2rem'}}}>
            Calzada Esteban, entre Tirry y San Diego, Pueblo Nuevo Matanzas. Frente
            por frente a la parada de la terminal.
          </Typography>
        </Box>

      </Container>
    </>
  );
};
