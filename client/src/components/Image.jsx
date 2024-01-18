/* eslint-disable react/prop-types */
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

// Estilos personalizados para el componente
const imageStyles = {
  maxWidth: "100%",
  height: "auto",
  transition: "opacity 0.3s",
};

// Componente styled a partir del componente Box
const StyledBox = styled(Box)(imageStyles);

// Componente de imagen personalizado
const CustomImage = ({ src, alt, width, height }) => {
  const [loaded, setLoaded] = useState(false);

  // Función que se ejecuta cuando la imagen real se carga
  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {/* Esqueleto circular con animación de onda */}
      {!loaded && (
        <Skeleton variant="rectangular" sx={{ width: width ?width :'45vw', height: height ?height :'20vh'}}  animation="wave" />
      )}
      {/* Imagen real con atributo loading="lazy" */}
       <StyledBox
        component="img"
        src={src}
        alt={alt}
        onLoad={handleLoad}
        loading="lazy"
        style={{ opacity: loaded ? 1 : 0 }}
      />  
    </>
  );
};

export default CustomImage;
