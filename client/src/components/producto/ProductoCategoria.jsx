import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useProduts } from "../../hooks/useProduts";
import { Productos } from "./Productos";

export const ProductoCategoria = () => {
  let variable;
  const { categoria, value } = useParams();

  console.log(categoria)

  categoria ? (variable = categoria) : (variable = value);

  const products = useProduts(variable);

  const threshold = 300;

  // Función que se ejecuta cuando el scroll cambia
  const onScroll = () => {
    // Obtener la posición actual del scroll
    let scrollPosition = window.scrollY;
    // Obtener la altura total de la página
    let pageHeight = document.body.offsetHeight;
    // Obtener la altura de la ventana
    let windowHeight = window.innerHeight;
    // Calcular la diferencia entre la posición, la altura de la página y la altura de la ventana
    let difference = pageHeight - scrollPosition - windowHeight;
    // Si la diferencia es menor que el umbral, mostrar un mensaje
    if (difference < threshold) {
      products.hasNextPage && !products.isFetching && products.fetchNextPage();
    }
  };

  // Efecto para agregar y remover el listener del evento scroll
  useEffect(() => {
    // Agregar el listener al evento scroll del window
    window.addEventListener("scroll", onScroll);
    // Remover el listener al desmontar el componente
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [products.hasNextPage, products.isFetching]);

  return (
    <Container sx={{ pt: 3 }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: {
            xs: "2rem",
            sm: "2.2rem",
            md: "2.4rem",
            lg: "2.7rem",
            xl: "3rem",
          },
          mb: 1,
          textAlign: "center",
          color: "green",
        }}
      >
        { 
          categoria === 'cafeteria' 
            ? 'Productos Cafeteía'
            : categoria === 'utiles' 
              ? 'Productos Utileía'
              : categoria === 'calzado'
                ? 'Productos Calzado'
                : 'Productos Buscados'
        }
      </Typography>

      <Productos products={products} />

      <Outlet />
    </Container>
  );
};
