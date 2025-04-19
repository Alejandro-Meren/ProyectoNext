'use client';

import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';

// Define el tipo de los eventos
type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

const locales = {
  es: es, // Usa la exportación nombrada
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/appointments', {
          headers: {
            'Cache-Control': 'no-cache', // Evita respuestas en caché
          },
        });
        if (!response.ok) {
          throw new Error('Error al cargar los eventos');
        }
        const data = await response.json();

        // Convertir los datos de la API al formato del calendario
        const formattedEvents = data.map((appointment: any) => ({
          title: `${appointment.service} - ${appointment.customer_name}`,
          start: new Date(`${appointment.date}T${appointment.time}`), // Combina fecha y hora
          end: new Date(new Date(`${appointment.date}T${appointment.time}`).getTime() + 60 * 60 * 1000), // Duración de 1 hora
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      }
    }

    fetchEvents();
  }, []);

  // Componente personalizado para mostrar el tooltip al pasar el ratón
  const EventTooltip = ({ event }: { event: CalendarEvent }) => (
    <span className="tooltip">
      {event.title}
    </span>
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Calendario de Citas
      </h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start" // Usa la propiedad "start" del evento
        endAccessor="end" // Usa la propiedad "end" del evento
        style={{ height: 500 }}
        messages={{
          next: 'Siguiente',
          previous: 'Anterior',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
        }}
        components={{
          event: EventTooltip, // Personaliza los eventos con el tooltip
        }}
        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-md"
      />
    </div>
  );
}