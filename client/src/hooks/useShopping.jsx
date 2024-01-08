
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/myApi";
import { sleep } from "./sleep";

const getShopping = async ( ) => {
  let value = {data: 0};
  const token = localStorage.getItem("token");
  token && (
    value = await api.get(`/shopping`, {
    headers: {
      "x-token": token,
    },
  }))
  const { data } = value;
  return data;
};

export const useShopping = ( ) => {
  const shoppingQuery = useQuery(
    ["shopping"], 
    () => getShopping(), 
  );

  return shoppingQuery;
};
