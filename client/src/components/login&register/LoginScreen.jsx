import { useState } from "react";
import { useDispatch } from "react-redux";
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
  FormHelperText,
} from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { api } from "../../api/myApi";
import Swal from "sweetalert2";
import { authLogin } from "../../reducer/authReducer";
import { useNavigate } from "react-router-dom";

export default function LoginScreen () {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setfirst] = useState(true);
  const [codigoPais, setcodigoPais] = useState();
  const [loading, setLoading] = useState(false);
  const [errorpassword, seterrorpassword] = useState(false);
  const [errorname, seterrorname] = useState('');
  const [erroremail, seterroremail] = useState('');
  const [errormovil, seterrormovil] = useState('');

  const [loginForm, handleloginForm, loginReset] = useForm({
    nameEmail: "",
    password: "",
  });

  const [registerForm, handleregisterForm, /* registeReset */] = useForm({
    name: "",
    email: "",
    movil: "",
    password: "",
  });

  const { name, email, movil, password } = registerForm;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const regex = /^.{6,}$/;
    const validator = regex.test(loginForm.password);
    seterrorpassword(!validator ? true : false);

    if (validator) {
      await api
        .post("/auth/login", { ...loginForm })
        .then(({ data }) => {
          dispatch(authLogin({ ...data.user }));
          localStorage.setItem( 'token', data.token );
          navigate("/");
        })
        .catch(({ response }) => {
          Swal.fire("", response.data.msg, "error");
          return;
        });
    }
    loginReset();
  };

  const handleRegister = async () => {
    registerForm.movil = "+" + codigoPais.phone + movil;
    await api
      .post("/auth/register", { ...registerForm })
      .then(({ data }) => {
        navigate("/");
        Swal.fire("", data.msg, "info");      
      })
      .catch(({ response }) => {
        const {errors} = response.data;

        ( errors.name ) ? seterrorname(errors.name.msg) :seterrorname('');
        ( errors.email ) ? seterroremail(errors.email.msg) :seterroremail('');
        ( errors.movil ) ? seterrormovil(errors.movil.msg) :seterrormovil('');

        const regex = /^.{6,}$/;
        const validator = regex.test(registerForm.password);
        seterrorpassword(!validator ? true : false);
        registerForm.movil = '';
        return;
      });
    //registeReset();
  };

  const handleSubmiteee = async (e) => {
    e.preventDefault();
    setLoading(true);

    login ? await handleLogin() : await handleRegister();

    setLoading(false);
  };

  return (
    <Container maxWidth={"md"} sx={{mt:10}}>
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
              p: { xs: "1rem", md: "1rem 7rem" },
            }}
          >
            <Typography variant="h5" textAlign={"center"} color={"black"}>
              {login ? "Inicio de Sesión" : "Registro"}
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmiteee}>
                <Box display={"flex"} flexDirection={"column"} gap={4}>
                  <TextField
                    sx={{ display: !login && "none" }}
                    name="nameEmail"
                    value={loginForm.nameEmail}
                    variant="standard"
                    display="none"
                    label="Nombre o Email"
                    color="success"
                    onChange={handleloginForm}
                  />
                  <TextField
                    sx={{ display: login && "none" }}
                    name="name"
                    value={name}
                    variant="standard"
                    label="Nombre..."
                    color="success"
                    onChange={handleregisterForm}
                    error={errorname ?true :false}
                    helperText={ errorname } 
                  />
                  <TextField
                    sx={{ display: login && "none" }}
                    type="email"
                    name="email"
                    value={email}
                    variant="standard"
                    label="Email..."
                    color="success"
                    onChange={handleregisterForm}
                    error={erroremail ?true :false}
                    helperText={ erroremail } 
                  />
                  <Box sx={{ display: login ? "none" : "flex" }}>
                    <CountrySelect setcodigoPais={setcodigoPais} />
                    <TextField
                      sx={{ width: "100%" }}
                      type="number"
                      name="movil"
                      value={movil}
                      variant="standard"
                      label="Movil..."
                      color="success"
                      inputProps={{ pattern: "[0-9]+" }}
                      onChange={handleregisterForm}
                      error={errormovil ?true :false}
                      helperText={ errormovil } 
                    />
                  </Box>
                  <FormControl variant="standard" color="success">
                    <InputLabel htmlFor="standard-adornment-password">
                      Contraseña...
                    </InputLabel>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={login ? loginForm.password : password}
                      onChange={login ? handleloginForm : handleregisterForm}
                      error={errorpassword}
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
                    {errorpassword && (
                      <FormHelperText error>
                        La contraseña debe tener al menos 6 caracteres.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Button
                  sx={{ marginTop: 4 }}
                  variant="contained"
                  type="submit"
                  disabled={
                    login
                      ? !loginForm.nameEmail || !loginForm.password || loading
                      : !name || !email || !password || !codigoPais || !movil || loading
                  }
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    "Enviar"
                  )}
                </Button>
                <Typography
                  onClick={() => {
                    setfirst(!login);
                  }}
                  sx={{
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    mt: 3,
                    textDecoration: "underline",
                    color: "#26a430",
                    "&:hover": {
                      cursor: "pointer",
                      color: "#86d02d",
                    },
                  }}
                >
                  {login
                    ? "Regístrate aquí."
                    : "Inicie Sesión aquí."}
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
