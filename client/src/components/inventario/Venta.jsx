import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockClear } from "../../reducer/stockReducer";

// eslint-disable-next-line react/prop-types
const Row = ({ name, cantidad, precio }) => {
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          component="th"
          scope="row"
          sx={{ px: 0, fontSize: { sm: "1.05rem" } }}
        >
          {name}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: { sm: "1.05rem" } }}>
          {cantidad}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: { sm: "1.05rem" } }}>
          {precio}
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export const Venta = () => {
  const { show, name, cantidad, precio } = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  const total = precio.reduce((acumulador, valorActual, indice) => {
    return acumulador + valorActual * cantidad[indice];
  }, 0); 

  const handleClose = () => {
    dispatch(stockClear());
  };

  return (
    <>
      <Dialog open={!!show} onClose={() => handleClose()}>
        <Container>
          <DialogTitle sx={{ textAlign: "center", p: 0, pt: 1 }}>
            Venta
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: { sm: "1.2rem" } }}>
                      Nombre
                    </TableCell>
                    <TableCell sx={{ fontSize: { sm: "1.2rem" } }}>
                      cant
                    </TableCell>
                    <TableCell sx={{ fontSize: { sm: "1.2rem" } }}>
                      Precio
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {name &&
                    name.map((name, i) => (
                      <Row
                        key={i}
                        name={name}
                        cantidad={cantidad[i]}
                        precio={precio[i]}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <Typography
            textAlign="center"
            pt={1}
            sx={{ fontSize: { sm: "1.2rem" } }}
          >
            Importe Total: <b>{total}</b>
          </Typography>
          <DialogActions sx={{ pt: 0 }}>
            <Button onClick={() => handleClose()} color="secondary">
              Cerrar
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </>
  );
};
