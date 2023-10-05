
import { api } from '../api/myApi';
import { authLogin } from "../reducer/authReducer";


export const keepLogin = ( token ) => {

  console.log(token)

  return async (dispatch) => {

    await api.post('/auth/loginToken', {}, {
      headers: {
          'x-token': token
      }
  })
  
    .then(({ data }) => {
      console.log(data.user)
      dispatch( authLogin( data.user ))
    })
  }
}