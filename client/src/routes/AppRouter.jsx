import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HomeScreen } from "../components/HomeScreen";
import { Verification } from "./Verification";
import { NavBar } from "../components/navBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { keepLogin } from "../actions/auth";
import { PublicRouter } from "./PublicRouter";
import { Whatsapp } from "../components/Whatsapp";
import { Foother } from "../components/foother/Foother";
import { Box, CircularProgress } from "@mui/material";
const LoginScreen = lazy(() =>
  import("../components/login&register/LoginScreen")
);
const NewProducto = lazy(() => import("../components/producto/NewProducto"));
const ProductoDesc = lazy(() => import("../components/producto/ProductoDesc"));
const Usuarios = lazy(() => import("../components/users/Usuarios"));
const Venta = lazy(() => import("../components/inventario/Venta"));
const ProductoCategoria = lazy(() =>
  import("../components/producto/ProductoCategoria")
);
const InventarioDiario = lazy(() =>
  import("../components/inventario/InventarioDiario")
);
const Inventarios = lazy(() => import("../components/inventario/Inventarios"));
const Shopping = lazy(() => import("../components/shopping/Shopping"));
const EditProducto = lazy(() => import("../components/producto/EditProducto"));
const Pedidos = lazy(() => import("../components/shopping/Pedidos"));
const ListaProducts = lazy(() => import("../components/inventario/ListaProducts"));

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
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "92vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="success" size="10rem" />
            </Box>
          }
        >
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
              <Route path="list" element={<ListaProducts />} />
            </Route>

            <Route path="/users" element={<Usuarios />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/pedidos" element={<Pedidos />} />

            <Route path="/verification/*" element={<Verification />} />
            <Route path="/*" element={<HomeScreen />} />
          </Routes>
        </Suspense>
      </ScrollToTop>

      <ProductoDesc />
      <Venta />
      <Foother />
    </BrowserRouter>
  );
};
