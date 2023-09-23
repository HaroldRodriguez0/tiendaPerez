
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { authRoutes, inventarioRouters, productRouters, usersRoutes, }  from './routes/index.js'
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

// Rutas 
app.use('/api/auth', authRoutes );
app.use('/api/users', usersRoutes );
app.use('/api/product', productRouters );
app.use('/api/inventario', inventarioRouters );


// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
});