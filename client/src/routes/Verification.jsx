import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { authLogin } from "../reducer/authReducer";
import { api } from "../api/myApi";
import { useQueryClient } from "@tanstack/react-query";

export const Verification = () => {
  const quueryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const search = useLocation().search;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const uid = params.get("uid");
    const token = params.get("token");
    // hacer peticion  para buscar el user con ese uid y guardar en store sus datos
    api.get( `/users/uid/?uid=${uid}` )
      .then(body => {
        setData({ token, ...body });
      })
      .catch(error => {
        console.log(error);
        navigate("/login");
        Swal.fire('Error', error.response.data.msg, 'error');
        return;
      });
  }, [search, navigate]);

  useEffect(() => {
    if (data) {
      quueryClient.invalidateQueries([
        "users", "",
      ]);
      dispatch(authLogin(data));
      localStorage.setItem( 'token', data.token );
      navigate("/");
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro Exitoso !!!',
        showConfirmButton: false,
        timer: 1500,
        //customClass: 'swal'
      })
      return;
    }
  }, [data, dispatch, navigate]);  

  return (
    <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "92vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="success"  size="10rem" />
      </Box>
  );
};
