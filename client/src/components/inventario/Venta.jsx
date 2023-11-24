
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
} from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockClear } from "../../reducer/stockReducer";

// eslint-disable-next-line react/prop-types
const Row = ({ name, cant, precio, }) => {


  return (
    <Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, }}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell>
          {cant}
        </TableCell>
        <TableCell>
          {precio}
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export const Venta = () => {
  const {
    show,
    name,
    cant,
    precio,
  } = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(stockClear());
  }

  return (
    <>
      <Dialog open={!!show} onClose={() => handleClose() }>
        <Container>
          <DialogTitle sx={{ textAlign: 'center', p: 0, pt: 1 }}>Venta</DialogTitle>
          <DialogContent sx={{ p: 0 }}>
          <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {name &&
              name.map((name, i) => (
                <Row key={i} name={name} cant={cant[i]} precio={precio[i]} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleClose() }
              color="secondary"
            >
              Cerrar
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </>
  );
};








