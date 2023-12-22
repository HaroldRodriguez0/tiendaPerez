import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  name: "",
  precio: "",
  modelo: "",
  categoria: "",
  cantTienda: "",
  cantAlmacen: "",
  desc: "",
  img: "",
  imgDesc: "",
  numero: "",
  color: "",
  tipo: "",
  show: "",
  search: "",
  marked:"",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

    productEdit: (state, action) => {
      const {
        _id,
        name,
        precio,
        modelo,
        categoria,
        cantTienda,
        cantAlmacen,
        desc,
        img,
        imgDesc,
        numero,
        color,
        tipo,
        marked,
      } = action.payload;
      state.uid = _id;
      state.name = name;
      state.precio = precio;
      state.modelo = modelo;
      state.categoria = categoria;
      state.cantTienda = cantTienda;
      state.cantAlmacen = cantAlmacen;
      state.img = img;
      state.desc = desc;
      state.numero = numero;
      state.imgDesc = imgDesc;
      state.color = color;
      state.tipo = tipo;
      state.marked = marked
    },

    productDescShow: (state, action) => {
      const {
        name,
        precio,
        modelo,
        categoria,
        cantTienda,
        cantAlmacen,
        desc,
        img,
        imgDesc,
        numero,
        color,
        tipo,
      } = action.payload;
      state.name = name;
      state.precio = precio;
      state.modelo = modelo;
      state.categoria = categoria;
      state.cantTienda = cantTienda;
      state.cantAlmacen = cantAlmacen;
      state.img = img;
      state.desc = desc;
      state.numero = numero;
      state.imgDesc = imgDesc;
      state.color = color;
      state.tipo = tipo;
      state.show = true;
    },

    productDescHide: (state) => {
      state.show = false;
    },

  },
});

export const { productEdit, productDescShow, productDescHide } = productSlice.actions;

export default productSlice.reducer;
