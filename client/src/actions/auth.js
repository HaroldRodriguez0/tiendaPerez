
import Swal from 'sweetalert2'
import { api } from '../api/myApi';
import { authLogin } from "../reducer/authReducer";


export const startRegister = (name, email, password, movil) => {

  return async (dispatch) => {

    await api.post( '/register', { name, email, password, movil } )

    .then(body => {
      console.log(body);
      localStorage.setItem( 'token', body.token );
      localStorage.setItem( 'token-init-date', new Date().getTime() );

       dispatch( authLogin({
        uid: body.uid,
      }))
    })

    .catch(error => {
      console.log(error);
      Swal.fire('Error', error.msg, 'error')
    });
  }
}