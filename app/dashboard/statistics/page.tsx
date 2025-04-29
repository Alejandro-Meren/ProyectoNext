// 'use client';

// import { useState, useEffect } from 'react';
// import { Bar, Pie, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// export default function StatisticsPage() {
//   const [customersData, setCustomersData] = useState(0);
//   const [appointmentsData, setAppointmentsData] = useState({
//     usersByMonth: [] as { month: string; total: number }[],
//     servicesCount: [] as { name: string; count: number }[],
//     appointmentsByMonth: [] as { month: string; total: number }[],
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const customersRes = await fetch('/api/customers', {
//           headers: {
//             'Cache-Control': 'no-cache',
//           },
//         });
//         const appointmentsRes = await fetch('/api/appointments', {
//           headers: {
//             'Cache-Control': 'no-cache',
//           },
//         });
//         const servicesRes = await fetch('/api/services', {
//           headers: {
//             'Cache-Control': 'no-cache',
//           },
//         });

//         const customers = await customersRes.json();
//         const appointments = await appointmentsRes.json();
//         const services = await servicesRes.json();

//         const usersByMonth = customers.reduce<Record<string, number>>((acc, customer) => {
//           const month = new Date(customer.createdAt).toLocaleString('es-ES', { month: 'long' });
//           acc[month] = (acc[month] || 0) + 1;
//           return acc;
//         }, {});

//         const servicesCount = services.reduce<Record<string, number>>((acc, service) => {
//           acc[service.service] = (acc[service.service] || 0) + 1;
//           return acc;
//         }, {});

//         const appointmentsByMonth = appointments.reduce<Record<string, number>>((acc, appointment) => {
//           const month = new Date(appointment.date).toLocaleString('es-ES', { month: 'long' });
//           acc[month] = (acc[month] || 0) + 1;
//           return acc;
//         }, {});

//         setCustomersData(customers.length);
//         setAppointmentsData({
//           usersByMonth: Object.entries(usersByMonth).map(([month, total]) => ({ month, total })),
//           servicesCount: Object.entries(servicesCount).map(([name, count]) => ({ name, count })),
//           appointmentsByMonth: Object.entries(appointmentsByMonth).map(([month, total]) => ({
//             month,
//             total,
//           })),
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Cargando estadísticas...</p>
//       </div>
//     );
//   }

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         labels: {
//           color: 'var(--text-color)', // Se adapta al modo oscuro/claro
//           font: {
//             size: 14,
//             family: 'Arial, sans-serif',
//           },
//         },
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Estadísticas',
//         color: 'var(--text-color)', // Se adapta al modo oscuro/claro
//         font: {
//           size: 18,
//           family: 'Arial, sans-serif',
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: 'rgba(200, 200, 200, 0.2)', // Líneas de cuadrícula suaves
//         },
//         ticks: {
//           color: 'var(--text-color)', // Se adapta al modo oscuro/claro
//           font: {
//             size: 12,
//             family: 'Arial, sans-serif',
//           },
//         },
//       },
//       y: {
//         grid: {
//           color: 'rgba(200, 200, 200, 0.2)', // Líneas de cuadrícula suaves
//         },
//         ticks: {
//           color: 'var(--text-color)', // Se adapta al modo oscuro/claro
//           font: {
//             size: 12,
//             family: 'Arial, sans-serif',
//           },
//         },
//       },
//     },
//   };

//   const barData = {
//     labels: appointmentsData.usersByMonth.map((item) => item.month),
//     datasets: [
//       {
//         label: 'Usuarios Registrados',
//         data: appointmentsData.usersByMonth.map((item) => item.total),
//         backgroundColor: 'rgba(75, 192, 192, 0.7)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 2,
//         hoverBackgroundColor: 'rgba(75, 192, 192, 0.9)',
//       },
//     ],
//   };

//   const pieData = {
//     labels: appointmentsData.servicesCount.map((item) => item.name),
//     datasets: [
//       {
//         label: 'Servicios',
//         data: appointmentsData.servicesCount.map((item) => item.count),
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.7)',
//           'rgba(54, 162, 235, 0.7)',
//           'rgba(255, 206, 86, 0.7)',
//           'rgba(75, 192, 192, 0.7)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//         ],
//         borderWidth: 2,
//         hoverOffset: 10,
//       },
//     ],
//   };

//   const lineData = {
//     labels: appointmentsData.appointmentsByMonth.map((item) => item.month),
//     datasets: [
//       {
//         label: 'Citas por Mes',
//         data: appointmentsData.appointmentsByMonth.map((item) => item.total),
//         borderColor: 'rgba(153, 102, 255, 1)',
//         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//         borderWidth: 2,
//         pointBackgroundColor: 'rgba(153, 102, 255, 1)',
//         pointBorderColor: '#fff',
//         pointHoverBackgroundColor: '#fff',
//         pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
//         tension: 0.4,
//       },
//     ],
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
//         Estadísticas de la Peluquería
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//           <Bar data={barData} options={chartOptions} />
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//           <Pie data={pieData} options={chartOptions} />
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//           <Line data={lineData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }