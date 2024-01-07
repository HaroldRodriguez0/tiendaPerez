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
import { NewProductoVariable } from "./NewProductoVariable";
import { useForm } from "../../hooks/useForm";
import Dropzone from "react-dropzone";

import { api } from "../../api/myApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import FlexBetween from "../FlexBetween";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { turnCategoria } from "../../helpers/turnCategoria";

export const EditProducto = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const navigate = useNavigate();
  const quueryClient = useQueryClient();
  const { numero, color, tipo, ...data } = useSelector((state) => state.product);

  let tipoModelokeys = [''],
    tipoModeloName = "",
    tipoModeloTienda = [""],
    tipoModeloAlmacen = [""],
    array = [""],
    length = 0;

  numero &&
    ((tipoModelokeys = Object.keys(numero)),
    (tipoModeloTienda = Object.values(numero)),
    (tipoModeloAlmacen = Object.values(numero)),
    (tipoModeloName = "Numero"));
  color &&
    ((tipoModelokeys = Object.keys(color)),
    (tipoModeloTienda = Object.values(color)),
    (tipoModeloAlmacen = Object.values(color)),
    (tipoModeloName = "Color"));
  tipo &&
    ((tipoModelokeys = Object.keys(tipo)),
    (tipoModeloTienda = Object.values(tipo)),
    (tipoModeloAlmacen = Object.values(tipo)),
    (tipoModeloName = "Tipo"));

  tipoModelokeys &&
    ((array = new Array(tipoModelokeys.length).fill("")),
    (tipoModeloTienda = tipoModeloTienda.map((value) => value.tienda)),
    (tipoModeloAlmacen = tipoModeloAlmacen.map((value) => value.almacen)),
    (length = tipoModelokeys.length - 1));

  const [checked, setChecked] = useState(data.marked ?data.marked :false);
  const [i, seti] = useState(length);
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState(data.categoria);
  const [tipoModelo, setModelo] = useState(tipoModeloName);
  const [tipoModeloVariable, setModeloVariable] = useState(tipoModelokeys);
  const [cantAlmacenVariable, setcantAlmacenVariable] =
    useState(tipoModeloAlmacen);
  const [cantTiendaVariable, setcantTiendaVariable] =
    useState(tipoModeloTienda);
  const [productos, setProductos] = useState(array);
  const [imgProduct, setimgProduct] = useState("");
  const [imgDesc, setimgDesc1] = useState("");
  const [errorModelo, setErrorModelo] = useState("");
  const [errorImg, setErrorImg] = useState(false);
  const [checkedImg, setCheckedImg] = useState(false);
  const [checkedImgDesc, setCheckedImgDesc] = useState(false);
  const [imgarr, setImgarr] = useState([]);

  const handleChange = (event) => {
    setChecked(event.target.checked); 
  };

  const handleCheckedImg = (event) => {
    setCheckedImg(event.target.checked);
  };

  const handleCheckedImgDesc = (event) => {
    imgDesc &&
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

  const [newProduct, handlenewProduct, /* newProductReset */] = useForm({
    name: data.name,
    precio: data.precio,
    descuento: data.descuento,
    cantAlmacen: data.cantAlmacen,
    cantTienda: data.cantTienda,
    modelo: data.modelo,
    desc: data.desc,
  });

  const { name, precio, descuento = 0, cantAlmacen, cantTienda, modelo, desc } = newProduct;

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

  const handleSubmite = async (e) => {
    e.preventDefault();
    setLoading(true);
    let value = true;
    setErrorImg("");
    setErrorModelo("");

    if (!imgProduct && !data.img) {
      setErrorImg(true);
      value = false;
    }

    if (value) {
      newProduct.categoria = categoria;
      newProduct.fondoImgProduct = checkedImg;
      newProduct.fondoImgDesc = checkedImgDesc;
      newProduct.imgarr = imgarr;
      newProduct.marked = checked;

      const formData = new FormData();
      for (let key in newProduct) {
        formData.append(key, newProduct[key]);
      }
      imgProduct
        ? formData.append("picture", imgProduct)
        : checkedImg &&
          fetch(data.img)
            .then((response) => response.blob())
            .then((imageBlob) => {
              console.log(imageBlob)
              formData.append("picture", imageBlob);
            });

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
        .put(`/product/editAdmin/${data.uid}`, formData, {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then(({ data }) => {
          navigate(-1);
          quueryClient.invalidateQueries([
            "products", turnCategoria(categoria),
          ]);
          Swal.fire("", data.msg, "success");
        })
        .catch(({ response }) => {
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
              Editar Producto {}
            </Typography>
            <CardContent sx={{ py: 0 }}>
              <form onSubmit={handleSubmite}>
                <Box display={"flex"} flexDirection={"column"} gap={0.8} >
                  <Grid container spacing={2}>
                    <Grid item xs={7} sm={4}>
                      <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setimgProduct(acceptedFiles[0]);
                        !imgarr.includes("img") &&
                          setImgarr((prev) => [...prev, "img"]);
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
                            //width: "80%",
                            //maxWidth: '150px',
                            "&:hover": { cursor: "pointer" },
                            p: 0.5,
                          }}
                        >
                          <input {...getInputProps()} />

                          {imgProduct ? (
                            <FlexBetween>
                              <Typography
                                textAlign={"center"}
                                color={"dimgray"}
                                sx={{
                                  fontSize: ".9rem",
                                  overflow: "auto",
                                }}
                              >
                                {imgProduct.name}
                              </Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          ) : (
                            <img src={data.img} alt="img Producto" />
                          )}
                        </Box>
                      )}
                      </Dropzone>
                    </Grid>
                    <Grid item xs={5} sm={2} >
                    <FormControlLabel
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        m: 0,
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
                    </Grid>
                    <Grid item xs={7} sm={4} >
                      <Dropzone
                      disabled={!imgProduct && !data.img && true}
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setimgDesc1(acceptedFiles[0]);
                        !imgarr.includes("imgDesc") &&
                          setImgarr((prev) => [...prev, "imgDesc"]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={
                            imgProduct || data.img
                              ? `2px dashed  rgb(173, 207, 158)`
                              : "2px dashed  gainsboro"
                          }
                          p=".5rem"
                          sx={{
                            //width: "80%",
                            "&:hover": { cursor: "pointer" },
                            p: 0.5,
                          }}
                        >
                          <input {...getInputProps()} />
                          {imgDesc ? (
                            <FlexBetween>
                              <Typography
                                textAlign={"center"}
                                color={"dimgray"}
                                sx={{
                                  fontSize: ".9rem",
                                  overflow: "auto",
                                }}
                              >
                                {imgDesc.name}
                              </Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          ) : (
                            <img src={data.imgDesc} alt="imagen Descripción" />
                          )}
                        </Box>
                      )}
                    </Dropzone></Grid>
                    <Grid item xs={5} sm={2} >
                    <FormControlLabel
                      sx={{
                        m: 0,
                        display: 'flex',
                        alignItems: 'center',
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
                    </Grid>
                  </Grid>
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
                    type="number"
                    name="descuento"
                    variant="standard"
                    label="Descuento..."
                    color="success"
                    size="small"
                    value={descuento}
                    onChange={handlenewProduct}
                    InputLabelProps={{ style: { fontSize: ".9rem" } }}
                  />
                  </Box>
                  <Box display={"flex"}>
                    <TextField
                      
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
                    /* multiline
                    maxRows={3} */
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

                  {( tipoModelokeys[0] == '' ) && (
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
                  )}

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
