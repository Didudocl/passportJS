import { Router } from 'express';
import { createMeeting, getMeeting, getMeetings, updateMeeting, deleteMeeting } from '../controllers/meeting/meeting.controller.js';

const router = Router();

// Ruta para crear reunión
router.post('/create_meeting', createMeeting);

// Ruta para obtener reunión
router.get('/get_meeting', getMeeting);

// Ruta para obtener reuniones
router.get('/get_meetings', getMeetings);

// Ruta para modificar una reunión
router.put('/update_meeting', updateMeeting);

// Ruta para modificar una reunión
router.delete('/delete_meeting', deleteMeeting);

router.get('/formMeeting', (req,res) => {
    res.render('formMeeting');
})

router.get('/formUpdateMeeting', (req,res) => {
    res.render('formUpdateMeeting');
})

export default router;