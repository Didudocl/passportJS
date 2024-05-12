"use strict";

// Importa la función fileURLToPath desde el módulo url
import { fileURLToPath } from "url";
// Importa el módulo path
import path from "path";
// Importa el módulo dotenv
import dotenv from "dotenv";

// Obtiene la ruta del archivo actual
const _filename = fileURLToPath(import.meta.url);

// Obtiene el directorio padre de la ruta del archivo actual
const _dirname = path.dirname(_filename);

// Crea la ruta completa del archivo .env
const envFilePath = path.resolve(_dirname, ".env");

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: envFilePath });

// Exporta la variable de entorno clientID
export const keyID = process.env.clientID;
// Exporta la variable de entorno clientSecret
export const keySecret = process.env.clientSecret;
// Exporta la variable de entorno cookieKey
export const cookieKey = process.env.cookieKey;
// Exporta la variable de entorno cookieKey
export const API_KEY = process.env.API_KEY;