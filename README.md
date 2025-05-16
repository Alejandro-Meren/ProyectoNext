# ProyectoNext

## Descripción

ProyectoNext es una aplicación de gestión de citas para un salón de peluquería, desarrollada con **Next.js** (App Router), **React**, y **PostgreSQL**. Permite a los usuarios (clientes y administradores) gestionar citas, servicios y clientes de forma sencilla y visual.

## Características

- **Gestión de citas:** Crear, editar y eliminar citas.
- **Panel de administración:** Solo accesible para usuarios con rol de administrador.
- **Gestión de clientes y servicios:** Visualización y selección de clientes y servicios.
- **Validación de disponibilidad:** No permite reservar la misma fecha y hora para el mismo servicio.
- **Interfaz responsive:** Adaptada para escritorio y dispositivos móviles.
- **Soporte para modo oscuro.**

## Tecnologías utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [TypeScript](https://www.typescriptlang.org/)

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tuusuario/ProyectoNext.git
   cd ProyectoNext/nextjs-dashboard
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   - Crea un archivo `.env.local` y añade la configuración de tu base de datos PostgreSQL.

4. **Ejecuta la aplicación en desarrollo:**
   ```bash
   npm run dev
   ```

5. **Accede a la app:**
   - Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del proyecto

- `/app` - Componentes y páginas principales de la aplicación.
- `/pages/api` - Endpoints API para citas, clientes y servicios.
- `/ui` - Componentes de interfaz de usuario reutilizables.
- `/public` - Recursos estáticos (imágenes, iconos, etc).

## Notas

- El acceso a ciertas rutas está protegido según el rol del usuario.
- El sistema de validación de citas evita solapamientos de fecha y hora.
- Puedes personalizar los servicios y clientes desde la base de datos.

## Autor

- [Tu Nombre]  
- 2º DAW SEMI - DWEC

---

> Proyecto realizado como práctica de Next.js y gestión de bases de datos en el ciclo de Desarrollo de Aplicaciones Web.