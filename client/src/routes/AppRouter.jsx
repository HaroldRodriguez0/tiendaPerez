


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen } from './HomeScreen';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouters';
import { Verification } from './Verification';
import { useDispatch, useSelector } from 'react-redux';

export const AppRouter = () => {

/*   const dispatch = useDispatch();
  const { checking } = useSelector( state => state.auth );

  useEffect(() => {

    dispatch( startChecking() );

  }, [dispatch])
  
  if( checking ){
    return <h1>Espere ...</h1>
  }
 */


  return (
    <BrowserRouter>
    <Routes>

    <Route path="/verification/*" element={ <Verification /> }/>

    <Route path="/" element={
      <PublicRouter>
        <HomeScreen/> 
      </PublicRouter>}/>

    <Route path="/*" element={
      <PrivateRouter>
       
      </PrivateRouter>}/>

    </Routes> 
  </BrowserRouter>
  )
}


