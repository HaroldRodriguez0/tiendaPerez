import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { AppRouter } from "./routes/AppRouter";
import { store } from "./store/store";


function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#f7ffef",
      },
      secondary: {
        main: "#f50057",
      },
      success: {
        main: "#26a430",
      },
    },
  });

  return (

    <Provider store={store}>
      <ThemeProvider theme={ theme }>

        <AppRouter />
        
      </ThemeProvider>
    </Provider>

  );
}

export default App;
