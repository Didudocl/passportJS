import express from 'express';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import { passportSetup } from './config/passport-setup.js';
import admin from 'firebase-admin';
import fs from 'fs';
import cookieSession from 'cookie-session';
import { cookieKey } from './config/configEnv.js';
import passport from 'passport';

const app = express();

// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');

// Configura Passport
passportSetup();

// Configura el middleware de sesiones utilizando cookie-session
app.use(cookieSession({
    maxAge: 24*60*60*1000, // 24 horas
    keys: [cookieKey]
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
