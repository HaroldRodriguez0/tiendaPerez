
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { api } from "../../api/myApi";
import { Fragment, useEffect, useState } from "react";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {
  Button,
  FormControl,
  Grid,
  InputBase,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";

// eslint-disable-next-line react/prop-types
const Row = ({ user, filter }) => {
  const [open, setOpen] = useState(false);
  const [movil, setMovil] = useState(user.movil);
  const [permiso, setPermiso] = useState(user.rol);

  const handleApi = (value) => {
    api
      .put(`/users/edit/${user.uid}`, value, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        Swal.fire("", data.msg, "success");
      })
      .catch(({ response }) => {
        console.log(response);
        let valores = Object.values (response.data.errors).map (obj => obj.msg);
        valores && Swal.fire("", valores[0], "error");
      });
  };  

  const handleChangeMovil = (event) => {
    setMovil(event.target.value);
  };

  const handleFilter = () => {
    let resp;
    filter === "activos" && user.estado === false && (resp = "none");
    filter === "vetados" && user.estado === true && (resp = "none");
    return resp;
  };

  handleFilter();

  return (
    <Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, display: handleFilter() }}>
        <TableCell sx={{ p: 0 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {user.name}
        </TableCell>
        <TableCell>
          <FormControl
            disabled={user.rol === "ADMIN_ROLE" && true}
            variant="standard"
            sx={{
              minWidth: "80px",
              "& .css-1ebtsa1-MuiInputBase-root-MuiInput-root:before": {
                borderBottom: "none",
              },
            }}
          >
            <NativeSelect
              sx={{ fontSize: "14px" }}
              value={permiso}
              onChange={(e) => {
                handleApi({ rol: e.target.value }), setPermiso(e.target.value);
              }}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              <option disabled={true} value={"ADMIN_ROLE"}>
                ADMIN
              </option>
              <option value={"CAFETERIA_ROLE"}>Cafeteria</option>
              <option value={"TOOLS_ROLE"}>Utileria</option>
              <option value={"USER_ROLE"}>User</option>
            </NativeSelect>
          </FormControl>
        </TableCell>
        <TableCell
          sx={{
            minHeight: "45.5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {user.estado === true ? (
            <Typography display="flex" alignItems="center" fontSize="14px">
              ok
            </Typography>
          ) : (
            <Typography display="flex" alignItems="center" fontSize="14px">
              Vetado
            </Typography>
          )}
          <IconButton
            disabled={user.rol === "ADMIN_ROLE" && true}
            onClick={() => handleApi({ estado: !user.estado })}
            sx={{
              "&:hover": {
                transition: "all .8s ease-in",
                backgroundColor: user.estado === true ? "#ff8b8b" : "#c2feb6",
              },
            }}
            size="small"
            aria-label="Eliminar"
            color="inherit"
          >
            {user.estado === true ? (
              <CloseOutlinedIcon sx={{ fontSize: "1.2rem" }} />
            ) : (
              <DoneOutlinedIcon sx={{ fontSize: "1.2rem" }} />
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ display: handleFilter() }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "200px" }}>Movil</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <tr>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ display: "flex" }}
                    >
                      <TextField
                        sx={{ width: "100px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        required
                        name="movil"
                        variant="standard"
                        color="success"
                        size="small"
                        value={movil}
                        onChange={handleChangeMovil}
                      />
                      <Button
                        onClick={() => handleApi({ movil })}
                        size="small"
                        aria-label="Eliminar"
                        color="inherit"
                        sx={{ p: 0 }}
                      >
                        <EditOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                      </Button>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                  </tr>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  borderRadius: '.6rem',
  border: "1px solid #5bee3f",
  width: "auto",
  ".MuiInputBase-root": {
    width: "100%",
  },
  marginLeft: '1rem',
  "&:hover": {
    transition: "all .5s ease-in",
    backgroundColor: "rgb(200, 255, 177, 25%)",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0.5),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0, 1, 0),
    paddingRight: `calc(.5em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export const Usuarios = () => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState("");
  const [value, setValue] = useState("");

  const dataUser = async () => {
    const { data } = await api.get("/users/", {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    });
    const { total, users } = data;
    setData(users);
  };

  useEffect(() => {
    dataUser();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    api
      .get(`/users/${value}`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setData(data.results)
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  return (
    <>
      <Grid container marginBottom="8px">
        <Grid item order={{xs:1}} xs={10} sm={4} display="flex" justifyContent="center">
          <Search
          >
            <SearchIconWrapper>
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
              value={value} 
              onChange={handleChange} 
              placeholder="Buscar usuario…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>
        <Grid item order={{xs:2, sm:4}} xs={2} sm={2} display="flex" justifyContent="center">
            <IconButton onClick={dataUser} sx={{
              "&:hover": {
                transition: "all .5s ease-in",
                backgroundColor: "rgb(200, 255, 177, 25%)",
              },
            }}>
              <DensitySmallOutlinedIcon />
            </IconButton>
          </Grid>
        <Grid item order={{xs:3, sm:2}} xs={6} sm={3} display="flex" justifyContent="center">
          <Button
            onClick={() => setFilter("activos")}
            size="large"
            aria-label="lista"
            color="inherit"
            sx={{
              "&:hover": {
                transition: "all .5s ease-in",
                backgroundColor: "rgb(200, 255, 177, 25%)",
              },
            }}
          >
            <PersonAddAltOutlinedIcon />
            <Typography
              sx={{
                ml: "15px",
                fontSize: "1rem",
              }}
            >
              Activos
            </Typography>
          </Button>
        </Grid>
        <Grid item order={{xs:4, sm:3}} xs={6} sm={3} display="flex" justifyContent="center">
          <Button
            onClick={() => setFilter("vetados")}
            size="large"
            aria-label="lista"
            color="inherit"
            sx={{
              "&:hover": {
                transition: "all .5s ease-in",
                backgroundColor: "rgb(200, 255, 177, 25%)",
              },
            }}
          >
            <PersonRemoveOutlinedIcon />
            <Typography
              sx={{
                ml: "15px",
                fontSize: "1rem",
              }}
            >
              Vetados
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ p: 0 }}></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Permisos</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((user, i) => (
                <Row key={i} user={user} filter={filter} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
