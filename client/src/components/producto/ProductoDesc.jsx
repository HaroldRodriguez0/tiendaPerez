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
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { productDescHide } from "../../reducer/productReducer";
import { ProductDescCant } from "./ProductDescCant";

export const ProductoDesc = () => {
  
  const {
    show,
    name,
    desc,
    img,
    imgDesc,
    numero,
    color,
    tipo,
  } = useSelector((state) => state.product);
  const {rol} = useSelector( state => state.auth );
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
  }

  const handleClose = () => {
    dispatch(productDescHide());
    setArr([])
  }

  numero && (numeros = Object.keys(numero));
  tipo && (tipos = Object.keys(tipo));
  color && (colores = Object.keys(color));

  return (
    <>
      <Dialog open={!!show} onClose={() => handleClose() }>
        <Container>
          <DialogTitle sx={{ p: 0, py: 1 }}>{name}</DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <img src={imgDesc ? imgDesc : img} alt="product" />
            <DialogContentText fontSize='.95rem'>{desc}</DialogContentText>
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
                  <Box
                    key={i}
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
                    onClick={() =>{ handleOnClick(num)}}
                    
                  >
                    {num}
                  </Box>
                ))}
              {tipos &&
                tipos.map((tipo, i) => (
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
                    onClick={() =>{ handleOnClick(tipo)}}
                  >
                    {tipo}
                  </Box>
                ))}
              {colores &&
                colores.map((color, i) => (
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
                    onClick={() =>{ handleOnClick(color)}}
                  >
                    {color}
                  </Box>
                ))}
            </Box>
            <Container sx={{ pt: 1, display:( !rol || arr.length === 0 ) && 'none' }} maxWidth="xs">
              <Typography textAlign="center"> Cantidad</Typography>
              <Grid container justifyContent={{ xs:'center', sm:'left'}}>
                  {(arr.length !== 0 && rol) &&
                arr.map((obj,i) => (
                  <ProductDescCant key={i} i={i} obj={obj} num={num} setNum={setNum} />
                ))}
                
              </Grid>
              
            </Container>
          </DialogContent>
          <DialogActions>
            <Button  onClick={() => console.log(arr+' '+num)}  color="success" sx={{display: !rol && 'none' }}>Comprar</Button>
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
