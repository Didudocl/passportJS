import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/calendar.controller.js';
const router = Router();


// Crear un evento en el calendario
router.post('/create_event', createEvent);

// Obtener eventos del calendario
router.get('/get_events', getEvents);

router.get('/formEvent', (req,res) => {
    res.render('formEvent');
})

router.get('/formTask', (req,res) => {
    res.render('formTask');
})

export default router;