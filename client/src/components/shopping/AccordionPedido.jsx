/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const AccordionPedido = ({pedido}) => {
  console.log(pedido)
  const fecha = new Date(pedido.date);
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDay();
  const hora = fecha.getHours();
  const mint = fecha.getMinutes();
  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontSize='.9rem'>{año + ' / ' + mes + ' / ' + dia + ' / ' + hora + 'h / ' + mint + 'm' }</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}
