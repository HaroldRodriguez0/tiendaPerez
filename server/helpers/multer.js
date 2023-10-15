
import multer from "multer";

/* File Storage ( guardar archivos ) */
const storage = multer.diskStorage({
  filename: function( req, file, cb ){
    cb( null, file.originalname );
  },
  limits: {
    // Establecer un tamaño máximo de 20 MB por archivo
    fileSize: 20000000
  },

})
const upload = multer({ 
  storage, useTempFiles: true, tempFileDir: '/tmp/', 
  fileFilter: function (req, file, cb) {
    // Comprobar si el tipo MIME del archivo coincide con jpg o png
    if (!file.mimetype.match(/\/(jpeg|png)$/)) {
      // Rechazar el archivo
      cb(null , false);
    } else {
      // Aceptar el archivo
      cb(null, true);
    }
  },
});

export {
  upload
}
