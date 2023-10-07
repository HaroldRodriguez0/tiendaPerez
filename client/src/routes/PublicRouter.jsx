
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export const PublicRouter = ({children}) => {
  
  const {uid} = useSelector( state => state.auth );

  return !uid
    ? children
    : <Navigate to='/'/>
}

