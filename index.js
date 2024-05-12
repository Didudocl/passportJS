import express from 'express';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import { passportSetup } from './config/passport-setup.js';
import admin from 'firebase-admin';
import fs from 'fs';
import session from 'express-session';
import { cookieKey } from './config/configEnv.js';
import passport from 'passport';
import bodyParser from 'body-parser';

const app = express();

// Configura body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');

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


// Lee el archivo de credenciales de forma síncrona
const serviceAccount = JSON.parse(fs.readFileSync('./config/credentials.json'));

// Inicializa Firebase Admin SDK con el archivo de credenciales
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
export const db = admin.firestore();

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
// Ruta de inicio
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

// Escucha en el puerto 3000
app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});
