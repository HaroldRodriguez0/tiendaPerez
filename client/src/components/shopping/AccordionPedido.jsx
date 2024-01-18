/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Prod = ({ prod }) => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography fontSize=".9rem" textAlign="center">
          {prod.name}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography fontSize=".9rem" textAlign="center">
          {prod.cantidad}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography fontSize=".9rem" textAlign="center">
          {prod.precio}
        </Typography>
      </Grid>
    </Grid>
  );
};

export const AccordionPedido = ({ pedido }) => {
  const total = pedido.products?.reduce(
    (acum, item) => acum + item.precio * item.cantidad,
    0
  );
  const fecha = new Date(pedido.date);
  const dia = fecha.getDate();
  const hora = fecha.getHours();
  const mint = fecha.getMinutes();

  return (
    <Accordion
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
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            borderBottom: "1px solid rgba(0,0,0,0.105)"
          }}
        >
          <Typography fontSize=".9rem">
            {dia + "d / " + hora + "h / " + mint + "m"}
          </Typography>
          <Box display={{xs:"none", md:'flex'}} justifyContent="center">
          <Typography>Total: </Typography>
          <Typography textAlign="center">
            {(total + pedido.envio) }
          </Typography>
        </Box>
          <Typography color="green">{pedido.estado}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 1 }}>
        <Box display="flex" justifyContent="space-around" sx={{borderBottom: "1px solid rgba(0,0,0,0.105)", py:.5}}>
          <Typography fontSize=".9rem">Receptor: {pedido.receptor}</Typography>
          <Typography fontSize=".9rem">Móvil: {pedido.movil}</Typography>
        </Box>
        <Typography fontSize=".9rem" sx={{borderBottom: "1px solid rgba(0,0,0,0.105)", py:.5}}>Dirección: {pedido.direccion}</Typography>
        <Grid container >
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
        <Box display={{xs:"flex", md:'none'}} justifyContent="center">
          <Typography>Total: </Typography>
          <Typography textAlign="center">
            { total + pedido.envio }
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
