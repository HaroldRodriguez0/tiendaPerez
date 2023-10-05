
import jwt from 'jsonwebtoken';

export const generarJWT = ( uid ) => {

  return new Promise( (resolve, reject) => {

    const payload = { uid };

    jwt.sign( payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    }, ( err, tokeno ) => {

      if( err ){
        console.log(err);
        reject('No se pudo generar el token')
      }

      let arr = [...tokeno]
      arr.splice(45, 0, "Tk96ZmRWQVNzZGZBMTJQT0RFUjNzZGZIQUtFQVJNRWFkMjY");
      let token = arr.join(""); 

      resolve( token );
      
    } )

  })
}

