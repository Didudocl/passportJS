import { createCalendarEvent, createCalendarTask, getCalendarEvents } from "../config/calendar-setup.js";

export async function createEvent(req, res) {
    try {
        const data = req.body;
        // ! Falta validaciones xavalines!
        const event = await createCalendarEvent(data);

        res.status(201).json({
            message: "Reunión creada exitosamente",
            reunion: event
        })
    } catch (error) {
        console.log("Error en calendar.controller.js -> createEvent(): ", error);
        res.status(500).json({
            message: "Error al crear la reunión" //! Modificar esto
        })
    }
}

export async function createTask(req, res) {
    try {
        const data = req.body;
        // ! Falta validaciones xavalines!
        const task = await createCalendarTask(data);

        res.status(201).json({
            message: "Tarea creada exitosamente",
            reunion: task
        })
    } catch (error) {
        console.log("Error en calendar.controller.js -> createTask(): ", error);
        res.status(500).json({
            message: "Error al crear la tarea" //! Modificar esto
        })
    }
}

export async function getEvents(req, res) {
    try {
        const events = await getCalendarEvents();

        if (!events || events.length === 0) {
            return res.status(404).json({
                message: "Eventos no encontrados",
                data: null
            });
        }

        return res.status(200).json({
            message: "Eventos encontrados",
            data: events
        });
    } catch (error) {
        console.log("Error en calendar.controller.js -> getEvents(): ", error);
        return res.status(500).json({
            message: "Error al crear la reunión"
        });
    }
}
