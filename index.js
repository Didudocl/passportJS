import express from 'express';
import authRoutes from './routes/auth.routes.js';
import passportSetup from './config/passport-setup.js';

const app = express();

// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');

// Configura Passport
passportSetup();

// set up routes
app.use('/auth', authRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
    res.render('home');
});

// Escucha en el puerto 3000
app.listen(3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000');
});
