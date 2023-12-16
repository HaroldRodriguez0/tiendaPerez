import { useQuery } from "@tanstack/react-query";
import { api } from "../api/myApi";
import { sleep } from "./sleep";

const getCopieInventarie = async ( categoria = '' ) => {
  const { data } = await api.get(`/inventario/${categoria}`, {
    headers: {
      "x-token": localStorage.getItem("token"),
    },
  })

  return data.products;
};

export const useCopieInventarie = (categoria) => {
  const inventarioQuery = useQuery(
    ["inventarie", categoria], 
    () => getCopieInventarie(categoria), 
  );

  return inventarioQuery;
};
