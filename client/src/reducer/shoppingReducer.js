import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {

    shoppingNew: ( state, action ) => {
      let existingProduct = state.products.find(product => product._id === action.payload._id);
      !existingProduct && (
      state.products = [ ...state.products, action.payload ])
    },

    shoppingClear: ( state ) => {
      state.products = [];
    },
  },
})

export const { shoppingNew, } = shoppingSlice.actions

export default shoppingSlice.reducer