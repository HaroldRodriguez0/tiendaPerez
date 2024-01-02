import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {

    shoppingNew: ( state, action ) => {
      const values = { ...action.payload };
      values.uid && (values._id = values.uid)
      !values?.cant && (values.cant = 1);
      let index = state.products.findIndex(product => product._id === values._id);
      index === -1 
      ? ( state.products = [ ...state.products, values ])
      : ( state.products[index].cant = state.products[index].cant + 1 )
    },

    shoppingChange : ( state, action ) => {
      let index = state.products.findIndex(product => product._id === action.payload._id);
      state.products[index].cant = action.payload.cant ;
    },
  
    shoppingIncrement : ( state, action ) => {
      let index = state.products.findIndex(product => product._id === action.payload._id);
      state.products[index].cant < 99 && (
        state.products[index].cant = state.products[index].cant + 1 );
    },
  
    shoppingDecrement : ( state, action ) => {
      let index = state.products.findIndex(product => product._id === action.payload._id);
      state.products[index].cant > 0 && (
      state.products[index].cant = state.products[index].cant - 1 );
    },

    shoppingDelete : ( state, action ) => {
      let index = state.products.findIndex(product => product._id === action.payload._id);
      state.products.splice(index,1);
    },

    shoppingClear: ( state ) => {
      state.products = [];
    },
  },
})

export const { shoppingNew, shoppingChange, shoppingIncrement, shoppingDelete, shoppingDecrement,} = shoppingSlice.actions

export default shoppingSlice.reducer