/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InventarioDay } from "./InventarioDay";


export const AccordionDay = ({ inv, total }) => {
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
              <Typography>Dia {inv.d}</Typography>
              <Typography textTransform="none">
                Importe de Venta: {total ? total : " -------"}
              </Typography>
            </Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <InventarioDay inventario={inv.inventarie} />
        </AccordionDetails>
      </Accordion>
  );
};
