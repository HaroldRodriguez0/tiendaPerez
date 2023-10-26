import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { useState } from "react";
import { NewProductoNumero } from "./NewProductoNumero";
import { NewProductoColor } from "./NewProductoColor";
import { NewProductoTipo } from "./NewProductoTipo";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
//import { agregarProductos } from "./agregarProductos";

export const NewProducto = () => {
  const [i, seti] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [tipoModelo, setModelo] = useState("");
  const [tipoModeloNumero, setModeloNumero] = useState("");
  const [cantAlmacenNumero, setcantAlmacenNumero] = useState("");
  const [cantTiendaNumero, setcantTiendaNumero] = useState("");
  const [tipoModeloColor, setModeloColor] = useState("");
  const [cantAlmacenColor, setcantAlmacenColor] = useState("");
  const [cantTiendaColor, setcantTiendaColor] = useState("");
  const [tipoModeloTipo, setModeloTipo] = useState("");
  const [cantAlmacenTipo, setcantAlmacenTipo] = useState("");
  const [cantTiendaTipo, setcantTiendaTipo] = useState("");

  const [newProduct, handlenewProduct, newProductReset] = useForm({
    name: "",
    precio: "",
    cantAlmacen: "",
    cantTienda: "",
    modelo: "",
  });

  const { name, precio, cantAlmacen, cantTienda, modelo } = newProduct;

  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };
  const handleChangeModelo = (event) => {
    setModelo(event.target.value);
  };

  const [productos, setProductos] = useState([]);

  /*    useEffect(() => {
    
     tipoModelo === "Numero" ? (
      nuevoProducto = <NewProductoNumero i={i} tipoModeloNumero={tipoModeloNumero} setModeloNumero={setModeloNumero} cantAlmacenNumero={cantAlmacenNumero} setcantAlmacenNumero={setcantAlmacenNumero} cantTiendaNumero={cantTiendaNumero} setcantTiendaNumero={setcantTiendaNumero} />
    ) : tipoModelo === "Color" ? (
      nuevoProducto = <NewProductoColor tipoModeloColor={tipoModeloColor} setModeloColor={setModeloColor} cantAlmacenColor={cantAlmacenColor} setcantAlmacenColor={setcantAlmacenColor} cantTiendaColor={cantTiendaColor} setcantTiendaColor={setcantTiendaColor} />
    ) : tipoModelo === "Tipo" ? (
      nuevoProducto = <NewProductoTipo tipoModeloTipo={tipoModeloTipo} setModeloTipo={setModeloTipo} cantAlmacenTipo={cantAlmacenTipo} setcantAlmacenTipo={setcantAlmacenTipo} cantTiendaTipo={cantTiendaTipo} setcantTiendaTipo={setcantTiendaTipo}  />
    ) : (
      ""
    )

    setProductos([...productos, nuevoProducto]); 
  }, [])  */

  const agregarProducto = () => {
    let nuevoProducto;

    tipoModelo === "Numero"
      ? (nuevoProducto = (
          <NewProductoNumero
            i={i} seti={seti}
            tipoModeloNumero={tipoModeloNumero}
            setModeloNumero={setModeloNumero}
            cantAlmacenNumero={cantAlmacenNumero}
            setcantAlmacenNumero={setcantAlmacenNumero}
            cantTiendaNumero={cantTiendaNumero}
            setcantTiendaNumero={setcantTiendaNumero}
          />
        ))
      : tipoModelo === "Color"
      ? (nuevoProducto = (
          <NewProductoColor
            tipoModeloColor={tipoModeloColor}
            setModeloColor={setModeloColor}
            cantAlmacenColor={cantAlmacenColor}
            setcantAlmacenColor={setcantAlmacenColor}
            cantTiendaColor={cantTiendaColor}
            setcantTiendaColor={setcantTiendaColor}
          />
        ))
      : tipoModelo === "Tipo"
      ? (nuevoProducto = (
          <NewProductoTipo
            tipoModeloTipo={tipoModeloTipo}
            setModeloTipo={setModeloTipo}
            cantAlmacenTipo={cantAlmacenTipo}
            setcantAlmacenTipo={setcantAlmacenTipo}
            cantTiendaTipo={cantTiendaTipo}
            setcantTiendaTipo={setcantTiendaTipo}
          />
        ))
      : "";

    setProductos([...productos, nuevoProducto]);

    seti(i + 1);
  };

  const handleSubmite = async (e) => {
    e.preventDefault();
    setLoading(true);

    newProduct.categoria = categoria;
    newProduct.tipoModelo = tipoModelo;
    newProduct.numero = {
      tipoModeloNumero: {
        cantAlmacen: cantAlmacenNumero,
        cantTienda: cantTiendaNumero,
      },
    };

    console.log(newProduct);

    setLoading(false);
  };

  useEffect(() => {

    setProductos([]);
    seti(0);

  }, [ tipoModelo ])
  

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
            <Typography variant="h6" textAlign={"center"} color={"black"}>
              Agregar Nuevo Producto
            </Typography>
            <CardContent sx={{ py: 0 }}>
              <form onSubmit={handleSubmite}>
                <Box display={"flex"} flexDirection={"column"} gap={1}>
                  <FormControl variant="standard">
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
                      <MenuItem value="ZAPATOS">Zapatos</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    name="name"
                    variant="standard"
                    label="Nombre..."
                    color="success"
                    size="small"
                    value={name}
                    onChange={handlenewProduct}
                    /*error={erroremail ?true :false}
                    helperText={ erroremail }  */
                  />
                  <TextField
                    type="number"
                    name="precio"
                    variant="standard"
                    label="Precio..."
                    color="success"
                    size="small"
                    value={precio}
                    onChange={handlenewProduct}
                    /* error={erroremail ?true :false}
                    helperText={ erroremail }  */
                  />
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
                      /* error={erroremail ?true :false}
                    helperText={ erroremail }  */
                      sx={{ pr: 1 }}
                      InputLabelProps={{ style: { fontSize: ".9rem" } }}
                    />
                    <TextField
                      type="number"
                      name="cantTienda"
                      variant="standard"
                      label="Cant Tienda"
                      color="success"
                      size="small"
                      value={cantTienda}
                      onChange={handlenewProduct}
                      /*  error={erroremail ?true :false}
                    helperText={ erroremail }  */
                      InputLabelProps={{ style: { fontSize: ".9rem" } }}
                    />
                  </Box>
                  <TextField
                    name="modelo"
                    variant="standard"
                    label="Modelo..."
                    color="success"
                    size="small"
                    value={modelo}
                    onChange={handlenewProduct}
                    /*    error={erroremail ?true :false}
                    helperText={ erroremail }  */
                  />
                  <FormControl variant="standard">
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
                  {/* 
                  <AgregarProductos i={i} seti={seti} tipoModelo={tipoModelo} tipoModeloNumero={tipoModeloNumero} setModeloNumero={setModeloNumero} cantAlmacenNumero={cantAlmacenNumero} setcantAlmacenNumero={setcantAlmacenNumero} cantTiendaNumero={cantTiendaNumero} setcantTiendaNumero={setcantTiendaNumero} tipoModeloColor={tipoModeloColor} setModeloColor={setModeloColor} cantAlmacenColor={cantAlmacenColor} setcantAlmacenColor={setcantAlmacenColor} cantTiendaColor={cantTiendaColor} setcantTiendaColor={setcantTiendaColor} tipoModeloTipo={tipoModeloTipo} setModeloTipo={setModeloTipo} cantAlmacenTipo={cantAlmacenTipo} setcantAlmacenTipo={setcantAlmacenTipo} cantTiendaTipo={cantTiendaTipo} setcantTiendaTipo={setcantTiendaTipo} /> */}

                  {tipoModelo === "Numero" ? (
                    <NewProductoNumero
                      i={i} seti={seti}
                      tipoModeloNumero={tipoModeloNumero}
                      setModeloNumero={setModeloNumero}
                      cantAlmacenNumero={cantAlmacenNumero}
                      setcantAlmacenNumero={setcantAlmacenNumero}
                      cantTiendaNumero={cantTiendaNumero}
                      setcantTiendaNumero={setcantTiendaNumero}
                    />
                  ) : tipoModelo === "Color" ? (
                    <NewProductoColor
                      i={i}
                      tipoModeloColor={tipoModeloColor}
                      setModeloColor={setModeloColor}
                      cantAlmacenColor={cantAlmacenColor}
                      setcantAlmacenColor={setcantAlmacenColor}
                      cantTiendaColor={cantTiendaColor}
                      setcantTiendaColor={setcantTiendaColor}
                    />
                  ) : tipoModelo === "Tipo" ? (
                    <NewProductoTipo
                      i={i}
                      tipoModeloTipo={tipoModeloTipo}
                      setModeloTipo={setModeloTipo}
                      cantAlmacenTipo={cantAlmacenTipo}
                      setcantAlmacenTipo={setcantAlmacenTipo}
                      cantTiendaTipo={cantTiendaTipo}
                      setcantTiendaTipo={setcantTiendaTipo}
                    />
                  ) : (
                    ""
                  )  }

                  {productos.map((producto, index) => (
                    <div key={index}>{producto}</div>
                  ))}

                  <Box sx={{ display: tipoModelo === "" && "none" }}>
                    <IconButton
                      onClick={agregarProducto}
                      color="inherit"
                      aria-label="Inventario"
                      sx={{ p: 0 }}
                    >
                      <PostAddOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                      <Typography sx={{ pl: 1, fontSize: ".9rem" }}>
                        Agregar
                      </Typography>
                    </IconButton>
                  </Box>
                </Box>
                <Button sx={{ marginTop: 4 }} variant="contained" type="submit">
                  {/* {loading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    "Enviar"
                  )} */}
                  aaaa
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
