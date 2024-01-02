import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HomeScreen } from "../components/HomeScreen";
import { Verification } from "./Verification";
import { NavBar } from "../components/navBar/NavBar";
import { LoginScreen } from "../components/login&register/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { keepLogin } from "../actions/auth";
import { PublicRouter } from "./PublicRouter";
import { NewProducto } from "../components/producto/NewProducto";

import { EditProducto } from "../components/producto/EditProducto";
import { ProductoDesc } from "../components/producto/ProductoDesc";
import { Usuarios } from "../components/users/Usuarios";
import { Venta } from "../components/inventario/Venta";
import { ProductoCategoria } from "../components/producto/ProductoCategoria";
import { InventarioDiario } from "../components/inventario/InventarioDiario";
import { Inventarios } from "../components/inventario/Inventarios";
import { Whatsapp } from "../components/Whatsapp";
import { Foother } from "../components/foother/Foother";
import { Shopping } from "../components/shopping/Shopping";
import { Pedidos } from "../components/shopping/Pedidos";

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

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
      <Whatsapp />
      <NavBar />
      <ScrollToTop>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRouter>
                <LoginScreen />
              </PublicRouter>
            }
          />
          <Route path="/product/*">
            <Route path="new" element={<NewProducto />} />
            <Route path="edit" element={<EditProducto />} />
            <Route path=":categoria" element={<ProductoCategoria />} />
          </Route>

          <Route path="/inventario/*">
            <Route path="diario" element={<InventarioDiario />} />
            <Route path="todos" element={<Inventarios />} />
          </Route>

          <Route path="/users" element={<Usuarios />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/pedidos" element={<Pedidos />} />

          <Route path="/verification/*" element={<Verification />} />
          <Route path="/*" element={<HomeScreen />} />
        </Routes>
      </ScrollToTop>

      <ProductoDesc />
      <Venta />
      <Foother />
    </BrowserRouter>
  );
};
