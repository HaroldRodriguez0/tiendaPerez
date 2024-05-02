/* eslint-disable react/prop-types */
import {
  Box,
  Button,
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
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/myApi";
import { useCopieInventarie } from "../../hooks/useCopieInventarie";
import {
  inventarieEdite,
  inventarieNew,
} from "../../reducer/inventarieReducer";
import Swal from "sweetalert2";
import { SkeletonInventario } from "./SkeletonInventario";
import { useQueryClient } from "@tanstack/react-query";

const Row = ({ product, index }) => {
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
        <TableCell align="center">{precio * number}</TableCell>
      </TableRow>
    </Fragment>
  );
};

export default function InventarioDiario () {
  const quueryClient = useQueryClient();
  let total = 0,
    totalUti = 0,
    totalCaf = 0,
    totalPor = 0;
  const { rol } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.inventarie);
  const inventario = useCopieInventarie();
  const isMobile = useMediaQuery("(max-width:500px)");

  if (inventario.isSuccess) {
    for (const i of inventario.data) {
      total += i.precio * i.cantidad;
      i.categoria === "PORMAYOR" && (totalPor += i.precio * i.cantidad);
      i.categoria === "CAFETERIA" && (totalCaf += i.precio * i.cantidad);
      (i.categoria === "UTILES" || i.categoria === "CALZADO") &&
        (totalUti += i.precio * i.cantidad);
    }
  }

  const skeletons = [...Array(8)].fill("");

  const handleEdite = async () => {
    await api
      .put(`/inventario/editCopie`, products, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        Swal.fire("", data.msg, "success");
        if (rol === "CAFETERIA_ROLE" || rol === "ADMIN_ROLE") {
          quueryClient.invalidateQueries(["products", "cafeteria"]);
        }
        if (rol === "TOOLS_ROLE" || rol === "ADMIN_ROLE") {
          quueryClient.invalidateQueries(["products", "utiles"]);
          quueryClient.invalidateQueries(["products", "calzado"]);
        }
      })
      .catch(({ response }) => {
        console.log(response);
        Swal.fire("", response.data.msg, "error");
      });
  };

  return (
    <Box sx={{ mx: { md: 20 } }}>

      <Typography
        display={rol !== "ADMIN_ROLE" && "none"}
        textAlign="center"
        py={1}
        fontSize="1.2rem"
      >
        Importe Total: <b>{total}</b>
      </Typography>

      <Box display={(rol !== "CAFETERIA_ROLE" && rol !== "ADMIN_ROLE") && "none"}>
        <Typography
          textAlign="center"
          pt={1}
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
                <TableCell align="center">SubTotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventario.isLoading &&
                skeletons.map((skeleton, i) => <SkeletonInventario key={i} />)}

              {inventario.isSuccess &&
                inventario.data.map(
                  (product, i) =>
                    product.categoria === "CAFETERIA" && (
                      <Row key={i} product={product} index={i} />
                    )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box display={(rol !== "TOOLS_ROLE" && rol !== "ADMIN_ROLE") && "none"}>
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
                <TableCell align="center">SubTotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventario.isLoading &&
                skeletons.map((skeleton, i) => <SkeletonInventario key={i} />)}
              {inventario.isSuccess &&
                inventario.data.map(
                  (product, i) =>
                    (product.categoria === "UTILES" ||
                      product.categoria === "CALZADO") && (
                      <Row key={i} product={product} index={i} />
                    )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box display={(rol !== "STORE_ROLE" && rol !== "ADMIN_ROLE") && "none"}>
        <Typography textAlign="center" pt={2}>
          Importe Por Mayor: <b>{totalPor}</b>
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
                <TableCell align="center">SubTotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventario.isLoading &&
                skeletons.map((skeleton, i) => <SkeletonInventario key={i} />)}
              {inventario.isSuccess &&
                inventario.data.map(
                  (product, i) =>
                    product.categoria === "PORMAYOR"  && (
                      <Row key={i} product={product} index={i} />
                    )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end", mt: 1.5 }}>
        <Button
          size="large"
          variant="outlined"
          color="success"
          onClick={handleEdite}
        >
          Editar
        </Button>
      </Box>
    </Box>
  );
};
