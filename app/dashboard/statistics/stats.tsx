'use client';

import { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface Appointment {
  id: string;
  service: string;
  price: number;
  date: string;
}

export default function StatsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  if (isLoading) {
    return <div className="text-center text-pink-600 dark:text-purple-400">Cargando estadísticas...</div>;
  }

  // Datos para el gráfico de barras (ingresos por servicio)
  const services = Array.from(new Set(appointments.map((a) => a.service)));
  const barData = {
    labels: services,
    datasets: [
      {
        label: 'Ingresos por servicio',
        data: services.map((service) =>
          appointments
            .filter((a) => a.service === service)
            .reduce((sum, a) => sum + a.price, 0)
        ),
        backgroundColor: 'rgba(236, 72, 153, 0.7)', // Rosa
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de pastel (distribución de servicios)
  const pieData = {
    labels: services,
    datasets: [
      {
        label: 'Distribución de servicios',
        data: services.map((service) =>
          appointments.filter((a) => a.service === service).length
        ),
        backgroundColor: [
          'rgba(236, 72, 153, 0.7)', // Rosa
          'rgba(168, 85, 247, 0.7)', // Púrpura
          'rgba(59, 130, 246, 0.7)', // Azul
          'rgba(34, 197, 94, 0.7)', // Verde
        ],
        borderColor: [
          'rgba(236, 72, 153, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de líneas (ingresos por fecha)
  const dates = Array.from(new Set(appointments.map((a) => a.date))).sort();
  const lineData = {
    labels: dates,
    datasets: [
      {
        label: 'Ingresos por fecha',
        data: dates.map((date) =>
          appointments
            .filter((a) => a.date === date)
            .reduce((sum, a) => sum + a.price, 0)
        ),
        borderColor: 'rgba(168, 85, 247, 1)', // Púrpura
        backgroundColor: 'rgba(168, 85, 247, 0.3)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Gráfico de barras */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-pink-600 dark:text-purple-400 mb-4">
          Ingresos por servicio
        </h2>
        <Bar data={barData} />
      </div>

      {/* Gráfico de pastel */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-pink-600 dark:text-purple-400 mb-4">
          Distribución de servicios
        </h2>
        <Pie data={pieData} />
      </div>

      {/* Gráfico de líneas */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md md:col-span-2">
        <h2 className="text-lg font-semibold text-pink-600 dark:text-purple-400 mb-4">
          Ingresos por fecha
        </h2>
        <Line data={lineData} />
      </div>
    </div>
  );
}