import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api } from "../api/myApi";
import { sleep } from "./sleep";

const getProducts = async ({ pageParam = 1 }) => {
  await sleep(5);

  const { data } = await api.get(`/product/?page=${pageParam.toString()}`);
  return data;
};

export const useProduts = () => {

  const productsQuery = useInfiniteQuery(
    ['produts'], 
    getProducts, 
    {

    // vuelve a disparar un fetch
    staleTime: 1000 * 60 * 60,

    getNextPageParam: ( lastPage, pages ) => {
      if( lastPage.length === 0 ) return;

      return pages.length + 1;
    },

    // mientras carga la data muestra la informacion
    placeholderData: {
      pages: [
        {
          _id: "65452044e0441f771043969f",
          name: "Ketchup",
          precio: 400,
          categoria: "CAFETERIA",
          cantAlmacen: 70,
          cantTienda: 10,
          desc: "Lorem ipsum dolor sit amet, exercitationem cupiditate, at aspernatur unde nemo omnis quam!",
          modelo: "",
          img: "https://res.cloudinary.com/ddsfbz6wq/image/upload/v1699029060/zuydwrtmemp9vaehk84o.jpg",
        },
        {
          _id: "6545207fe0441f77104396a8",
          name: "Cubiertos de cocina",
          precio: 750,
          categoria: "UTILES",
          cantAlmacen: 0,
          cantTienda: 20,
          desc: "algo",
          modelo: "",
          img: "https://res.cloudinary.com/ddsfbz6wq/image/upload/v1699029120/jgzw9qvlcddulgos3aor.jpg",
        },
      ],
    }, 
  });

  return productsQuery;
};
