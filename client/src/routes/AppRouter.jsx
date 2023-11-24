import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "../components/HomeScreen";
import { Verification } from "./Verification";
import { NavBar } from "../components/navBar/NavBar";
import { Container } from "@mui/system";
import { LoginScreen } from "../components/login&register/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { keepLogin } from "../actions/auth";
import { PublicRouter } from "./PublicRouter";
import { NewProducto } from "../components/producto/NewProducto";
import { ProductoCafeteria } from "../components/producto/ProductoCafeteria";
import { EditProducto } from "../components/producto/EditProducto";
import { ProductoUtileria } from "../components/producto/ProductoUtileria";
import { ProductoCalzado } from "../components/producto/ProductoCalzado";
import { ProductoDesc } from "../components/producto/ProductoDesc";
import { Usuarios } from "../components/users/Usuarios";
import { ProductoSearch } from "../components/producto/ProductoSearch";
import { Venta } from "../components/inventario/Venta";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { rol } = useSelector((state) => state.auth);

  // mantener el estado del usuario cuando se recargue la pagina
  useEffect(() => {
    if (!rol && localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      dispatch(keepLogin(token));
    }
  }, [dispatch, rol]);

  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRouter>
                <LoginScreen />
              </PublicRouter>
            }
          />

          <Route path="/product/*" >
            <Route path="new" element={<NewProducto />} />
            <Route path="edit" element={<EditProducto />} />
            <Route path="cafeteria" element={<ProductoCafeteria />} />
            <Route path="utiles" element={<ProductoUtileria />} />
            <Route path="calzado" element={<ProductoCalzado />} />
            <Route path="search" element={<ProductoSearch />} />
          </Route>

          <Route path="/users" element={<Usuarios />} />

          <Route path="/verification/*" element={<Verification />} />
          <Route path="/*" element={<HomeScreen />} />
        </Routes>
        <ProductoDesc />
        <Venta />
      </Container>
    </BrowserRouter>
  );
};
