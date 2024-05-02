import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { useState } from "react";
import { NewProductoVariable } from "./NewProductoVariable";
import { useForm } from "../../hooks/useForm";

import Dropzone from "react-dropzone";

import { api } from "../../api/myApi";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { turnCategoria } from "../../helpers/turnCategoria";
import FlexBetween from "../FlexBetween";

export default function NewProducto () {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const quueryClient = useQueryClient();
  const [i, seti] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [tipoModelo, setModelo] = useState("");
  const [tipoModeloVariable, setModeloVariable] = useState([""]);
  const [cantAlmacenVariable, setcantAlmacenVariable] = useState([""]);
  const [cantTiendaVariable, setcantTiendaVariable] = useState([""]);
  const [productos, setProductos] = useState([]);
  const [imgProduct, setimgProduct] = useState("");
  const [imgDesc, setimgDesc1] = useState("");
  const [errorModelo, setErrorModelo] = useState("");
  const [errorImg, setErrorImg] = useState(false);
  const [checkedImg, setCheckedImg] = useState(false);
  const [checkedImgDesc, setCheckedImgDesc] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked); 
  };

  const handleCheckedImg = (event) => {
    setCheckedImg(event.target.checked);
  };

  const handleCheckedImgDesc = (event) => {
    setCheckedImgDesc(event.target.checked);
  };

  const cambiarModeloVariable = (nuevoValor, i) => {
    const nuevoArreglo = [...tipoModeloVariable];
    nuevoArreglo[i] = nuevoValor;
    setModeloVariable(nuevoArreglo);
  };
  const cambiarAlmacenVariable = (nuevoValor, i) => {
    const nuevoArreglo = [...cantAlmacenVariable];
    nuevoArreglo[i] = nuevoValor;
    setcantAlmacenVariable(nuevoArreglo);
  };
  const cambiarTiendaVariable = (nuevoValor, i) => {
    const nuevoArreglo = [...cantTiendaVariable];
    nuevoArreglo[i] = nuevoValor;
    setcantTiendaVariable(nuevoArreglo);
  };

  const [newProduct, handlenewProduct, newProductReset] = useForm({
    name: "",
    precio: "",
    costoProducto: "",
    descuento: "",
    cantAlmacen: "",
    cantTienda: "",
    modelo: "",
    desc: "",
  });

  const { name, precio, costoProducto, descuento, cantAlmacen, cantTienda, modelo, desc } = newProduct;

  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const handleChangeModelo = (event) => {
    seti(0);
    setProductos([]);
    setModeloVariable([""]);
    setcantAlmacenVariable([""]);
    setcantTiendaVariable([""]);
    setModelo(event.target.value);
  };

  const handleAgregarDisabled = () => {
    if (
      tipoModeloVariable.includes("") ||
      cantAlmacenVariable.includes("") ||
      cantTiendaVariable.includes("")
    )
      return true;
    else return false;
  };

  const agregarProducto = () => {
    setProductos([...productos, ""]);
    setModeloVariable([...tipoModeloVariable, ""]);
    seti(i + 1);
  };

  const handleReset = () => {
    newProductReset();
    setimgProduct("");
    setimgDesc1("");
    setCategoria("");
    setModelo("");
    setErrorModelo("");
    setChecked(false);
  };

  const handleSubmite = async (e) => {
    e.preventDefault();
    setLoading(true);
    let value = true;
    setErrorImg("");
    setErrorModelo("");

    if (!imgProduct) {
      setErrorImg(true);
      value = false;
    }

    if (value) {
      newProduct.categoria = categoria;
      newProduct.fondoImgProduct = checkedImg;
      newProduct.fondoImgDesc = checkedImgDesc;
      newProduct.marked = checked;

      const formData = new FormData();
      for (let key in newProduct) {
        formData.append(key, newProduct[key]);
      }
      formData.append("picture", imgProduct);
      imgDesc && formData.append("picture", imgDesc);

      if (tipoModelo) {
        let modelo = {},
          propiedad;
        tipoModelo === "Numero"
          ? (propiedad = "numero")
          : tipoModelo === "Color"
          ? (propiedad = "color")
          : (propiedad = "tipo");

        tipoModeloVariable.map((value, i) => {
          modelo[value] = {
            tienda: cantTiendaVariable[i],
            almacen: cantAlmacenVariable[i],
          };
        });

        formData.append(propiedad, JSON.stringify(modelo));
      }

      await api
        .post("/product/new", formData, {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then(({ data }) => {
          quueryClient.invalidateQueries([
            "products", turnCategoria(categoria),
          ]);
          handleReset();
          Swal.fire("", data.msg, "success");
        })
        .catch(({ response }) => {
          console.log(response);
          response.data?.msg
            ? Swal.fire("", response.data.msg, "error")
            : setErrorModelo(response.data.errors.name.msg);
        }); 
    }

    setLoading(false);
  };

  return (
    <Container maxWidth={"md"}>
      <Grid
        sx={{
          my: 2,
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <Grid>
          <Card
            sx={{
              p: { xs: ".9rem", md: "1rem 7rem" },
            }}
          >
            <Typography
              variant="h6"
              textAlign={"center"}
              color={"black"}
              sx={{ mb: 1 }}
            >
              Agregar Nuevo Producto
            </Typography>
            <CardContent sx={{ py: 0 }}>
              <form onSubmit={handleSubmite}>
                <Box display={"flex"} flexDirection={"column"} gap={0.8}>
                  <FlexBetween>
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setimgProduct(acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${
                            errorImg ? "red" : "rgb(173, 207, 158)"
                          }`}
                          p=".5rem"
                          sx={{
                            width: "80%",
                            "&:hover": { cursor: "pointer" },
                            p: 0.5,
                          }}
                        >
                          <input {...getInputProps()} />
                          <FlexBetween>
                            <Typography
                              textAlign={"center"}
                              color={"dimgray"}
                              sx={{
                                fontSize: ".9rem",
                                overflow: "auto",
                              }}
                            >
                              {!imgProduct
                                ? "Imagen del producto"
                                : imgProduct.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        </Box>
                      )}
                    </Dropzone>
                    <FormControlLabel
                      sx={{
                        m: 0,
                        ml: 0.7,
                        "& .MuiFormControlLabel-label": { fontSize: ".8rem" },
                      }}
                      value="top"
                      control={
                        <Switch
                          checked={checkedImg}
                          onChange={handleCheckedImg}
                          inputProps={{ "aria-label": "controlled" }}
                          size="small"
                          color="success"
                        />
                      }
                      label="Fondo"
                      labelPlacement="top"
                    />
                  </FlexBetween>
                  <FlexBetween>
                    <Dropzone
                      disabled={!imgProduct && true}
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setimgDesc1(acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={
                            imgProduct
                              ? `2px dashed  rgb(173, 207, 158)`
                              : "2px dashed  gainsboro"
                          }
                          p=".5rem"
                          sx={{
                            width: "80%",
                            "&:hover": { cursor: "pointer" },
                            p: 0.5,
                          }}
                        >
                          <input {...getInputProps()} />
                          <FlexBetween>
                            <Typography
                              textAlign={"center"}
                              color={"dimgray"}
                              sx={{
                                fontSize: ".9rem",
                                overflow: "auto",
                              }}
                            >
                              {!imgDesc ? "Imagen Descripción" : imgDesc.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        </Box>
                      )}
                    </Dropzone>
                    <FormControlLabel
                      sx={{
                        m: 0,
                        ml: 0.5,
                        "& .MuiFormControlLabel-label": { fontSize: ".8rem" },
                      }}
                      value="top"
                      control={
                        <Switch
                          checked={checkedImgDesc}
                          onChange={handleCheckedImgDesc}
                          inputProps={{ "aria-label": "controlled" }}
                          size="small"
                          color="success"
                        />
                      }
                      label="Fondo"
                      labelPlacement="top"
                    />
                  </FlexBetween>
                  <FormControl variant="standard" required>
                    <InputLabel id="demo-simple-select-standard-label">
                      Categoria ...
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={categoria}
                      onChange={handleChangeCategoria}
                    >
                      <MenuItem value="UTILES">Utiles</MenuItem>
                      <MenuItem value="CAFETERIA">Cafeteria</MenuItem>
                      <MenuItem value="CALZADO">Calzado</MenuItem>
                      <MenuItem value="PORMAYOR">Por Mayor</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    name="name"
                    variant="standard"
                    label="Nombre..."
                    color="success"
                    size="small"
                    value={name}
                    onChange={handlenewProduct}
                  />
                  <Box display={"flex"}>
                    <TextField
                    required
                    type="number"
                    name="precio"
                    variant="standard"
                    label="Precio..."
                    color="success"
                    size="small"
                    value={precio}
                    onChange={handlenewProduct}
                    sx={{ pr: 1 }}
                    InputLabelProps={{ style: { fontSize: ".9rem" } }}
                  />
                  <TextField
                    required
                    type="number"
                    name="costoProducto"
                    variant="standard"
                    label="Costo Producto..."
                    color="success"
                    size="small"
                    value={costoProducto}
                    onChange={handlenewProduct}
                    InputLabelProps={{ style: { fontSize: ".9rem" } }}
                  />
                  </Box>
                  <TextField
                    type="number"
                    name="descuento"
                    variant="standard"
                    label="Descuento..."
                    color="success"
                    size="small"
                    value={descuento}
                    onChange={handlenewProduct}
                  />
                  <Box display={"flex"}>
                    <TextField
                      required
                      type="number"
                      name="cantAlmacen"
                      variant="standard"
                      label="Cant Almacen"
                      color="success"
                      size="small"
                      value={cantAlmacen}
                      onChange={handlenewProduct}
                      sx={{ pr: 1 }}
                      InputLabelProps={{ style: { fontSize: ".9rem" } }}
                    />
                    <TextField
                      required
                      type="number"
                      name="cantTienda"
                      variant="standard"
                      label="Cant Tienda"
                      color="success"
                      size="small"
                      value={cantTienda}
                      onChange={handlenewProduct}
                      InputLabelProps={{ style: { fontSize: ".9rem" } }}
                    />
                  </Box>
                  <TextField
                    required
                    name="desc"
                    variant="standard"
                    label="Descripción"
                    color="success"
                    size="small"
                    multiline
                    maxRows={3}
                    value={desc}
                    onChange={handlenewProduct}
                    InputLabelProps={{ style: { fontSize: ".9rem" } }}
                  />
                  <TextField
                    required={!!(tipoModelo && true)}
                    name="modelo"
                    variant="standard"
                    label="Modelo..."
                    color="success"
                    size="small"
                    value={modelo}
                    onChange={handlenewProduct}
                    error={errorModelo ? true : false}
                    helperText={errorModelo}
                  />
                  <FormControl variant="standard" required={!!(modelo && true)}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Tipo Modelo
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={tipoModelo}
                      onChange={handleChangeModelo}
                    >
                      <MenuItem value="Numero">Número</MenuItem>
                      <MenuItem value="Color">Color</MenuItem>
                      <MenuItem value="Tipo">Tipo</MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ display: tipoModelo === "" && "none" }}>
                    <IconButton
                      onClick={agregarProducto}
                      color="inherit"
                      aria-label="Inventario"
                      disabled={handleAgregarDisabled()}
                      sx={{ p: 0 }}
                    >
                      <PostAddOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                      <Typography sx={{ pl: 1, fontSize: ".9rem" }}>
                        Agregar
                      </Typography>
                    </IconButton>
                  </Box>

                  {
                    <NewProductoVariable
                      key={i}
                      i={i}
                      tipoModelo={tipoModelo}
                      cambiarModeloVariable={cambiarModeloVariable}
                      cambiarAlmacenVariable={cambiarAlmacenVariable}
                      cambiarTiendaVariable={cambiarTiendaVariable}
                      tipoModeloVariable={tipoModeloVariable[i]}
                      cantAlmacenVariable={cantAlmacenVariable[i]}
                      cantTiendaVariable={cantTiendaVariable[i]}
                    />
                  }

                  {productos.map((producto, i) => (
                    <NewProductoVariable
                      key={i}
                      i={i}
                      tipoModelo={tipoModelo}
                      cambiarModeloVariable={cambiarModeloVariable}
                      cambiarAlmacenVariable={cambiarAlmacenVariable}
                      cambiarTiendaVariable={cambiarTiendaVariable}
                      tipoModeloVariable={tipoModeloVariable[i]}
                      cantAlmacenVariable={cantAlmacenVariable[i]}
                      cantTiendaVariable={cantTiendaVariable[i]}
                    />
                  ))}
                </Box>
                <FlexBetween marginTop={4}>
                  <Button
                    sx={{ mr: 2 }}
                    variant="contained"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={24} />
                    ) : (
                      "Enviar"
                    )}
                  </Button>
                  <Checkbox {...label} checked={checked} onChange={handleChange} color="success" />
                  <Box
                    textAlign="center"
                    display={!loading && "none"}
                    marginX="auto"
                  >
                    <Typography fontSize=".8rem">Espere...</Typography>
                    <Typography fontSize=".8rem">
                      Podrá tardar unos segundos.
                    </Typography>
                  </Box>
                </FlexBetween>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
