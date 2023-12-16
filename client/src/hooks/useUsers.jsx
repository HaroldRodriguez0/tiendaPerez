import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../api/myApi";
import { sleep } from "./sleep";

// eslint-disable-next-line no-unused-vars
const getUsers = async ({ pageParam = 1, queryKey }) => {
  //await sleep(4);
  const [,search] = queryKey;

  const { data } = await api.get(`/users/${search}/?page=${pageParam.toString()}`, {
    headers: {
      "x-token": localStorage.getItem("token"),
    },
  });
  return data;
};

export const useUsers = (search = '') => {

  const usersQuery = useInfiniteQuery(
    [ "users", search ], 
    getUsers, 
    {

    // vuelve a disparar un fetch
    staleTime: 1000 * 60 * 60,

    getNextPageParam: ( lastPage, pages ) => {
      if( lastPage.length === 0 ) return;

      return pages.length + 1;
    },

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
