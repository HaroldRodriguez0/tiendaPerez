import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "../components/HomeScreen";
import { Verification } from "./Verification";
import { NavBar } from "../components/navBar/NavBar";
import { Container } from "@mui/system";
import { LoginScreen } from "../components/login&register/LoginScreen";

export const AppRouter = () => {
  /*   const dispatch = useDispatch();
  const { checking } = useSelector( state => state.auth );

  useEffect(() => {

    dispatch( startChecking() );

  }, [dispatch])
  
  if( checking ){
    return <h1>Espere ...</h1>
  }
 */

  return (
    <BrowserRouter>
      <NavBar />
      <Container >
        <Routes>
          <Route path="/verification/*" element={<Verification />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/*" element={<HomeScreen />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
