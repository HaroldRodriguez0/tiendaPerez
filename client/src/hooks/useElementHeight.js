import { useEffect, useState } from "react";

// Esta función devuelve la altura de un elemento en píxeles
export function useElementHeight(elementRef) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // Esta función se ejecuta cuando el elemento cambia de tamaño
    function handleResize() {

      if( elementRef.current ){
        // Obtenemos la altura actual del elemento
      const elementHeight = elementRef.current?.offsetHeight;
      // Actualizamos el estado con la nueva altura
      setHeight(elementHeight);
      }
    }

    if( elementRef.current ){
      // Añadimos un listener al evento de resize del elemento
    elementRef.current.addEventListener("resize", handleResize);
    // Ejecutamos la función una vez al montar el componente
    handleResize();
    }

    // Limpiamos el listener al desmontar el componente
    return () => {
      if( elementRef.current ){
        elementRef.current.removeEventListener("resize", handleResize);
      }
    };
  }, [elementRef]);

  // Devolvemos la altura del elemento
  return height;
}