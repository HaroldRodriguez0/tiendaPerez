import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Box, Container } from "@mui/system";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Shopp } from "./Shopp";
import { useShopping } from "../../hooks/useShopping";
import { AccordionPedido } from "./AccordionPedido";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export const Shopping = () => {
  const shop = useShopping();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.shopping);
  const [name, setName] = useState(user.name);
  const [movil, setMovil] = useState(user.movil);
  const [direccion, setDireccion] = useState("");
  const [loading, setLoading] = useState(false);
  const [lugar, setLugar] = useState(null);
  const [opcion, setOpcion] = useState(null);
  const [show, setShow] = useState(true);
  const [showdesc, setShowdesc] = useState(true);

  const progressRef = useRef(() => {});

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  let subTotal = 0;
  products &&
    products.map((prod) => {
      subTotal += prod.precio * prod.cant;
    });

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleMovil = (event) => {
    setMovil(event.target.value);
  };

  const handleDireccion = (event) => {
    setDireccion(event.target.value);
  };

  const handleSubmiteee = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user.name) {
      Swal.fire({
        text: "Debes Iniciar Sesión.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#26a430",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login !",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      console.log(name, movil);
      console.log(opcion);
      console.log(products);
    }

    setLoading(false);
  };

  // Las opciones de la primera lista
  const lugares = [
    { nombre: "Naranjal", dir: ["Naranjal Norte", "Armando Mestre"] },
    { nombre: "B", dir: ["Playa", "Ciudad"] },
    { nombre: "C", dir: ["Monte", "Bosque"] },
  ];

  useEffect(() => {
    setName(user.name);
    setMovil(user.movil);
  }, [user.name]);

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
          pt: 2,
          mb: { sm: 2 },
          textAlign: "center",
          color: "green",
        }}
      >
        Carrito de Compra
      </Typography>
      <Box onClick={() => setShowdesc(!showdesc)} sx={{ width: "100%", mt: 2 }}>
        <LinearProgressWithLabel
          variant="buffer"
          color="success"
          value={
            ( shop.isSuccess && shop.data[0] )
              ? shop.data[0].descuentoTotal / 100 > 100
                ? 100
                : shop.data[0].descuentoTotal / 100
              : 0
          }
          valueBuffer={0}
        />
      </Box>
      <Typography
        display={
          ( shop.isSuccess && shop.data[0] )
            ? shop.data[0].descuentoTotal < 9999
              ? "none"
              : "block"
            : "none"
        }
        textAlign="center"
        fontSize=".8rem"
      >
        ¡Felicidades! Has ganado un cupón de descuento del 1% para tu próxima
        compra.
      </Typography>
      <Typography fontSize=".8rem" display={showdesc && "none"}>
        ¿Te gustaría ahorrar dinero en tus compras? ¡Tenemos una oferta especial
        para ti! Por cada 10000 pesos que gastes en nuestra tienda, recibirás un
        cupón de descuento del 1% para tu próxima compra. Así podrás disfrutar
        de nuestros productos de calidad a un precio aún más bajo. Aprovecha
        esta oportunidad y benefíciate de nuestra promoción. ¡Te esperamos!
      </Typography>
      {
        ( shop.isSuccess && shop.data[0] ) &&
        shop.data.map((pedido, i) => (
          <AccordionPedido key={i} pedido ={pedido}/>
        ))
      }
      <Grid container>
        <Grid item xs={12} md={7}>
          <Grid
            container
            sx={{
              display: {
                xs: "none",
                sm: products.length === 0 ? "none" : "flex",
              },
              borderBottom: "1px solid rgba(0,0,0,0.105)",
            }}
          >
            <Grid item sm={5.1}>
              <Typography textAlign="center">
                <b>PRODUCTO</b>
              </Typography>
            </Grid>
            <Grid item sm={2.3}>
              <Typography textAlign="center">
                <b>PRECIO</b>
              </Typography>
            </Grid>
            <Grid item sm={2.3}>
              <Typography textAlign="center">
                <b>CANTIDAD</b>
              </Typography>
            </Grid>
            <Grid item sm={2.3}>
              <Typography textAlign="center">
                <b>SUBTOTAL</b>
              </Typography>
            </Grid>
          </Grid>
          {products.map((prod, i) => (
            <Shopp key={i} product={prod} />
          ))}
        </Grid>
        <Grid item xs={12} md={5}>
          <Container
            sx={{
              background: "white",
              py: 2,
              mt: 3,
              border: "3px solid rgba(0,0,0,0.105)",
              borderRadius: ".5rem",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "1.6rem",
                  sm: "1.8rem",
                  md: "2rem",
                  lg: "2.3rem",
                  xl: "2.6rem",
                },
                textAlign: "center",
                color: "green",
              }}
            >
              Totales del Carrito
            </Typography>
            <Container>
              <form onSubmit={handleSubmiteee}>
                <Box display={"flex"} flexDirection={"column"} gap={0.5}>
                  <TextField
                    required
                    size="small"
                    name="name"
                    value={name}
                    variant="standard"
                    label="Receptor..."
                    color="success"
                    onChange={handleName}
                  />
                  <TextField
                    required
                    size="small"
                    name="movil"
                    value={movil}
                    variant="standard"
                    label="Movil..."
                    color="success"
                    onChange={handleMovil}
                  />
                  <Autocomplete
                    isOptionEqualToValue={(direc, value) =>
                      direc.nombre === value.nombre
                    }
                    options={lugares}
                    getOptionLabel={(direc) => direc.nombre}
                    value={lugar}
                    onChange={(event, newValue) => {
                      setLugar(newValue);
                      setOpcion(null);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        size="small"
                        label="Dirección..."
                        variant="standard"
                      />
                    )}
                  />
                  {lugar && (
                    <Autocomplete
                      isOptionEqualToValue={(direc, value) =>
                        direc.nombre === value.nombre
                      }
                      options={lugar.dir}
                      value={opcion}
                      onChange={(event, newValue) => {
                        setOpcion(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          size="small"
                          label="Ubicación..."
                          variant="standard"
                        />
                      )}
                    />
                  )}
                  <TextField
                    required
                    name="direccion"
                    value={direccion}
                    variant="standard"
                    label="Calle / Entre Calles / #Casa"
                    color="success"
                    onChange={handleDireccion}
                  />
                  <Typography fontSize=".71rem">
                    Por favor, rellene los datos correctamente para poder
                    garantizar la entrega lo antes posible.
                  </Typography>
                </Box>

                <Box mt={3}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgba(0,0,0,0.105)",
                    }}
                  >
                    <Typography>Sub Total</Typography>
                    <Typography color="green">
                      {( shop.isSuccess && shop.data[0] )
                        ? shop.data[0].descuentoTotal > 9999
                          ? (subTotal *= 0.99)
                          : subTotal
                        : 0}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      my: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgba(0,0,0,0.105)",
                    }}
                  >
                    <Typography>Envio</Typography>
                    <Typography color="green">{}???</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgba(0,0,0,0.105)",
                    }}
                  >
                    <Typography>Total</Typography>
                    <Typography color="green">{}???</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                  <FormControlLabel
                    sx={{ m: 0 }}
                    required
                    control={
                      <Checkbox sx={{ p: 0 }} color="success" size="small" />
                    }
                  />
                  <Typography
                    textAlign={"center"}
                    fontSize=".85rem"
                    onClick={() => setShow(!show)}
                    sx={{ cursor: "pointer" }}
                  >
                    Acepto los términos y condiciones.
                  </Typography>
                </Box>
                <Box
                  className="p"
                  display={show && "none"}
                  fontSize=".85rem"
                  mt={1}
                  sx={{ "&.p p": { m: 0 } }}
                >
                  <p>- Identificación del vendedor:</p>
                  <p>
                    Somos Denis & Pérez, con domicilio social en Calzada
                    Esteban, entre Tirry y San Diego, Pueblo Nuevo Matanzas.
                    Frente por frente a la parada de la terminal. Puede
                    contactar con nosotros a través del teléfono 912345678 o del
                    correo electrónico info@ejemplo.com.
                  </p>
                  <p>- Características y precio de los productos:</p>
                  <p>
                    Ofrecemos productos de las siguientes categorías: Cafetería,
                    Utiles y Calzados. Cada producto tiene una ficha detallada
                    que incluye su nombre, descripción, imagen, precio, y
                    disponibilidad. El precio de los productos se expresa en
                    CUP. El vendedor se reserva el derecho de modificar los
                    precios, los productos y las ofertas en cualquier momento y
                    sin previo aviso.
                  </p>
                  <p>- Métodos de pago:</p>
                  <p>
                    El usuario podrá realizar el pago de su pedido de forma
                    presencial y en dinero físico, en el momento de la recogida
                    del producto. El usuario deberá presentar el comprobante de
                    su pedido en la página web. El vendedor no acepta ningún
                    otro método de pago, como tarjeta de crédito o
                    transferencia, etc.
                  </p>
                  <p>- Métodos y gastos de envío:</p>
                  <p>
                    Hacemos envíos a todo el municipio de Matanzas. No nos
                    hacemos responsable de los posibles retrasos o incidencias
                    en la entrega causados por motivos ajenos a su voluntad,
                    como huelgas, condiciones meteorológicas, etc.
                  </p>
                  <p>- Política de devoluciones, cambios y garantías:</p>
                  <p>
                    El usuario no tiene derecho a desistir de su compra ni a
                    solicitar el cambio de un producto por otro, una vez que
                    haya recogido el pedido en el establecimiento del vendedor.
                    El usuario debe revisar detalladamente toda la mercancía que
                    compra y asegurarse de que está conforme con su estado y
                    calidad, antes de realizar el pago y salir del recinto del
                    vendedor. El vendedor no se hace responsable de ningún
                    defecto, daño o deterioro que el producto pueda sufrir
                    después de su salida del recinto del vendedor.El vendedor
                    ofrece una garantía de que el producto es nuevo y no ha sido
                    usado ni manipulado por terceros. Esta garantía se limita al
                    momento de la entrega del producto al usuario, y no cubre
                    los defectos o faltas de conformidad que puedan surgir por
                    el uso indebido, desgaste, rotura o manipulación por parte
                    del usuario. El usuario renuncia expresamente a cualquier
                    reclamación o acción legal contra el vendedor por los
                    defectos o faltas de conformidad que el producto pueda
                    presentar después de su salida del recinto del vendedor.
                  </p>
                </Box>
                <Box>
                  <Button
                    sx={{ marginTop: 1 }}
                    variant="contained"
                    type="submit"
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={24} />
                    ) : (
                      "Finalizar Pedido"
                    )}
                  </Button>
                </Box>
              </form>
            </Container>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};
