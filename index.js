"use strict";

// + Importa el módulo de express
import express from "express";

// + Importa el módulo de express-session para manejar las sesiones
import session from "express-session";

// + Importa el módulo de passport para manejar la autenticación
import passport from "passport";

// + Importa la función que prepara la configuración de passport
import { passportSetup } from "./src/services/passport/passport-setup.js";

// + Importa las variables de entorno
import { cookieKey, PORT, HOST } from "./src/config/configEnv.js";

// + Importa la función que crea los usuarios en la base de datos solo por primera vez
import { createUsers } from "./src/config/initSetup.js";


import bodyParser from "body-parser";

// ! Esta dependencia se tiene que eliminar a futuro
import path from "path";

// + Ruta de autenticación
import authRoutes from './src/routes/auth.routes.js';

// + Ruta de perfil de usuario
import profileRoutes from './src/routes/profile.routes.js';

// + Ruta de Google Calendar
import calendarRoutes from './src/routes/calendar.routes.js';

// + Ruta de reuniones
import meetingRoutes from './src/routes/meeting.routes.js'

// Instancia de express
const app = express();


// Configura body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');

// Especifica la ubicación del directorio de vistas
app.set('views', path.join(process.cwd(), 'src', 'views'));

// ! Optimizar la configuración de passport y la passport.session()

// Configura Passport
passportSetup();

// Configura el middleware de sesiones utilizando express-session
app.use(session({
    secret: cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));


// Inicializa Passport y lo configura
app.use(passport.initialize());
app.use(passport.session());


// Ruta de autenticación con google OAuth 2.0
app.use('/auth', authRoutes);
// ! Revisar para que sirve esta ruta
app.use('/profile', profileRoutes);
// Ruta CRUD calendar
app.use('/calendar', calendarRoutes);
// Ruta CRUD Reuniones
app.use('/meeting', meetingRoutes);
// Ruta de inicio
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});


app.listen(PORT, () => {
    console.log(`http://${HOST}:${PORT}`);
});

createUsers();


async function setupServer() {

}