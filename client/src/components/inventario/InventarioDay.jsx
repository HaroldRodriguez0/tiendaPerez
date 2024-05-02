/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Container,
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

export const Row = ({ product, index, id, ganancia, ban, txt }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.inventarie);
  let value;
  const { name, cantidad, precio, costoProducto, modelo, numero, tipo, color } =
    product;
  const [number, setNumber] = useState(cantidad);
  color && (value = color);
  numero && (value = numero);
  tipo && (value = tipo);

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handleClickEdit = async () => {
    await api
      .put(
        `/inventario/editInventario`,
        { id, index, cantidad: number },
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        Swal.fire("", data.msg, "success");
      })
      .catch(({ response }) => {
        console.log(response);
        Swal.fire("", response.data.msg, "error");
      });
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
          {txt ? (
            number
          ) : (
            <TextField
              sx={{
                width: "40px",
                "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                  fontSize: "14px",
                },
              }}
              variant="standard"
              type="number"
              color="success"
              name="number"
              value={number}
              onChange={handleChange}
            />
          )}
        </TableCell>
        <TableCell align="center">{precio}</TableCell>
        <TableCell align="center">{costoProducto}</TableCell>
        <TableCell align="center">
          {(precio - costoProducto) * cantidad}
        </TableCell>
        <TableCell align="center">
          {(((precio - costoProducto) * cantidad * 100) / ganancia).toFixed(1)}
        </TableCell>
        <TableCell sx={{ display: ban && "none" }} align="right">
          <IconButton sx={{ p: 0 }} onClick={handleClickEdit}>
            <EditOutlinedIcon sx={{ fontSize: "1.2rem" }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

// eslint-disable-next-line no-unused-vars
export const InventarioDay = ({ inventario, gastos = 0, id }) => {
  const [activeTxt, setActiveTxt] = useState(true);
  const [otrosGastos, setOtrosGastos] = useState(gastos);

  useEffect(() => {
    setOtrosGastos(gastos);
  }, [gastos]);

  const handleChangeOtros = (event) => {
    setOtrosGastos(event.target.value);
  };

  const handleClickGastos = async () => {
    await api
    .put(
      `/inventario/editGastos`,
      { id, gastos: otrosGastos },
      {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => {
      Swal.fire("", data.msg, "success");
    })
    .catch(({ response }) => {
      console.log(response);
      Swal.fire("", response.data.msg, "error");
    });
  }

  let cipieInventario,
    totalUti = 0, 
    totalCaf = 0, 
    totalPor = 0,
    ganancia = 0,
    costoUti = 0,
    costoPor = 0,
    gananciaPor = 0,
    gananciaUti = 0,
    gananciaCaf = 0,
    costoCaf = 0,
    salarioCaf = 0,
    salarioUti = 0,
    salarioXMayor = 0;

  function comparar(obj1, obj2) {
    // Calcular el valor de la fórmula para cada objeto
    let valor1 = (obj1.precio - obj1.costoProducto) * obj1.cantidad;
    let valor2 = (obj2.precio - obj2.costoProducto) * obj2.cantidad;
    // Comparar los valores
    if (valor1 > valor2) {
      // Si el primer objeto tiene un valor mayor, se sitúa antes que el segundo
      return -1;
    } else if (valor1 < valor2) {
      // Si el segundo objeto tiene un valor mayor, se sitúa antes que el primero
      return 1;
    } else {
      // Si los objetos tienen el mismo valor, se dejan sin cambios entre ellos
      return 0;
    }
  }

  inventario && (cipieInventario = [...inventario].sort(comparar).slice(0, 5));

  if (inventario)
    for (const i of inventario) {
      i.categoria === "PORMAYOR" &&
      ((totalPor += i.precio * i.cantidad),
      (costoPor += i.costoProducto * i.cantidad));
      i.categoria === "CAFETERIA" &&
        ((totalCaf += i.precio * i.cantidad),
        (costoCaf += i.costoProducto * i.cantidad));
      (i.categoria === "UTILES" || i.categoria === "CALZADO") &&
        ((totalUti += i.precio * i.cantidad),
        (costoUti += i.costoProducto * i.cantidad));
    }

  gananciaCaf = totalCaf - costoCaf;
  gananciaUti = totalUti - costoUti;
  gananciaPor = totalPor - costoPor;
  ganancia = gananciaCaf + gananciaUti + gananciaPor;

  salarioCaf = 1000 + (totalCaf > 90000 ?(totalCaf - 90000) * 0.05 :0);
  salarioUti = 600 + (totalUti > 10000 ?(totalUti - 10000) * 0.05 :0);
  salarioXMayor = 1000 + totalPor * 0.01;

  const isMobile = useMediaQuery("(max-width:500px)");

  return (
    <Box sx={{ display: !inventario && "none", mx: { md: 20 }, mb: 3 }}>
      <Box sx={{ mb: 2 }}>
      <Button
        sx={{ mb: 2 }}
        size="small"
        color="success"
        variant="outlined"
        onClick={() => setActiveTxt(!activeTxt)}
      >
        {" "}
        TXT{" "}
      </Button>
        <Box
          pb={2}
          display="flex"
          justifyContent="space-between"
          borderBottom="1px dashed  gainsboro"
        >
          <Typography>
            Total de Venta: <b>{totalCaf + totalUti + totalPor}</b>
          </Typography>
          <Typography>
            Ganancia de Venta: <b>{ganancia}</b>
          </Typography>
          <Typography>
            % : <b>{((ganancia * 100) / (totalCaf + totalUti + totalPor)).toFixed(1)}</b>
          </Typography>
        </Box>
        <Box py={2} borderBottom="1px dashed  gainsboro">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Trabajador</TableCell>
                  <TableCell align="center">Básico</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">Estímulo</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">Salario</TableCell>
                  <TableCell align="center">% Ganancia</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell component="th" scope="row">
                    Cafeteria
                  </TableCell>
                  <TableCell align="center">1000</TableCell>
                  <TableCell align="center">+</TableCell>
                  <TableCell align="center">{(totalCaf > 90000 ?(totalCaf - 90000) * 0.05 :0)}</TableCell>
                  <TableCell align="center">=</TableCell>
                  <TableCell align="center">{salarioCaf}</TableCell>
                  <TableCell align="center">
                    {((salarioCaf * 100) / ganancia).toFixed(1)} %
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell component="th" scope="row">
                    Utileria
                  </TableCell>
                  <TableCell align="center">600</TableCell>
                  <TableCell align="center">+</TableCell>
                  <TableCell align="center">{totalUti > 10000 ?(totalUti - 10000) * 0.05 :0}</TableCell>
                  <TableCell align="center">=</TableCell>
                  <TableCell align="center">{salarioUti}</TableCell>
                  <TableCell align="center">
                    {((salarioUti * 100) / ganancia).toFixed(1)} %
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell component="th" scope="row">
                    X Mayor
                  </TableCell>
                  <TableCell align="center">1000</TableCell>
                  <TableCell align="center">+</TableCell>
                  <TableCell align="center">{(totalPor > 90000 ?(totalPor - 90000) * 0.05 :0)}</TableCell>
                  <TableCell align="center">=</TableCell>
                  <TableCell align="center">{salarioXMayor}</TableCell>
                  <TableCell align="center">
                    {((salarioXMayor * 100) / ganancia).toFixed(1)} %
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={1} display="flex" alignItems={"center"}>
            <Typography mr={1}>Otros Gastos:</Typography>
            <TextField
              sx={{ width: "70px" }}
              variant="standard"
              type="number"
              color="success"
              name="number"
              value={otrosGastos}
              onChange={handleChangeOtros}
            />
            <Typography ml={2}>
              {" "}
              --- {((otrosGastos * 100) / ganancia).toFixed(1)} %
            </Typography>
            <IconButton sx={{ p: 0, ml: 2 }} onClick={handleClickGastos} >
              <EditOutlinedIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Box>
        </Box>
        <Box py={2} borderBottom="1px dashed  gainsboro">
          <Typography fontSize="1.2rem" color={'red'}>
            Ganancia Real :{" "}
            <b>
              {ganancia -
                salarioCaf -
                salarioUti -
                salarioXMayor -
                otrosGastos}
            </b>{" "}
            ---{" "}
            {(
              ((ganancia -
                salarioCaf -
                salarioUti -
                salarioXMayor -
                otrosGastos) *
                100) /
              ganancia
            ).toFixed(1)}{" "}
            %
          </Typography>
        </Box>
        <Box pt={1}>
          <Typography textAlign="center">
            Productos con mayor Ganancia:
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
                  <TableCell align="center">Costo</TableCell>
                  <TableCell align="center">Ganancia</TableCell>
                  <TableCell align="center">%</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cipieInventario &&
                  cipieInventario.map((product, i) => (
                    <Row
                      id={product._id}
                      key={i}
                      product={product}
                      ganancia={ganancia}
                      index={i}
                      ban={true}
                      txt={true}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
      </Box>
      <Box pt={2} borderTop="1px dashed  gainsboro">
        <Box display={"flex"} justifyContent="space-evenly">
          <Typography>
            Importe Cafeteria: <b>{totalCaf}</b>
          </Typography>
          <Typography>
            Ganancia: <b>{gananciaCaf}</b>
          </Typography>
        </Box>
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
                <TableCell align="center">Costo</TableCell>
                <TableCell align="center">Ganancia</TableCell>
                <TableCell align="center">%</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventario &&
                inventario.map(
                  (product, i) =>
                    product.categoria === "CAFETERIA" && (
                      <Row
                        id={product._id}
                        key={i}
                        product={product}
                        ganancia={ganancia}
                        index={i}
                        txt={activeTxt}
                      />
                    )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mt={2}>
        <Box display={"flex"} justifyContent="space-evenly">
          <Typography mx={1}>
            Importe Utileria: <b>{totalUti}</b>
          </Typography>
          <Typography mx={1}>
            Ganancia: <b>{gananciaUti}</b>
          </Typography>
        </Box>
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
                <TableCell align="center">Costo</TableCell>
                <TableCell align="center">Ganancia</TableCell>
                <TableCell align="center">%</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventario &&
                inventario.map(
                  (product, i) =>
                    (product.categoria === "UTILES" ||
                      product.categoria === "CALZADO") && (
                      <Row
                        id={product._id}
                        key={i}
                        product={product}
                        ganancia={ganancia}
                        index={i}
                        txt={activeTxt}
                      />
                    )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mt={2}>
        <Box display={"flex"} justifyContent="space-evenly">
          <Typography mx={1}>
            Importe Por Mayor: <b>{totalPor}</b>
          </Typography>
          <Typography mx={1}>
            Ganancia: <b>{gananciaPor}</b>
          </Typography>
        </Box>
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
                <TableCell align="center">Costo</TableCell>
                <TableCell align="center">Ganancia</TableCell>
                <TableCell align="center">%</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventario &&
                inventario.map(
                  (product, i) =>
                    product.categoria === "PORMAYOR" && (
                      <Row
                        id={product._id}
                        key={i}
                        product={product}
                        ganancia={ganancia}
                        index={i}
                        txt={activeTxt}
                      />
                    )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </Box>
  );
};
