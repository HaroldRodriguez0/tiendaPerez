import { useQuery } from "@tanstack/react-query";
import { api } from "../api/myApi";

const getUsers = async ( search ) => {
  const { data } = await api.get(`/users/${search}`, {
    headers: {
      "x-token": localStorage.getItem("token"),
    },
  });
  return data;
};

export const useUsers = (search = '') => {

  const usersQuery = useQuery(
    [ "users", search ], 
    () => getUsers(search), 
    {

    // vuelve a disparar un fetch
    staleTime: 1000 * 60 * 60,

    // mientras carga la data muestra la informacion
    /*     placeholderData: {
      product: [
        {

        },
        {

        },
      ],
    }, */
  });  

  return usersQuery
};
