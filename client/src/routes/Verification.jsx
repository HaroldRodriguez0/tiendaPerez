import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export const Verification = () => {

  const [data, setData] = useState (null);
  const search = useLocation().search;

useEffect(() => {
  
  const params = new URLSearchParams (search);
  const uid = params.get ("uid");
  const token = params.get ("token");
  setData({ uid, token });
}, [search])

    



  return (
    <div>
      {data ? (
        <div>
          <p>Bienvenido {data.uid}, tienes {data.token} años</p>
        </div>
      ) : (
        <div>
          <p>Cargando información...</p>
        </div>
      )}
    </div>
  )
}