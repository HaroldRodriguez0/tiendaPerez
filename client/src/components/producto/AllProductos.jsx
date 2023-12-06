import { Box, Grid, LinearProgress, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduts } from "../../hooks/useProduts";
import { Producto } from "./Producto";
import { SkeletonLoading } from "./SkeletonLoading";

export const AllProductos = () => {
   const products = useProduts();

  const threshold = 300;
  const skeletons = [...Array(8)].fill('');

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
  }, [products.hasNextPage, products.isFetching]); // Ejecutar el efecto solo una vez al montar el componente

  const { rol } = useSelector((state) => state.auth);
  const vistaRol = rol !== "ADMIN_ROLE" && true;
  

  if (products.isLoading) {
    return (
      <>
      {skeletons.map((skeleton, i) => (
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={6}
          sm={4}
          md={3}
          key={i}
        >
          <SkeletonLoading  />
        </Grid>
      ))}
      </>
    );
  }

  return (
    <>
      <Box flexGrow={1} my={5}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {products.data?.pages.flat().map((product, i) => (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              item
              xs={6}
              sm={4}
              md={3}
              key={i}
            >
              <Producto {...product} vistaRol={vistaRol} />
            </Grid>
          ))}
          {products.isFetching &&
              
              skeletons.map((skeleton, i) => (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              item
              xs={6}
              sm={4}
              md={3}
              key={i}
            >
              <SkeletonLoading  />
            </Grid>
          ))}
        </Grid>
      </Box>
      
    </>
  );
};
