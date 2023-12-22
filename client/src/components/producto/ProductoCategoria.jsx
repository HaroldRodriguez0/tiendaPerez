
import { Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useProduts } from "../../hooks/useProduts";
import { Productos } from "./Productos";


export const ProductoCategoria = () => {
  let variable;
  const { categoria, value } = useParams();
  
  categoria ?variable = categoria :variable = value;
  
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
      ( products.hasNextPage && !products.isFetching ) && ( products.fetchNextPage() ); 
    }
  }

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
    <Container sx={{pt:3}}>
      <Productos products={products} />

      <Outlet />
    </Container>
  ); 
};
