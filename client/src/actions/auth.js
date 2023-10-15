

import Swal from 'sweetalert2';
import { api } from '../api/myApi';
import { authLogin } from "../reducer/authReducer";


export const keepLogin = ( token ) => {

  return async (dispatch) => {

    await api.post('/auth/loginToken', {}, {
      headers: {
          'x-token': token
      }
  })
  
    .then(({ data }) => {

      dispatch( authLogin( data.user ))
    })

    .catch( () => {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Le recomendamos que Inicie Sesión',
        showConfirmButton: false,
        timer: 2000, 
        customClass: 'swal'
      })
    })
  }
}