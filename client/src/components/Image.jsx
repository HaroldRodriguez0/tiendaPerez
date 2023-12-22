import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@mui/material/Skeleton";

// Estilos personalizados para el componente
const useStyles = makeStyles({
  image: {
    maxWidth: "100%",
    height: "auto",
    transition: "opacity 0.3s",
  },
});

// Componente de imagen personalizado
const Image = ({ src, alt }) => {
  const classes = useStyles();
  // Estado que indica si la imagen real se ha cargado
  const [loaded, setLoaded] = useState(false);

  // Función que se ejecuta cuando la imagen real se carga
  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {/* Esqueleto circular con animación de onda */}
      {!loaded && (
        <Skeleton variant="rectangular" sx={{width:'45vw', height: '20vh'}}  animation="wave" />
      )}
      {/* Imagen real con atributo loading="lazy" */}
      <img
        src={src}
        alt={alt}
        className={classes.image}
        onLoad={handleLoad}
        loading="lazy"
        style={{ opacity: loaded ? 1 : 0 }}
      /> 
    </>
  );
};

export default Image;
