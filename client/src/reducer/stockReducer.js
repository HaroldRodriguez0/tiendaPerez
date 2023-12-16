
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: [],
  cantidad: [],
  precio: [],
  show: '',
}

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {

    stockNow: ( state, action ) => {
      const { precio, name, cantidad } = action.payload;
      let index = state.name.indexOf(name);
      if(index === -1){
        state.name = [...state.name, name];
        state.cantidad = [...state.cantidad, cantidad];
        state.precio = [...state.precio, precio];
      }
      else{
        state.cantidad[index] = state.cantidad[index] + cantidad;
      }
    },

    stockShow: ( state ) => {
      state.show = true;
    },

    stockClear: ( state ) => {
      state.name = [];
      state.cantidad = [];
      state.precio = [];
      state.show = false;
    },

  },
})

export const { stockNow, stockClear, stockShow } = stockSlice.actions

export default stockSlice.reducer