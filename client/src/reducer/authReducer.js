
import { createSlice } from '@reduxjs/toolkit'

const initialState = {// checking ??????????????????????????????????????????
  uid: '',
  name: '',
  email: '',
  movil: '',
  rol: '',
  estado: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    authLogin: ( state, action ) => {
      const { uid, name, email, movil, rol, estado } = action.payload;
      state.uid = uid;
      state.name = name;
      state.email = email;
      state.movil = movil;
      state.rol = rol;
      state.estado = estado;
    },

    authLogout: ( state, ) => {
      state.uid = '',
      state.uid = '';
      state.name = '';
      state.email = '';
      state.movil = '';
      state.rol = '';
      state.estado = '';
      localStorage.removeItem("token");
    },

  },
})

export const { authLogin, authLogout} = authSlice.actions

export default authSlice.reducer