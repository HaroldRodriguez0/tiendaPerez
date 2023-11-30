import { useQuery } from "@tanstack/react-query";
import { api } from "../api/myApi";

const getProducts = async () => {
  const { data } = await api.get("/product");
  return data;
};

export const useProduts = () => {
  const productsQuery = useQuery(
    ["produts"], 
    getProducts, {

    // vuelve a disparar un fetch
    //staleTime: 1000 * 60 * 60,

    // muestra inicialmente la data hasta q termine el staleTime y recargue
/*     initialData: {
      product: [
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
    }, */

    // mientras carga la data muestra la informacion
    placeholderData: {
      product: [
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
