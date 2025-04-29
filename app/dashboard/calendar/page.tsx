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
  es: es,
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
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Error al cargar los eventos');
        }
        const data = await response.json();

        // Formatear los datos de la API
        const formattedEvents: CalendarEvent[] = data.map((appointment: any) => ({
          title: `${appointment.service} - ${appointment.customer_name}`,
          start: new Date(`${appointment.date}T${appointment.time}`),
          end: new Date(new Date(`${appointment.date}T${appointment.time}`).getTime() + 60 * 60 * 1000),
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Calendario de Citas
      </h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={(event) => event.start} // Función para acceder a "start"
        endAccessor={(event) => event.end} // Función para acceder a "end"
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
        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-md"
      />
    </div>
  );
}