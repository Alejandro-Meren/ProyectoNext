'use client';

import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
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

export default function StatisticsPage() {
  const [customersData, setCustomersData] = useState(0); // Número total de clientes
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const customersRes = await fetch('/api/customers');
        const appointmentsRes = await fetch('/api/appointments');
        const servicesRes = await fetch('/api/services');

        const customers = await customersRes.json();
        const appointments = await appointmentsRes.json();
        const services = await servicesRes.json();

        // Procesar datos
        const revenueByMonth = appointments.reduce((acc, appointment) => {
          const month = new Date(appointment.date).toLocaleString('es-ES', { month: 'long' });
          acc[month] = (acc[month] || 0) + parseFloat(appointment.price);
          return acc;
        }, {});

        const servicesCount = services.reduce((acc, service) => {
          acc[service.service] = (acc[service.service] || 0) + 1;
          return acc;
        }, {});

        setCustomersData(customers.length); // Número total de clientes
        setAppointmentsData({
          revenueByMonth: Object.entries(revenueByMonth).map(([month, total]) => ({ month, total })),
          servicesCount: Object.entries(servicesCount).map(([name, count]) => ({ name, count })),
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Cargando estadísticas...</p>
      </div>
    );
  }

  // Opciones para los gráficos
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: 'Estadísticas',
        color: 'white',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const lineData = {
    labels: appointmentsData.revenueByMonth.map((item) => item.month),
    datasets: [
      {
        label: 'Ingresos ($)',
        data: appointmentsData.revenueByMonth.map((item) => item.total),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: appointmentsData.servicesCount.map((item) => item.name),
    datasets: [
      {
        label: 'Servicios',
        data: appointmentsData.servicesCount.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
        Estadísticas de la Peluquería
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Número total de clientes */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Clientes Totales</h2>
          <p className="text-5xl font-bold text-white">{customersData}</p>
        </div>

        {/* Gráfico de líneas */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Ingresos Mensuales</h2>
          <Line data={lineData} options={chartOptions} />
        </div>

        {/* Gráfico de pastel */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Servicios más Solicitados</h2>
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}