/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionMonth } from "./AccordionMonth";

export const AccordionYear = ({ inv, month }) => {
  console.log(inv);

  const total = inv.reduce((acum, inv) => {
    const total = inv.products.reduce(
      (acum, item) => acum + item.precio * item.cantidad,
      0
    );
    return acum + total;
  }, 0);

  const mes = (num) => {
    return num === '0' ? "Enero" :
           num === '1' ? "Febrero" :
           num === '2' ? "Marzo" :
           num === '3' ? "Abril" :
           num === '4' ? "Mayo" :
           num === '5' ? "Junio" :
           num === '6' ? "Julio" :
           num === '7' ? "Agosto" :
           num === '8' ? "Septiembre" :
           num === '9' ? "Octubre" :
           num === '10' ? "Noviembre" :
           num === '11' ? "Diciembre" :
           "";
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ p: 0 }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="large"
            variant="outlined"
            color="success"
            sx={{
              width: "100%",
              maxWidth: "780px",
              justifyContent: "space-evenly",
            }}
          >
            <Typography>Mes {mes(month)}</Typography>
            <Typography textTransform="none">
              Importe de Venta: {total ? total : " -------"}
            </Typography>
          </Button>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {inv.map((inv, i) => {
          const total = inv.products.reduce(
            (acum, item) => acum + item.precio * item.cantidad,
            0
          );
          return (
            <AccordionMonth
              key={i}
              total={total}
              date={inv.date}
              pro={inv.products}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
