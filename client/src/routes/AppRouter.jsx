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

          <Route path="/login" element={
              <PublicRouter >

                <LoginScreen />

              </PublicRouter>}/>

          <Route path="/verification/*" element={<Verification />} />
          <Route path="/*" element={<HomeScreen />} />

        </Routes>
      </Container>
    </BrowserRouter>
  );
};
