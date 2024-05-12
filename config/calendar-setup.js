import { google } from 'googleapis';
import { usuarioDoc } from './passport-setup.js';

//! Buscar la optimización y organización de codigo

// Función para obtener los eventos del calendario
export async function getCalendarEvents() {
    const token = usuarioDoc.token;

    const oauth2Client = new google.auth.OAuth2();

    oauth2Client.setCredentials({ access_token: token });

    // Crea una instancia del cliente de Google Calendar utilizando OAuth2 para la autenticación
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Define los parámetros de la solicitud para obtener los eventos
    const params = {
        calendarId: 'primary', // ID del calendario (puede ser 'primary' para el calendario principal del usuario)
        timeMin: new Date().toISOString(), // Fecha y hora mínima para obtener eventos (opcional)
        maxResults: 10, // Número máximo de eventos a obtener (opcional)
        singleEvents: true, // Si debe expandir eventos recurrentes en eventos individuales (opcional)
        orderBy: 'startTime', // Orden de los eventos devueltos (opcional)
    };

    // Retorna una promesa que resuelve los eventos
    return new Promise((resolve, reject) => {
        // Realiza la llamada a la API para obtener los eventos
        calendar.events.list(params, (err, res) => {
            if (err) {
                console.error('Error al obtener eventos:', err);
                reject(err);
                return;
            }
            const events = res.data.items;

        // Formatear cada evento en el array
        const dataEvents = events.map(event => {
            return {
                title: event.summary,
                type: event.kind, 
                start: event.start,
                end: event.end,
                status: event.status,
                linkEvent: event.htmlLink,
                creator: event.creator,
                organizer: event.organizer,
                reminder: event.reminders,
                attendees: event.attendees
            };
        });
            resolve(dataEvents);
        });
    });
}


export async function createCalendarEvent(datos) {
  const token = usuarioDoc.token;

  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({access_token: token});

  // Crea una instancia del cliente de Google Calendar utilizando OAuth2 para la autenticación
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  console.log("dato recibido:",datos.email);
  // Define los detalles del evento
  const event = {
    'summary': datos.summary,
    'location': datos.location, // 'Santiago, Chile' Cambia la ubicación según sea necesario
    'description': datos.description,
    'start': {
      'dateTime': '2024-05-13T14:00:00', // Cambia la fecha y hora según sea necesario
      'timeZone': 'America/Santiago',
    },
    'end': {
      'dateTime': '2024-05-13T15:00:00', // Cambia la fecha y hora según sea necesario
      'timeZone': 'America/Santiago',
    },
    'attendees': [{'email': datos.email}], // ! Modificar esto a un array de correos
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
  console.log("Evento creado:", event);

  try {
    // Inserta el evento en el calendario
    const response = await calendar.events.insert({
      calendarId: 'primary', // Usa 'primary' para el calendario principal del usuario
      resource: event,
    });

    return response.data; // Devuelve los datos del evento creado
  } catch (error) {
    console.log('Hubo un error al contactar el servicio de Calendario: ' + error);
    throw error; // Re-lanza el error para que pueda ser manejado por el llamador
  }
}
