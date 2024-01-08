
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/myApi";
import { sleep } from "./sleep";

const getPedidos = async ( ) => {

  const { data } = await api.get(`/shopping/pedidos`, {
    headers: {
      "x-token": localStorage.getItem("token"),
    },
  })
  return data;
};

export const usePedidos = ( ) => {
  const pedidosQuery = useQuery(
    ["pedidos"], 
    () => getPedidos(), 
  );

  return pedidosQuery;
};
