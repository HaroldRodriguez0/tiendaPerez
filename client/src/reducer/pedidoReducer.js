import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const pedidoSlice = createSlice({
  name: 'pedido',
  initialState,
  reducers: {

    pedidoNew: ( state, action ) => {
      state.products = action.payload;
    },

    pedidoChange : ( state, action ) => {
      const { index, cantidad } = action.payload;
      state.products[index].cantidad = cantidad ;
    },

  },
})

export const { pedidoNew, pedidoChange, } = pedidoSlice.actions

export default pedidoSlice.reducer