
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: []
}

export const inventarieSlice = createSlice({
  name: 'inventarie',
  initialState,
  reducers: {

    inventarieNew: ( state, action ) => {
      state.products = [...state.products, action.payload]
    },

    inventarieEdite: ( state, action ) => {
      const { i, number } = action.payload;
      state.products[i].cantidad = number;
    },

  },
})

export const { inventarieNew, inventarieEdite } = inventarieSlice.actions

export default inventarieSlice.reducer