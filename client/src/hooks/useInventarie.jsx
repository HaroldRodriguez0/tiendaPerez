import { useQuery } from "@tanstack/react-query";
import { api } from "../api/myApi";
import { sleep } from "./sleep";

const getInventarie = async ( year, month, day ) => {
  //await sleep(4)
  const { data } = await api.get(`/inventario/get/`, {
    params: { year, month, day },
    headers: {
      "x-token": localStorage.getItem("token"),
    },
  })
  return data;
};


export const useInventarie = ( year, month, day ) => {
  const inventarioQuery = useQuery(
    ["inventarie",{  year, month, day }], 
    () => getInventarie( year, month, day ), 
    { staleTime: 1000 * 60 * 60 }
  );

  return inventarioQuery;
};
