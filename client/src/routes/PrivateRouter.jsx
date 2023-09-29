import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
export const PrivateRouter = ( {children} ) => {

  const {uid} = useSelector( state => state.auth );

  
  return uid
    ? children
    : <Navigate to='/login'/>
}

