import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CountrySelect from "./CountrySelect";
import {
  Container,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

export const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth={"md"}>
      <Grid
        sx={{
          mt: 5,
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <Grid>
          <Card
            sx={{
              backgroundColor: "#fafff4",
              padding: "1rem",
            }}
          >
            <Typography variant="h5" textAlign={"center"} color={"black"}>
              {" "}
              Edit Producto{/*editing ?"Edit Producto" :"Create Producto"*/}
            </Typography>
            <CardContent>
              <form /* onSubmit={handleSubmit} */>
                <Box display={"flex"} flexDirection={"column"} gap={4}>
                  <TextField required
                    sx={{display: 'none' }}
                    name="nombreproducto"
                    /* value={producto.nombreproducto} */
                    variant="standard"display='none'
                    label="Nombre o Email"
                    color="success"
                    /* onChange={handlChange} */
                  />
                  <TextField required
                    name="nombreproducto"
                    /* value={producto.nombreproducto} */
                    variant="standard"
                    label="Nombre..."
                    color="success"
                    /* onChange={handlChange} */
                    /* error={''}
                    helperText={''} */
                  />
                  <TextField required
                    name="nombreproducto"
                    /* value={producto.nombreproducto} */
                    variant="standard"
                    label="Email..."
                    color="success"
                    /* onChange={handlChange} */
                  />
                  <TextField required
                    name="movil"
                    /* value={producto.nombreproducto} */
                    variant="standard"
                    label="Movil..."
                    color="success"
                    /* onChange={handlChange} */
                  >  </TextField>
                  < CountrySelect />
                  <FormControl variant="standard" color="success" required>
                    <InputLabel htmlFor="standard-adornment-password">
                      Password...
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>
                <Button
                  sx={{ marginTop: 2 }}
                  variant="contained"
                  type="submit"
                  /* disabled={!producto.nombreproducto || !producto.descripcion || !producto.precio || !producto.cantidadproducto} */
                >
                  {/* {loading 
                  ?<CircularProgress color="inherit" size={24}/> 
                  :'Save'}  */}
                  <CircularProgress color="inherit" size={24} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
