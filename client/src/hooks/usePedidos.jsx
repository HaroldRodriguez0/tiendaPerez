import { useQuery } from "@tanstack/react-query";
import { api } from "../api/myApi";
import { sleep } from "./sleep";

const getPedidos = async () => {
  let value = {data: 0};
  const token = localStorage.getItem("token");
  token &&
    (value = await api.get(`/shopping/pedidos`, {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    }));
  const { data } = value;
  return data;
};

export const usePedidos = () => {
  const pedidosQuery = useQuery(["pedidos"], () => getPedidos());

  return pedidosQuery;
};
