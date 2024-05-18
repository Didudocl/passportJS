import { google } from "googleapis";
import { usuarioDoc } from "../passport/passport-setup.js";
import { v4 as uuidv4 } from "uuid";
//! Buscar la optimización y organización de codigo

// Función para obtener los eventos del calendario
export async function getCalendarEvents() {
  const token = usuarioDoc.token;

  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({ access_token: token });

  // Crea una instancia del cliente de Google Calendar utilizando OAuth2 para la autenticación
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // * https://developers.google.com/calendar/api/v3/reference/events/list?hl=es-419#parameters
  
  const params = {
      calendarId: 'primary', // ID del calendario (puede ser 'primary' para el calendario principal del usuario)
      timeMin: "2024-05-03T10:00:00-07:00", // Se debe colocar una fecha como min
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
              linkMeet: event.hangoutLink,
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

  oauth2Client.setCredentials({ access_token: token });

  // Crea una instancia del cliente de Google Calendar utilizando OAuth2 para la autenticación
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const idUnique = uuidv4();

  // Define los detalles del evento
  const event = {
    summary: datos.summary,
    location: datos.location,
    description: datos.description,
    start: {
      dateTime: "2024-05-14T22:35:00",
      timeZone: "America/Santiago",
    },
    end: {
      dateTime: "2024-05-15T23:00:00",
      timeZone: "America/Santiago",
    },
    attendees: [{ email: datos.email }, { email: "ojedacasanueva@gmail.com" }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
    // Incluir información para generar una reunión de Google Meet asociada al evento
    conferenceData: {
      createRequest: {
        requestId: `${idUnique}`, // Utilizar el ID del evento como requestId con template literals
      },
    },
    // Indicar la versión de los datos de la conferencia (Conference Data)
    conferenceDataVersion: 1,
  };

  try {
    // Insertar el evento en el calendario
    const response = await calendar.events.insert({
      calendarId: "primary", // Usa 'primary' para el calendario principal del usuario
      resource: event,
      conferenceDataVersion: 1, // Asegurarse de incluir la versión de los datos de la conferencia aquí también
    });

    return response.data; // Devuelve los datos del evento creado
  } catch (error) {
    console.log(
      "Hubo un error al contactar el servicio de Calendario: " + error
    );
    throw error;
  }
}
