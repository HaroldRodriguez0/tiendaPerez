
import { createSlice } from '@reduxjs/toolkit'

const initialState = {// checking ???????????????????????????????????????????
  checking: true,
  uid: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    authLogin: ( state, action ) => {
      const { uid } = action.payload
      state.checking = false
      state.uid = uid
    },

    authRegister: ( state, action ) => {
      const { uid, token } = action.payload
      localStorage.setItem( 'token', token );
      localStorage.setItem( 'token-init-date', new Date().getTime() );
      state.checking = false
      state.uid = uid
    },

    authChekingFinish: ( state ) => {
      state.checking = false
    },

    authLogout: ( state, ) => {
      state.uid = ''
    },

  },
})

export const { authLogin, authChekingFinish, authLogout} = authSlice.actions

export default authSlice.reducer