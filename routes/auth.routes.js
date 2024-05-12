import { Router } from 'express';
import passport from 'passport';
import { getCalendarEvents, createCalendarEvent } from '../config/calendar-setup.js';
const router = Router();

// auth login
router.get('/login', (req,res) => {
    res.render('login', {user:req.user})
})

router.get('/form', (req,res) => {
    res.render('form');
})

// auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logout();
    res.redirect('/');
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events']
}))

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // El usuario se ha autenticado correctamente, redirigir a la página principal u otra página de tu aplicación
    res.redirect('/');
})


// Obtener eventos del calendario
router.post('/crear_event', async(req, res) => {
    try {
        const datos = req.body;
        console.log("Datos:", datos);
        const events = await createCalendarEvent(datos);
        console.log("Eventos:", events);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear evento en el calendario' });
    }
});

// Obtener eventos del calendario
router.get('/obtener_events', async (req, res) => {
    try {
        const events = await getCalendarEvents();
        console.log("Eventos:", events);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener eventos del calendario' });
    }
});

export default router;
