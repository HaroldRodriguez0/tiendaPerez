import {
  Box,
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
import { useSelector } from "react-redux";
import { api } from "../../api/myApi";
import { Fragment, useEffect, useState } from "react";


const Row = ({ product }) => {
  const { rol } = useSelector((state) => state.auth);

  const { name, cantAlmacen, cantTienda, precio, modelo } = product;

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="left">{modelo}</TableCell>
        <TableCell align="center">{cantTienda}</TableCell>
        <TableCell align="center" sx={{display: (rol !== 'ADMIN_ROLE' && rol !== 'STORE_ROLE') && 'none'}}>{cantAlmacen}</TableCell>
        <TableCell align="center">{precio }</TableCell>
      </TableRow>
    </Fragment>
  );
};

const ListaProducts = () => {
  const { rol } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = async () => {
      const {data} = await api.get(`/product/all`);
      setProducts(data);
    };
    data();
  }, []);

  const isMobile = useMediaQuery("(max-width:500px)");

  const skeletons = [...Array(8)].fill("");

  return (
    <Box sx={{ mx: { md: 20 } }}>
      <Typography
        display={rol !== "ADMIN_ROLE" && "none"}
        textAlign="center"
        py={1}
        fontSize="1.2rem"
      >
        Inventario:
      </Typography>

      <Box display={rol === "TOOLS_ROLE" && "none"}>
        <Typography textAlign="center" pt={1}>
          Cafeteria:
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">
                  {isMobile ? "Cant" : "Cantidad"}
                </TableCell>
                <TableCell align="center">Almacen</TableCell>
                <TableCell align="center">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
               {products.map(
                  (product, i) =>
                    product.categoria === "CAFETERIA" && (
                      <Row key={i} product={product} />
                    )
                )} 
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box display={rol === "CAFETERIA_ROLE" && "none"}>
        <Typography textAlign="center" pt={2}>
          Utileria:
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">
                  {isMobile ? "Cant" : "Cantidad"}
                </TableCell>
                <TableCell align="center" sx={{display: (rol !== 'ADMIN_ROLE' && rol !== 'STORE_ROLE') && 'none'}}>Almacen</TableCell>
                <TableCell align="center">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {products.map(
                  (product, i) =>
                    (product.categoria === "UTILES" || product.categoria === "CALZADO") && (
                      <Row key={i} product={product} />
                    )
                )} 
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box display={(rol === "CAFETERIA_ROLE" || rol === "TOOLS_ROLE") && "none"}>
        <Typography textAlign="center" pt={2}>
          Por Mayor:
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">
                  {isMobile ? "Cant" : "Cantidad"}
                </TableCell>
                <TableCell align="center" sx={{display: (rol !== 'ADMIN_ROLE' && rol !== 'STORE_ROLE') && 'none'}}>Almacen</TableCell>
                <TableCell align="center">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {products.map(
                  (product, i) =>
                    product.categoria === "PORMAYOR"  && (
                      <Row key={i} product={product} />
                    )
                )} 
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ListaProducts;
