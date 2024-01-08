
import { configureStore } from '@reduxjs/toolkit'

import authReducer from "../reducer/authReducer";
import inventarieReducer from '../reducer/inventarieReducer';
import productReducer from '../reducer/productReducer';
import shoppingReducer from '../reducer/shoppingReducer';
import stockReducer from '../reducer/stockReducer';
import pedidoReducer from '../reducer/pedidoReducer';


export const store = configureStore({
  reducer: {
    auth : authReducer,
    product : productReducer,
    stock : stockReducer,
    inventarie : inventarieReducer,
    shopping : shoppingReducer,
    pedido : pedidoReducer
},
})    