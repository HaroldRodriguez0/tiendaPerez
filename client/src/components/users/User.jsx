/* eslint-disable react/prop-types */

import { Button, Collapse, FormControl, IconButton, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../api/myApi";
import { Box } from "@mui/system";

export const User = ({ user, filter, users }) => {
  const [open, setOpen] = useState(false);
  const [movil, setMovil] = useState(user.movil);
  const [permiso, setPermiso] = useState(user.rol);

  const handleApi = async (value) => {
    await api
      .put(`/users/edit/${user.uid}`, value, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        Swal.fire("", data.msg, "success");
        users.refetch();
      })
      .catch(({ response }) => {
        console.log(response);
        let valores = Object.values(response.data.errors).map((obj) => obj.msg);
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

  const handleClickEstado = () => {
    Swal.fire({
      text:
        user.estado === false
          ? "Estás seguro de habilitar este usuario."
          : "Estás seguro de vetar este usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26a430",
      cancelButtonColor: "#d33",
      confirmButtonText:
        user.estado === false ? "Si, Habilitar !" : "Si, Vetar !",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleApi({ estado: !user.estado });
      }
    });
  };

  return (
    <Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, display: handleFilter() }}
      >
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
            onClick={() => handleClickEstado()}
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
