/* eslint-disable react/prop-types */
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  inventarieEdite,
  inventarieNew,
} from "../../reducer/inventarieReducer";
import Swal from "sweetalert2";
import { api } from "../../api/myApi.js";


const Row =  ({ product, index, id }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.inventarie);
  let value;
  const { name, cantidad, precio, modelo, numero, tipo, color } = product;
  const [number, setNumber] = useState(cantidad);
  color && (value = color);
  numero && (value = numero);
  tipo && (value = tipo);

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handleClickEdit = async () => {
    await api
      .put(`/inventario/editInventario`, {id, index, cantidad: number}, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        Swal.fire("", data.msg, "success");

      })
      .catch(({ response }) => {
        console.log(response);
        Swal.fire("", response.data.msg, "error");
      });
  }

  useEffect(() => {
    setNumber(cantidad);
  }, [cantidad]);

  useEffect(() => {
    if (number !== cantidad) {
      const i = products.findIndex((product) => product.index === index);

      if (i === -1) {
        dispatch(inventarieNew({ ...product, index, cantidad: number }));
      } else {
        dispatch(inventarieEdite({ i, number }));
      }
    }
  }, [number]);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="left">{modelo}</TableCell>
        <TableCell align="left">{value}</TableCell>
        <TableCell align="center">
          <TextField
            sx={{ width: "40px" }}
            variant="standard"
            type="number"
            color="success"
            name="number"
            value={number}
            onChange={handleChange}
          />
        </TableCell>
        <TableCell align="center">{precio}</TableCell>
        <TableCell align="right">
          <IconButton sx={{p:0}} onClick={ handleClickEdit }>
            <EditOutlinedIcon sx={{ fontSize: "1.2rem" }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

// eslint-disable-next-line no-unused-vars
export const InventarioDay = ({inventario}) => {

  

    let totalUti = 0, totalCaf = 0;
    
    if(inventario)
    for (const i of inventario) {
      i.categoria === "CAFETERIA" && (totalCaf += i.precio * i.cantidad);
      (i.categoria === "UTILES" || i.categoria === "CALZADO") &&
        (totalUti += i.precio * i.cantidad);
    }

  const isMobile = useMediaQuery("(max-width:500px)");

  return (
    <Box sx={{ display: !inventario && 'none', mx: { md: 20 }, mb:3 }}>
      <Box >
        <Typography
          textAlign="center"
        >
          Importe Cafeteria: <b>{totalCaf}</b>
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center">
                  {isMobile ? "Cant" : "Cantidad"}
                </TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventario &&
                inventario.map(
                  (product, i) =>
                    product.categoria === "CAFETERIA" && (
                      <Row id={product._id} key={i} product={product} index={i} />
                    )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box >
        <Typography textAlign="center" pt={2}>
          Importe Utileria: <b>{totalUti}</b>
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center">
                  {isMobile ? "Cant" : "Cantidad"}
                </TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventario &&
                inventario.map(
                  (product, i) =>
                    (product.categoria === "UTILES" ||
                      product.categoria === "CALZADO") && (
                      <Row id={product._id} key={i} product={product} index={i} />
                    )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
