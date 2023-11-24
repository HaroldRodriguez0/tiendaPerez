
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: [],
  cant: [],
  precio: [],
  show: '',
}

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {

    stockNow: ( state, action ) => {
      const { precio, name, cant } = action.payload;
      let index = state.name.indexOf(name);
      if(index === -1){
        state.name = [...state.name, name];
        state.cant = [...state.cant, cant];
        state.precio = [...state.precio, precio];
      }
      else{
        state.cant[index] = state.cant[index] + cant;
      }
    },

    stockShow: ( state ) => {
      state.show = true;
    },

    stockClear: ( state ) => {
      state.name = [];
      state.cant = [];
      state.precio = [];
      state.show = false;
    },

  },
})

export const { stockNow, stockClear, stockShow } = stockSlice.actions

export default stockSlice.reducer