'use client';

import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../calendar/calendar.css'; // Importa los estilos personalizados
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale'; // Importa el idioma español

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

interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export default function CustomBigCalendar() {
  const [events, setEvents] = useState<Appointment[]>([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch('/api/appointments', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();

        // Formatear las citas para el calendario
        const formattedEvents = data.map((appointment: any) => ({
          id: appointment.id,
          title: appointment.service,
          start: new Date(appointment.date + 'T' + appointment.time), // Convertir a objeto Date
          end: new Date(new Date(appointment.date + 'T' + appointment.time).getTime() + 60 * 60 * 1000), // Agregar 1 hora de duración
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }

    fetchAppointments();
  }, []);

  return (
    <div className="p-auto sm:p-6 md:p-8 bg-gradient-to-b from-pink-50 via-pink-100 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-lg shadow-lg max-w-full overflow-x-hidden">
      <h2 className="mb-4 text-xl sm:text-2xl md:text-3xl text-pink-600 dark:text-purple-400 text-center" style={{ fontFamily: 'Times New Roman, serif' }}>
        Calendario de Citas
      </h2>
  
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md max-w-full overflow-x-auto">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor={(event) => (event as Appointment).start}
          endAccessor={(event) => (event as Appointment).end}
          style={{ height: '60vh', minHeight: '400px' }}
          className="text-gray-900 dark:text-gray-200"
          messages={{
            next: 'Siguiente',
            previous: 'Anterior',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
            noEventsInRange: 'No hay eventos en este rango.',
          }}
        />
      </div>
    </div>
  );
}