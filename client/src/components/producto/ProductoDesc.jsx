import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { api } from "../../api/myApi";
import { turnCategoria } from "../../helpers/turnCategoria";
import { productDescHide } from "../../reducer/productReducer";
import { shoppingNew } from "../../reducer/shoppingReducer";
import { ProductDescCant } from "./ProductDescCant";

export const ProductoDesc = () => {
  const product = useSelector((state) => state.product);
  const { show, name, desc, img, imgDesc, numero, color, tipo, categoria } =
    product;
  const quueryClient = useQueryClient();
  const { rol } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [num, setNum] = useState([]);
  const [arr, setArr] = useState([]);

  let numeros, colores, tipos;

  const handleOnClick = (obj) => {
    if (!arr.includes(obj)) {
      const nuevoConjunto = [...arr, obj];
      const newNum = [...num, 1];
      setNum(newNum);
      setArr(nuevoConjunto);
    }
  };

  const handleClose = () => {
    dispatch(productDescHide());
    setArr([]);
    setNum([]);
  };

  const handleValidateRol = () => {
    let resultado = true;
    rol === "ADMIN_ROLE" && (resultado = false);
    rol === "CAFETERIA_ROLE" &&
      categoria === "CAFETERIA" &&
      (resultado = false);
    rol === "TOOLS_ROLE" &&
      (categoria === "UTILES" || categoria === "CALZADO") &&
      (resultado = false);
    return resultado;
  };

  const handleVender = () => {
    if (numero || tipo || color){
      arr.map(async (value, i) => {
      await api
        .put(
          `/inventario/editNewCopie`,
          numero
            ? { ...product, numero: value, cantidad: num[i] }
            : tipo
            ? { ...product, tipo: value, cantidad: num[i] }
            : { ...product, color: value, cantidad: num[i] },
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          quueryClient.invalidateQueries([
            "products",
            turnCategoria(categoria),
          ]);
          handleClose();
        })
        .catch(({ response }) => {
          console.log(response);
          handleClose();
          Swal.fire("", response.data.msg, "error");
        });
    });
    }
    else{
      dispatch( shoppingNew( product ));
    }
    
  };

  const handleBuy = () => {
    const data = { ...product };
    if (data?.numero || data?.tipo || data?.color) {
      const total = num.reduce(
        (acumulador, valorActual) => acumulador + Number(valorActual),
        0
      );
      data.cant = total;
      data?.numero && (data.numero = arr);
      data?.tipo && (data.tipo = arr);
      data?.color && (data.color = arr);
      arr.length !== 0 && dispatch(shoppingNew(data));
    }
    else{
      dispatch(shoppingNew(data));
    }
  };

  numero && (numeros = Object.keys(numero));
  tipo && (tipos = Object.keys(tipo));
  color && (colores = Object.keys(color));

  return (
    <>
      <Dialog open={!!show} onClose={() => handleClose()}>
        <Container>
          <DialogTitle sx={{ p: 0, py: 1 }}>{name}</DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <img src={imgDesc ? imgDesc : img} alt="product" />
            <DialogContentText fontSize=".95rem">{desc}</DialogContentText>
            <Typography fontSize="1.1rem" py={0.5}>
              {numeros
                ? "Escoja el Numero "
                : colores
                ? "Escoja el Color"
                : tipos
                ? "Escoja el Tipo"
                : ""}
            </Typography>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              {numeros &&
                numeros.map((num, i) => (
                  <Box key={i} display="flex">
                    <Box
                      textAlign="center"
                      width="42px"
                      border={"solid 1px greenyellow"}
                      borderRadius=".6rem"
                      p={1}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          transition: "all .5s ease-in",
                          backgroundColor: "#d3ffca",
                        },
                      }}
                      onClick={() => {
                        handleOnClick(num);
                      }}
                    >
                      {num}
                    </Box>
                    <Box ml={2} display={rol !== "ADMIN_ROLE" && "none"}>
                      <Typography>tienda: {numero[num].tienda}</Typography>
                      <Typography>Almacen: {numero[num].almacen}</Typography>
                    </Box>
                  </Box>
                ))}
              {tipos &&
                tipos.map((tip, i) => (
                  <Box key={i} display="flex">
                    <Box
                      key={i}
                      textAlign="center"
                      border={"solid 1px greenyellow"}
                      borderRadius=".5rem"
                      p={1}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          transition: "all .5s ease-in",
                          backgroundColor: "#d3ffca",
                        },
                      }}
                      onClick={() => {
                        handleOnClick(tip);
                      }}
                    >
                      {tip}
                    </Box>
                    <Box ml={2} display={rol !== "ADMIN_ROLE" && "none"}>
                      <Typography>tienda: {tipo[tip].tienda}</Typography>
                      <Typography>Almacen: {tipo[tip].almacen}</Typography>
                    </Box>
                  </Box>
                ))}
              {colores &&
                colores.map((col, i) => (
                  <Box key={i} display="flex">
                    <Box
                      key={i}
                      textAlign="center"
                      border={"solid 1px greenyellow"}
                      borderRadius=".5rem"
                      p={1}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          transition: "all .5s ease-in",
                          backgroundColor: "#d3ffca",
                        },
                      }}
                      onClick={() => {
                        handleOnClick(col);
                      }}
                    >
                      {col}
                    </Box>
                    <Box ml={2} display={rol !== "ADMIN_ROLE" && "none"}>
                      <Typography>tienda: {color[col].tienda}</Typography>
                      <Typography>Almacen: {color[col].almacen}</Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
            <Container
              sx={{ pt: 1, display: (!rol || arr.length === 0) && "none" }}
              maxWidth="xs"
            >
              <Typography textAlign="center"> Cantidad</Typography>
              <Grid
                spacing={4}
                container
                justifyContent={{ xs: "center", sm: "left" }}
              >
                {arr.length !== 0 &&
                  rol &&
                  arr.map((obj, i) => (
                    <ProductDescCant
                      key={i}
                      i={i}
                      obj={obj}
                      num={num}
                      setNum={setNum}
                    />
                  ))}
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleVender}
              color="info"
              sx={{ display: handleValidateRol() && "none" }}
            >
              Vender
            </Button>
            <Button
              onClick={handleBuy}
              color="success"
              sx={{ display: !rol && "none" }}
            >
              Comprar
            </Button>
            <Button onClick={() => handleClose()} color="secondary">
              Cerrar
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </>
  );
};
