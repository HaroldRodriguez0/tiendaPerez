
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/myApi";
import { sleep } from "./sleep";

const getShopping = async ( ) => {
  //await sleep(4)
  const { data } = await api.get(`/shopping`, {
    headers: {
      "x-token": localStorage.getItem("token"),
    },
  })
  return data;
};

export const useShopping = ( ) => {
  const shoppingQuery = useQuery(
    ["shopping"], 
    () => getShopping(), 
    { staleTime: 1000 * 60 * 60 }
  );

  return shoppingQuery;
};
