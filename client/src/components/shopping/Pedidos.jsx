/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Container } from "@mui/system";
import { usePedidos } from "../../hooks/usePedidos";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { api } from "../../api/myApi";
import { pedidoChange, pedidoNew } from "../../reducer/pedidoReducer";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Prod = ({ prod, index, ban }) => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(prod.cantidad);

  const handleChange = (event) => {
    setNumber(event.target.value);
    dispatch(pedidoChange({ index, cantidad: event.target.value }));
  };

  useEffect(() => {
    setNumber(prod.cantidad);
  }, [ban]);

  return (
    <Grid container>
      <Grid item xs={4} display='flex' alignItems='center' justifyContent='center'>
        <Typography fontSize=".9rem" >
          {prod.name}
        </Typography>
      </Grid>
      <Grid item xs={4} display='flex' alignItems='center' justifyContent='center'>
        <Box display="flex" >
          <TextField
            sx={{ width: "40px" }}
            variant="standard"
            type="number"
            color="success"
            name="number"
            value={number}
            onChange={handleChange}
          />
        </Box>
      </Grid>
      <Grid item xs={4} display='flex' alignItems='center' justifyContent='center'>
        <Typography fontSize=".9rem" >
          {prod.precio}
        </Typography>
      </Grid>
    </Grid>
  );
};

