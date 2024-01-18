import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Fade from "@mui/material/Fade";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productDescShow, productEdit } from "../../reducer/productReducer";
import FlexBetween from "../FlexBetween";
import Swal from "sweetalert2";
import { api } from "../../api/myApi";
import { stockNow } from "../../reducer/stockReducer";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { turnCategoria } from "../../helpers/turnCategoria";
import Image from "../Image";
import { shoppingNew } from "../../reducer/shoppingReducer";

// eslint-disable-next-line react/prop-types
export const Producto = (data) => {
  const quueryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, img, cantAlmacen, cantTienda, precio, descuento, categoria } = data;
  const [number, setNumber] = useState(1);
  const { rol } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setNumber(newValue);
  };

  const handleIncrement = () => {
    if (number < 99) {
      setNumber(number + 1);
    }
  };

  const handleDecrement = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
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

  const handleDelete = () => {
    Swal.fire({
      text: "Estás seguro de Eliminar de forma permanente el producto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26a430",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar !",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api
          .delete(`/product/delete/${data._id}`, {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          })
          .then(() => {
            //const value = ;
            quueryClient.invalidateQueries([
              "products",
              turnCategoria(categoria),
            ]);
            Swal.fire({
              title: "Eliminado !",
              text: "El producto se ha Eliminado de forma exitosa",
              icon: "success",
            });
          })
          .catch(({ response }) => {
            console.log(response);
            response.data?.msg && Swal.fire("", response.data.msg, "error");
          });
      }
    });
  };

  const handleAddShopping = () => {
    if (data.numero || data.tipo || data.color) {
      dispatch(productDescShow(data));
    } else {
      dispatch( shoppingNew( data ));
    }
  };

  const AddTask = async () => {

    if (data.numero || data.tipo || data.color) {
      dispatch(productDescShow(data));
    }
    else{
      dispatch(
        stockNow({ name: data.name, precio: data.precio, cantidad: number })
      );
  
      await api
        .put(
          `/inventario/editNewCopie`,
          { ...data, cantidad: number },
          {headers: {
              "x-token": localStorage.getItem("token"),
            },}
        )
        .then(() => {
          quueryClient.invalidateQueries(["products", turnCategoria(categoria)]);
        })
        .catch(({ response }) => {
          console.log(response);
          Swal.fire("", response.data.msg, "error");
        });
    }
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Card elevation={3}>
        <FlexBetween
          sx={{
            display: rol !== "ADMIN_ROLE" ? "none" : "flex",
          }}
        >
          <IconButton
            onClick={() => {
              dispatch(productEdit(data));
              navigate("/product/edit");
            }}
            color="inherit"
            aria-label="Inventario"
            sx={{ p: 0 }}
          >
            <EditOutlinedIcon sx={{ fontSize: "1rem" }} />
            <Typography sx={{ pl: 0.3, fontSize: { xs: ".8rem", lg: "1rem" } }}>
              Editar
            </Typography>
          </IconButton>
          <IconButton
            onClick={() => handleDelete()}
            color="inherit"
            aria-label="Inventario"
            sx={{ p: 0 }}
          >
            <Typography sx={{ fontSize: { xs: ".8rem", lg: "1rem" } }}>
              Borrar
            </Typography>
            <DeleteOutlineOutlinedIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </FlexBetween>
        <CardActionArea
          onClick={() => {
            dispatch(productDescShow(data));
          }}
          disabled={cantTienda === 0 && true}
          sx={{
            "&:hover": {
              transition: "all .5s ease-in",
              backgroundColor: "#f7ffef",
            },
          }}
        >
          <Box overflow={"hidden"}>
            <CardMedia>
              <Image sx={{
                transition: "1s",
                "&:hover": {
                  transform: "scale(1.12)",
                },
                objectFit: "cover",
                objectPosition: "50% 50%",
              }}
              width="100%"
              height="auto"
              alt="produucts"
              src={ img }
      />
              </CardMedia>
            
            
          </Box>
          <CardContent sx={{ p: "7px 5px 0 5px" }}>
            <Typography
              textAlign="center"
              lineHeight="1.2"
              fontWeight="400"
              sx={{
                pb: { xs: name?.length < 20 && "1rem" },
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{ p: 0, px: 1, display: "flex", flexDirection: "column" }}
        >
          <Tooltip
            disableHoverListener={cantTienda !== 0 && true}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Producto Agotado"
          >
            <span style={{ display: "inline-flex" }}>
              <IconButton
                disabled={cantTienda === 0 && true}
                onClick={handleAddShopping}
                aria-label="Carro"
                color={"success"}
                sx={{ width: "100%", justifyContent: "space-around" }}
              >
                <Typography
                  color={( cantTienda === 0 || descuento ) && "#00000050"}
                  textAlign={"center"}
                  lineHeight={"1.2"}
                  fontWeight="400"
                  sx={{
                    textDecoration: ( descuento && cantTienda !== 0 ) && "line-through",
                    textDecorationColor:( descuento && cantTienda !== 0 ) && "red",
                    pr: descuento && .7,
                    m: 0,
                    fontSize: { xs: (descuento && cantTienda !== 0) ?".85rem" :"1rem", sm: (descuento && cantTienda !== 0) ?".95rem" :"1.1rem", md: (descuento && cantTienda !== 0) ?"1.1rem" :"1.3rem" }, py:'4.8px'
                  }}
                >
                  {cantTienda !== 0  ?`${precio} ${(!descuento) ?'cup' :''}`:'Agotado' }
                  
                </Typography>
                <Typography
                  textAlign={"center"}
                  lineHeight={"1.2"}
                  fontWeight="400"
                  sx={{
                    display:( cantTienda === 0 || !descuento ) && 'none',
                    m: 0,
                    fontSize: { xs: ".95rem", sm: "1.1rem", md: "1.3rem" }, py:'4.8px'
                  }}
                >
                  { descuento }cup
                  
                </Typography>
                <AddShoppingCartOutlinedIcon sx={{ fontSize: "1.6rem", display: cantTienda === 0 && 'none' }} />
              </IconButton>
            </span>
          </Tooltip>
          <Grid
            container
            paddingBottom=".6rem"
            sx={{ display: handleValidateRol() && "none" }}
          >
            <Grid
              item
              xs={7}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                sx={{ pl: "3px", maxWidth: "90px" }}
                variant="standard"
                type="number"
                color="success"
                name="number"
                value={number}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleIncrement}
                        aria-label="increment"
                        sx={{ p: "3px" }}
                      >
                        <AddIcon sx={{ fontSize: "1rem" }} />
                      </IconButton>
                      <IconButton
                        onClick={handleDecrement}
                        aria-label="decrement"
                        sx={{ p: "3px" }}
                      >
                        <RemoveIcon sx={{ fontSize: ".9rem" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={5}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <IconButton
                disabled={cantTienda === 0 && true}
                onClick={AddTask}
                size="large"
                aria-label="Compra"
                color="success"
                sx={{ p: 0 }}
              >
                <AddTaskOutlinedIcon sx={{ fontSize: "1.8rem" }} />
              </IconButton>
            </Grid>
          </Grid>

          <Box width={"100%"} sx={{ display: handleValidateRol() && "none" }}>
            <Typography
              color={cantTienda === 0 && "red"}
              textAlign="center"
              fontWeight="400"
              sx={{ fontSize: { xs: ".9rem" }, mr: "5px" }}
            >
              {isMobile ? "Cant Tienda" : "Cantidad Tienda"} :{" "}
              <b>{cantTienda}</b>
            </Typography>
            <Typography
              textAlign="center"
              fontWeight="400"
              sx={{
                fontSize: { xs: ".9rem" },
                mr: "5px",
                display: rol === "ADMIN_ROLE" && "none",
              }}
            >
              {isMobile ? "Cant Almacén" : "Cantidad Almacén"} :{" "}
              <b>{cantTienda ? "si" : "no"}</b>
            </Typography>
            <Typography
              textAlign="center"
              fontWeight="400"
              sx={{
                fontSize: { xs: ".83rem", sm: ".9rem" },
                mr: "5px",
                display: rol !== "ADMIN_ROLE" && "none",
              }}
            >
              {isMobile ? "Cant Almacén" : "Cantidad Almacén"} :{" "}
              <b>{cantAlmacen}</b>
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </>
  );
};
