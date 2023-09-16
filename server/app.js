
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from "multer";
import path from 'path';
import  authRoutes  from './routes/auth.js'
import  usersRoutes  from './routes/user.js'
import { fileURLToPath } from "url";
import { dbConnection } from "./db/config.js";

/* Configurations */
// --> ( solo para  "type": "module"  )
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// <--

dotenv.config();

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Publico
app.use('/assets', express.static( path.join( __dirname, 'public/assets' )));

// Lectura y parseo del  body
app.use( express.json() );

/* File Storage ( guardar archivos ) */
const storage = multer.diskStorage({
  destination: function( req, file, cb ){
    cb(null, 'public/assets' );
  },
  filename: function( req, file, cb ){
    cb( null, file.originalname );
  }
})
const upload = multer({ storage });

/* Routes with Files */
//app.post('/posts', verifyToken, upload.single('picture'), createPost );

// Rutas 
app.use('/api/auth', authRoutes );
app.use('/api/users', usersRoutes );


// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
});