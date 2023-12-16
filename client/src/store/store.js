
import { configureStore } from '@reduxjs/toolkit'

import authReducer from "../reducer/authReducer";
import inventarieReducer from '../reducer/inventarieReducer';
import productReducer from '../reducer/productReducer';
import stockReducer from '../reducer/stockReducer';


export const store = configureStore({
  reducer: {
    auth : authReducer,
    product : productReducer,
    stock : stockReducer,
    inventarie : inventarieReducer,
},
})    