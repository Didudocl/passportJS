
## Información Proyecto

### Descripción de lo que trae un evento

```js
{
  "message": "Eventos encontrados",
  "data": [
    {
      "title": "Reunión Urgente sobre como realizar algo",
      "type": "calendar#event",
      "start": {
        "dateTime": "2024-05-19T09:00:00-04:00",
        "timeZone": "America/Santiago"
      },
      "end": {
        "dateTime": "2024-05-19T10:00:00-04:00",
        "timeZone": "America/Santiago"
      },
      "status": "confirmed",
      "linkEvent": "https://www.google.com/calendar/event?eid=NWgydTlvaDdqcDR2a3Uyczg4c3E3MTkwanQgZGllZ28uc2FsYXphcjIxMDFAYWx1bW5vcy51YmlvYmlvLmNs",
      "creator": {
        "email": "diego.salazar2101@alumnos.ubiobio.cl",
        "self": true
      },
      "organizer": {
        "email": "diego.salazar2101@alumnos.ubiobio.cl",
        "self": true
      },
      "reminder": {
        "useDefault": true // Para saber si se deben usar los recordatorios predeterminados del calendario
      },
      "attendees": [
        {
          "email": "dialsaljar2k18@gmail.com",
          "responseStatus": "accepted" // Para saber si el usuario acepto o no la invitación
        },
        {
          "email": "ojedacasanueva@gmail.com",
          "responseStatus": "needsAction" // Para saber si el usuario acepto o no la invitación, en este caso no ha respondido
        },
        {
          "email": "diego.salazar2101@alumnos.ubiobio.cl",
          "organizer": true,
          "self": true,
          "responseStatus": "accepted"
        }
      ]
    }
  ]
}
```

### Apartados importantes de un evento

- Título del evento ('summary'): Proporciona una descripción breve pero informativa del evento.
- Fecha de inicio ('start'): Indica la fecha y hora en que comienza el evento.
- Fecha de término ('end'): Indica la fecha y hora en que termina el evento.
- Estado del evento ('status'): Indica si el evento está confirmado, pendiente o cancelado.
- Enlace HTML directo al evento en Google Calendar ('htmlLink'): Proporciona un enlace directo al evento en Google Calendar.
- Creador del evento ('creator'): Proporciona información sobre el creador del evento.
- Organizador del evento ('organizer'): Proporciona información sobre el organizador del evento.
- Recordatorios ('reminders'): Indica si se deben usar los recordatorios predeterminados del calendario.
- Asistencia ('attendees'): Proporciona información sobre los asistentes al evento.