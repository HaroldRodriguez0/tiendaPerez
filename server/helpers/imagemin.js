
import imagemin from'imagemin';
import imageminJpegtran from'imagemin-jpegtran';
import imageminPngquant from'imagemin-pngquant';
import sharp from "sharp";
import fs from'fs';

const imagemin_sharp = async (path, destination, filename, productImg) => {
  
  const newFileName = `${Date.now()}_${filename}`;
  const ouputPath = `${destination}/${newFileName}`;

  await sharp( path ).resize( 300, 400 )
                     .toFile( ouputPath )
                     .catch( (err) => {
                      console.log(err)
                     });

  await imagemin([ ouputPath ], {
    destination: 'tmp',
    plugins: [
      imageminJpegtran({ quality: 80 }), // Comprime imagen JPG con calidad del 80% 
      imageminPngquant(), // Comprime imagen PNG
    ]
  })
  .then( )
  .catch( (err) => {
    console.log(err)
   });

  // Eliminar img-calidadAlta 
  if( fs.existsSync( path )){
    fs.unlinkSync( path );
  }
/*   if( productImg ){
    const productImgPath = `${destination}/${productImg}`;
      // Eliminar img-producto local
    if( fs.existsSync( productImgPath )){
      fs.unlinkSync( productImgPath );
    }
  } */
  
console.log(ouputPath)
  return ouputPath;
  
}

export {
  imagemin_sharp
}