const Pedido = ({ pedido }) => {
  
  const fecha = new Date(pedido.date);
  const ano = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const total = pedido.products?.reduce(
    (acum, item) => acum + item.precio * item.cantidad,
    0
  );

  return (
    <Accordion disabled={pedido.length > 0 && true}>
      <AccordionSummary
        sx={{
          "& .css-o4b71y-MuiAccordionSummary-content.Mui-expanded": {
            mt: 2,
            mb: 1,
          },
        }}
        style={{ minHeight: "auto" }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box width="100%" display="flex" justifyContent="space-around">
          <Typography>
            Date: {ano + " / " + mes + " / " + dia + " / "}
          </Typography>
          <Typography>Total: {total}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 1 }}>
        <Box display="flex" justifyContent="space-around">
          <Typography fontSize=".9rem">Receptor: {pedido.receptor}</Typography>
          <Typography fontSize=".9rem">Móvil: {pedido.movil}</Typography>
        </Box>
        <Typography fontSize=".9rem">Dirección: {pedido.direccion}</Typography>
        <Grid container>
          <Grid item xs={4}>
            <Typography textAlign="center">Nombre</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography textAlign="center">Cantidad</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography textAlign="center">Precio</Typography>
          </Grid>
        </Grid>
        {pedido.products.map((prod, i) => (
          <Prod key={i} prod={prod} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const PedidoAdmin = ({ pedido }) => {
  return (
    <Accordion>
      <AccordionSummary
        sx={{
          "& .css-o4b71y-MuiAccordionSummary-content.Mui-expanded": {
            mt: 2,
            mb: 1,
          },
        }}
        style={{ minHeight: "auto" }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box width="100%" display="flex" justifyContent="space-around">
          <Typography>Usuario: {pedido.nameUser}</Typography>
          <Typography>Pedidos: {pedido.pedidos.length}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, pb: 1 }}>
        {pedido.pedidos.map((pedido, i) => (
          <Pedido key={i} pedido={pedido} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export const PedidoUser = ({ pedido, i, expanded, setExpanded }) => {
  const dispatch = useDispatch();
  const quueryClient = useQueryClient();
  const [ban, setBan] = useState(false);
  const { products } = useSelector((state) => state.pedido);
  const total = pedido.products?.reduce(
    (acum, item) => acum + item.precio * item.cantidad,
    0
  );

  // No pueden haber 2 Accordion abiertos
  const handleChange = (panel) => (event, isExpanded) => {
    isExpanded && (dispatch(pedidoNew( pedido.products )), setBan(!ban));
    setExpanded(isExpanded ? panel : false);
  };

  const handleEdit = async () => {
    products !== pedido.products &&
      (await api
        .put(
          `/shopping/edit`,
          {
            nameUser: pedido.nameUser,
            date: pedido.date,
            products: products,
          },
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          quueryClient.invalidateQueries(["pedidos"]);
          Swal.fire({
            text: "Pedido Actualizado con Exito!",
            icon: "success",
          });
        })
        .catch(( response ) => {
          console.log(response);
          Swal.fire("", response.data.msg, "error");
        }));
  };

  const handleAcept = async () => {
    await api
        .put(
          `/shopping/accion`,
          {
            nameUser: pedido.nameUser,
            date: pedido.date,
          },
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          quueryClient.invalidateQueries(["pedidos"]);
          Swal.fire({
            text: "Pedido Enviandose con Exito!",
            icon: "success",
          });
        })
        .catch(({ response }) => {
          console.log(response);
        });
  };

  const handleDelete = async () => {
    await api
        .put(
          `/shopping/accion`,
          {
            nameUser: pedido.nameUser,
            date: pedido.date,
            products: products,
          },
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          quueryClient.invalidateQueries(["pedidos"]);
          Swal.fire({
            text: "Pedido Cancelado con Exito!",
            icon: "success",
          });
        })
        .catch(({ response }) => {
          console.log(response);
          Swal.fire("", response.data.msg, "error");
        });
  };

  return (
    <Accordion
      expanded={expanded === i}
      onChange={handleChange(i)}
      sx={{ mt: 1, border: pedido.descuento && "1px solid greenyellow" }}
    >
      <AccordionSummary
        sx={{
          "& .css-o4b71y-MuiAccordionSummary-content.Mui-expanded": {
            mt: 2,
            mb: 1,
          },
        }}
        style={{ minHeight: "auto" }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="space-around"
          borderBottom="1px solid rgba(0,0,0,0.105)"
        >
          <Typography fontSize=".9rem">Receptor: {pedido.receptor}</Typography>
          <Typography fontSize=".9rem" display={{xs:"none", md:'flex'}}>
            Total:{" "}
            {total + pedido.envio}
          </Typography>
          <Typography color="green">{pedido.estado}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, pb: 1 }}>
        <Container>
          <Box
            display="flex"
            justifyContent="space-around"
            borderBottom="1px solid rgba(0,0,0,0.105)"
          >
            <Typography fontSize=".9rem">Móvil: {pedido.movil}</Typography>
            <Typography fontSize=".9rem">Envio: {pedido.envio}</Typography>
          </Box>
          <Typography
            sx={{ borderBottom: "1px solid rgba(0,0,0,0.105)", py:.5 }}
            fontSize=".9rem"
          >
            Dirección: {pedido.direccion}
          </Typography>
          <Grid container sx={{ borderBottom: "1px solid rgba(0,0,0,0.105)", py:.5 }}>
            <Grid item xs={4}>
              <Typography textAlign="center">Nombre</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign="center">Cantidad</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign="center">Precio</Typography>
            </Grid>
          </Grid>
          {pedido.products.map((prod, i) => (
            <Prod key={i} prod={prod} index={i} ban={ban} />
          ))}
          <Typography mr='1.5rem' textAlign='end' display={{xs:"block", md:'none'}}>
            Total:{" "}
            {total + pedido.envio}
          </Typography>
          <Box mt={.5} display="flex" justifyContent="space-around">
            <Button
              disabled={pedido.estado === 'Cancelado'}
              onClick={handleAcept}
              size="small"
              color="success"
              variant="outlined"
            >
              Aceptar
            </Button>
            <Button
              disabled={pedido.estado === 'Cancelado'}
              onClick={handleEdit}
              size="small"
              color="info"
              variant="outlined"
            >
              Editar
            </Button>
            <Button
              disabled={pedido.estado === 'Cancelado'}
              onClick={handleDelete}
              size="small"
              color="error"
              variant="outlined"
            >
              Cancelar
            </Button>
          </Box>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
};

export const Pedidos = () => {
  const [expanded, setExpanded] = useState(null);
  const pedidos = usePedidos();
  const { rol } = useSelector((state) => state.auth);

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
        Pedidos
      </Typography>
      {pedidos.isSuccess &&
        pedidos.data.map((ped, i) =>
          rol === "ADMIN_ROLE" ? (
            <PedidoAdmin key={i} pedido={ped} />
          ) : (
            <PedidoUser
              key={i}
              pedido={ped}
              i={i}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          )
        )}
    </Container>
  );
};
