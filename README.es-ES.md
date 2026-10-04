

<div align="center">

# 🎯 Portal de Empleos

### Una Plataforma Moderna de Gestión de Empleos Full-Stack

*Conectando buscadores de empleo con oportunidades • Empoderando a empleadores con herramientas*

---

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5.1-000000.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19-47A248.svg)](https://mongodb.com/)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintained](https://img.shields.io/badge/Maintained-Yes-brightgreen.svg)](https://github.com/Abhay-0103/Job-Portal-Project/graphs/commit-activity)

[Funcionalidades](#-funcionalidades) • [Instalación](#-instalación) • [Documentación](#-documentacion-de-la-api) • [Contribución](#-contribucion)

</div>

---

## 🚀 Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/Abhay-0103/Job-Portal-Project.git
cd Job-Portal-Project

# Configuración del Backend
cd backend
npm install
# Configurar el archivo .env (ver sección de Instalación)
npm run dev

# Configuración del Frontend (nueva terminal)
cd frontend
npm install
npm run dev

# Acceder a la aplicación en http://localhost:5173
```

**Requisitos previos:** Node.js v14+, MongoDB, npm v6+

---

## 📋 Tabla de Contenidos

- [Descripción general](#-descripcion-general)
  - [Objetivos del proyecto](#-objetivos-del-proyecto)
  - [Usuarios objetivo](#-usuarios-objetivo)
- [Funcionalidades](#-funcionalidades)
  - [Para buscadores de empleo](#para-buscadores-de-empleo-)
  - [Para empleadores](#para-empleadores-)
  - [Funcionalidades comunes](#funcionalidades-comunes-)
- [Tecnologías](#-tecnologias)
  - [Backend](#backend-)
  - [Frontend](#frontend-)
  - [Arquitectura y patrones de diseño](#arquitectura--patrones-de-diseno-)
- [Estructura del proyecto](#-estructura-del-proyecto)
  - [Resumen del número de archivos](#-resumen-del-numero-de-archivos)
- [Desglose de funcionalidades principales](#-desglose-de-funcionalidades-principales)
- [Dependencias](#-dependencias)
- [Sistema de diseño](#-sistema-de-diseno)
- [Optimizaciones de rendimiento](#-optimizaciones-de-rendimiento)
- [Funcionalidades de seguridad](#-funcionalidades-de-seguridad)
- [Instalación](#-instalacion)
  - [Requisitos previos](#requisitos-previos)
  - [Guía paso a paso](#-paso-1-clonar-el-repositorio)
- [Variables de entorno](#-variables-de-entorno)
- [Uso](#-uso)
  - [Modo de desarrollo](#modo-de-desarrollo)
  - [Compilación para producción](#compilacion-para-produccion)
  - [Scripts disponibles](#scripts-disponibles)
- [Documentación de la API](#-documentacion-de-la-api)
  - [Endpoints de autenticación](#endpoints-de-autenticacion)
  - [Endpoints de empleos](#endpoints-de-empleos)
  - [Endpoints de solicitudes](#endpoints-de-solicitudes)
  - [Endpoints de usuario](#endpoints-de-usuario)
- [Guía de despliegue](#-guia-de-despliegue)
- [Pruebas](#-guia-de-pruebas)
- [Soporte de navegadores](#-soporte-de-navegadores)
- [Solución de problemas](#-solucion-de-problemas)
- [Mejoras futuras](#-mejoras-futuras)
- [Preguntas frecuentes](#-faq-preguntas-frecuentes)
- [Recursos adicionales](#-recursos-adicionales)
- [Contribución](#-contribucion)
- [Autor](#-autor)
- [Licencia](#-licencia)
- [Agradecimientos](#-agradecimientos)
- [Soporte y contacto](#-soporte-y-contacto)
- [Estado del proyecto y hoja de ruta](#-estado-del-proyecto-y-hoja-de-ruta)

---

## 🌟 Descripción general

**Job Portal** es una aplicación full-stack MERN (MongoDB, Express, React, Node.js) integral diseñada para revolucionar el proceso de búsqueda de empleo y reclutamiento. Desarrollada como parte del proyecto del BTI College, esta plataforma conecta sin problemas a los buscadores de empleo con los empleadores, ofreciendo una interfaz intuitiva y potentes características para las necesidades modernas de contratación.

### 🎯 Objetivos del proyecto

- Crear una plataforma fácil de usar para que los buscadores de empleo encuentren y postulen a trabajos
- Proporcionar a los empleadores herramientas eficientes para gestionar publicaciones de empleos y candidatos
- Implementar autenticación segura y control de acceso basado en roles
- Construir una base de código escalable y mantenible siguiendo las mejores prácticas de la industria
- Entregar una interfaz de usuario moderna y responsiva que funcione en todos los dispositivos

### 👥 Usuarios objetivo

1. **Buscadores de empleo** - Personas que buscan oportunidades laborales
2. **Empleadores** - Empresas y reclutadores que publican vacantes
3. **Administradores** - Gestores de la plataforma (mejora futura)

### Aspectos destacados

- 🔐 **Autenticación segura** - Autenticación basada en JWT con cifrado de contraseñas mediante bcrypt
- 📊 **Panel de análisis** - Información y métricas en tiempo real para empleadores
- 💼 **Gestión de empleos** - Operaciones CRUD completas para publicaciones de trabajos con control de estado
- 📝 **Seguimiento de solicitudes** - Sistema integral de gestión de postulación
- ⭐ **Guardar empleos** - Marcar y organizar oportunidades laborales favoritas
- 👤 **Gestión de perfiles** - Perfiles de usuario enriquecidos con soporte para carga de imágenes
- 🎨 **UI/UX moderna** - Construida con TailwindCSS y animaciones de Framer Motion
- 📱 **Diseño responsivo** - Enfoque mobile-first para todos los dispositivos
- 🚀 **Notificaciones en tiempo real** - Notificaciones tipo toast para acciones del usuario
- 🔍 **Búsqueda avanzada** - Filtrar empleos por título, ubicación, tipo y más

---

## ✨ Funcionalidades

### Para buscadores de empleo 👨‍💼

#### Descubrimiento y postulación a empleos
- 🔍 **Búsqueda inteligente** - Buscar empleos por título, palabras clave, ubicación y empresa
- 🎯 **Filtros avanzados** - Filtrar por tipo de empleo (Tiempo completo, Medio tiempo, Contrato, Pasantía)
- 📋 **Detalles del empleo** - Ver descripciones, requisitos y salario completos
- 📄 **Postulación fácil** - Enviar solicitudes con carga de currículum y carta de presentación
- 📊 **Seguimiento de solicitudes** - Monitorear todas tus postulaciones y su estado en un solo lugar
- 🔔 **Actualizaciones de estado** - Rastrear el progreso (Aplicado, En revisión, Aceptado, Rechazado)

#### Perfil y preferencias
- ⭐ **Guardar empleos** - Marcar oportunidades favoritas para acceso rápido posterior
- 👤 **Gestión de perfil** - Crear y personalizar tu perfil profesional
- 🖼️ **Foto de perfil** - Cargar y actualizar tu imagen de perfil
- 📝 **Carga de currículum** - Adjuntar tu CV a las postulaciones
- 💼 **Experiencia y habilidades** - Mostrar tus calificaciones y experiencia

#### Experiencia de usuario
- 📱 **Panel responsivo** - Accede a tu panel desde cualquier dispositivo
- 🔔 **Notificaciones Toast** - Obtén retroalimentación instantánea en todas las acciones
- 🎨 **Interfaz moderna** - Diseño limpio e intuitivo para mejor experiencia
- ⚡ **Carga rápida** - Rendimiento optimizado para tiempos de carga rápidos

---

### Para empleadores 🏢

#### Gestión de empleos
- ➕ **Publicar empleos** - Crear listados detallados con descripciones en texto enriquecido
- ✏️ **Editar listados** - Actualizar detalles del empleo en cualquier momento
- 🗑️ **Eliminar empleos** - Remover posiciones obsoletas o cubiertas
- 🔄 **Control de estado** - Alternar publicaciones entre estados abiertos/cerrados
- 📝 **Vista previa** - Previsualizar cómo aparecerá tu publicación a los candidatos
- 🏷️ **Categorizar empleos** - Agregar tipo, ubicación, rango salarial y requisitos

#### Gestión de candidatos
- 👥 **Revisar solicitudes** - Acceder y evaluar todas las postulaciones
- � **Panel de candidatos** - Ver todos los solicitantes en una vista centralizada
- 🎯 **Filtrar candidatos** - Ordenar por fecha, estado o posición
- 📄 **Ver currículums** - Descargar y revisar CVs de solicitantes
- ✅ **Actualizar estado** - Cambiar estado de solicitud (Aplicado, En revisión, Aceptado, Rechazado)
- 👤 **Perfiles de candidatos** - Ver información detallada en modal

#### Análisis e información
- 📈 **Panel de análisis** - Métricas y estadísticas integrales
- 📊 **Métricas clave**:
  - Total de empleos publicados
  - Total de solicitudes recibidas
  - Empleos activos vs cerrados
  - Solicitudes por estado
  - Tendencias recientes de postulaciones
- 📉 **Datos visuales** - Gráficos y estadísticas para mejor comprensión (mejora futura)

#### Perfil de empresa
- 🏢 **Perfil de empresa** - Mostrar tu organización profesionalmente
- �️ **Logo de empresa** - Cargar y mostrar tu logotipo
- 📝 **Acerca de la empresa** - Agregar descripción e información
- 🌐 **Datos de contacto** - Mostrar información de contacto de la empresa

---

### Funcionalidades comunes 🌐

#### Autenticación y seguridad
- 🔐 **Inicio de sesión seguro** - Sistema de autenticación basado en JWT
- 🆕 **Registro de usuario** - Registro fácil con selección de rol (Buscador / Empleador)
- 🔒 **Seguridad de contraseñas** - Cifrado con bcrypt y rondas de sal
- 🚪 **Cerrar sesión** - Terminación segura de sesión
- 🛡️ **Rutas protegidas** - Control de acceso basado en roles para diferentes tipos de usuario

#### Navegación y diseño
- 🧭 **Navegación limpia** - Barra de navegación intuitiva con acceso rápido a funciones clave
- 📱 **Responsivo móvil** - Experiencia fluida en todos los tamaños de pantalla
- 🎯 **Migas de pan** - Seguimiento de navegación fácil (mejora futura)
- 🔍 **Barra de búsqueda** - Función de búsqueda global

#### Características técnicas
- ⚡ **Alto rendimiento** - Optimizado con la herramienta de compilación Vite
- 🎨 **Animaciones suaves** - Framer Motion para interacciones atractivas
- 🔄 **Actualizaciones en tiempo real** - Actualizaciones instantáneas de UI sin recargar
- 💾 **Persistencia de datos** - Gestión de sesión con localStorage
- 🎯 **Manejo de errores** - Mensajes de error integrales y validación

---

## 🛠 Tecnologías

### Backend 🔧

| Tecnología | Versión | Propósito | Documentación |
|------------|---------|-----------|---------------|
| **Node.js** | Última | Entorno de ejecución JavaScript | [Docs](https://nodejs.org/docs/) |
| **Express.js** | 5.1.0 | Marco web rápido y minimalista | [Docs](https://expressjs.com/) |
| **MongoDB** | - | Base de datos documental NoSQL | [Docs](https://docs.mongodb.com/) |
| **Mongoose** | 8.19.2 | Modelado y validación de objetos MongoDB | [Docs](https://mongoosejs.com/) |
| **JWT** | 9.0.2 | Autenticación segura basada en tokens | [Docs](https://jwt.io/) |
| **Bcrypt.js** | 3.0.2 | Cifrado y encriptación de contraseñas | [Docs](https://github.com/dcodeIO/bcrypt.js) |
| **Multer** | 2.0.2 | Carga de archivos multipart/form-data | [Docs](https://github.com/expressjs/multer) |
| **Cors** | 2.8.5 | Compartición de recursos de origen cruzado | [Docs](https://github.com/expressjs/cors) |
| **Dotenv** | 17.2.3 | Cargador de variables de entorno | [Docs](https://github.com/motdotla/dotenv) |
| **Nodemon** | 3.1.10 | Utilidad de reinicio automático en desarrollo | [Docs](https://nodemon.io/) |

### Frontend 💻

| Tecnología | Versión | Propósito | Documentación |
|------------|---------|-----------|---------------|
| **React** | 19.1.1 | Biblioteca de interfaz basada en componentes | [Docs](https://react.dev/) |
| **Vite** | 7.1.7 | Herramienta de compilación frontend de próxima gen | [Docs](https://vitejs.dev/) |
| **TailwindCSS** | 4.1.14 | Marco CSS basado en utilidades | [Docs](https://tailwindcss.com/) |
| **React Router DOM** | 7.7.0 | Enrutamiento declarativo para React | [Docs](https://reactrouter.com/) |
| **Axios** | 1.10.0 | Cliente HTTP basado en promesas | [Docs](https://axios-http.com/) |
| **Framer Motion** | 12.23.24 | Animaciones listas para producción | [Docs](https://www.framer.com/motion/) |
| **Lucide React** | 0.546.0 | Iconos hermosos y consistentes (500+) | [Docs](https://lucide.dev/) |
| **React Hot Toast** | 2.6.0 | Notificaciones toast ligeras | [Docs](https://react-hot-toast.com/) |
| **Moment.js** | 2.30.1 | Analizar, validar y manipular fechas | [Docs](https://momentjs.com/) |
| **ESLint** | 9.36.0 | Herramienta de calidad y linting de código | [Docs](https://eslint.org/) |

### Arquitectura y patrones de diseño 🏗️

| Aspecto | Implementación | Descripción |
|--------|----------------|-------------|
| **Patrón de arquitectura** | MVC (Modelo-Vista-Controlador) | Separa datos, lógica y presentación |
| **Diseño de API** | API RESTful | Métodos HTTP estándar y códigos de estado |
| **Autenticación** | JWT con cookies HTTP-only | Auth segura basada en tokens |
| **Gestión de estado** | React Context API | Estado global para autenticación |
| **Base de datos** | NoSQL (MongoDB) | Esquema flexible basado en documentos |
| **Enfoque de estilo** | CSS basado en utilidades | Clases atómicas de TailwindCSS |
| **Estructura de archivos** | Basada en características | Organizada por funcionalidad |
| **Organización de código** | Componentes modulares | Código reutilizable y mantenible |
| **Comunicación de API** | Axios con interceptores | Solicitudes HTTP centralizadas |
| **Enrutamiento** | Enrutamiento del lado del cliente | React Router DOM |
| **Manejo de formularios** | Componentes controlados | Gestión de estado con React |
| **Manejo de errores** | Try-catch con middleware | Respuestas de error elegantes |

### Herramientas de desarrollo 🛠️

| Herramienta | Propósito |
|------|---------|
| **VS Code** | Editor de código principal |
| **Postman** | Pruebas y documentación de API |
| **MongoDB Compass** | GUI y gestión de base de datos |
| **Git** | Sistema de control de versiones |
| **GitHub** | Repositorio de código y colaboración |
| **Chrome DevTools** | Depuración frontend |
| **React DevTools** | Depuración de componentes |

---

## 📁 Estructura del proyecto

<details>
<summary><strong>Haz clic para expandir la estructura completa</strong></summary>

```
job-portal/
│
├── 📂 backend/                              # Servidor API Backend (Node.js + Express)
│   ├── 📄 .env                              # Variables de entorno (no en repositorio)
│   ├── 📄 .gitignore                        # Reglas de ignorado de Git
│   ├── 📄 package.json                      # Dependencias y scripts del backend
│   ├── 📄 server.js                         # Punto de entrada - configuración del servidor Express
│   │
│   ├── 📂 config/                           # Archivos de configuración
│   │   └── 📄 db.js                         # Conexión y configuración de MongoDB
│   │
│   ├── 📂 controllers/                      # Manejadores de solicitudes y lógica de negocio
│   │   ├── 📄 analyticsController.js        # Gestión de datos y métricas de análisis
│   │   ├── 📄 applicationController.js      # Operaciones CRUD de solicitudes de empleo
│   │   ├── 📄 authController.js             # Registro, inicio de sesión y autenticación
│   │   ├── 📄 jobController.js              # Operaciones CRUD y búsqueda de empleos
│   │   ├── 📄 savedJobController.js         # Funcionalidad de empleos guardados/marcados
│   │   └── 📄 userController.js             # Gestión de perfiles y datos de usuario
│   │
│   ├── 📂 middlewares/                      # Funciones de middleware personalizadas
│   │   ├── 📄 authMiddleware.js             # Verificación de token JWT y protección de rutas
│   │   └── 📄 uploadMiddleware.js           # Configuración de Multer para carga de archivos
│   │
│   ├── 📂 models/                           # Esquemas de base de datos Mongoose
│   │   ├── 📄 Analytics.js                  # Esquema de datos de análisis
│   │   ├── 📄 Application.js                # Esquema de solicitud de empleo con seguimiento de estado
│   │   ├── 📄 Job.js                        # Esquema de publicación de empleo con referencia al empleador
│   │   ├── 📄 SavedJob.js                   # Esquema de empleos guardados con referencia al usuario
│   │   └── 📄 User.js                       # Esquema de cuenta de usuario (buscador/empleador)
│   │
│   ├── 📂 routes/                           # Definiciones de rutas de la API
│   │   ├── 📄 analyticsRoutes.js            # Endpoints GET /api/analytics/*
│   │   ├── 📄 applicationRoutes.js          # Endpoints /api/applications/*
│   │   ├── 📄 authRoutes.js                 # Endpoints POST /api/auth/register, /login
│   │   ├── 📄 jobRoutes.js                  # Endpoints CRUD /api/jobs/*
│   │   ├── 📄 savedJobsRoutes.js            # Endpoints /api/save-jobs/*
│   │   └── 📄 userRoutes.js                 # Endpoints /api/user/profile
│   │
│   └── 📂 uploads/                          # Directorio para archivos cargados por usuarios
│       └── (resumes, images, documents)      # Ubicación de almacenamiento de Multer
│
│
├── 📂 frontend/                             # Aplicación Frontend (React + Vite)
│   ├── 📄 .gitignore                        # Reglas de ignorado para frontend
│   ├── 📄 eslint.config.js                  # Configuración y reglas de ESLint
│   ├── 📄 index.html                        # Punto de entrada HTML con Vite
│   ├── 📄 package.json                      # Dependencias y scripts del frontend
│   ├── 📄 vite.config.js                    # Configuración de compilación y servidor dev de Vite
│   ├── 📄 README.md                         # Documentación específica del frontend
│   │
│   ├── 📂 public/                           # Activos estáticos públicos
│   │   └── (images, icons, fonts)           # Archivos accesibles públicamente
│   │
│   └── 📂 src/                              # Directorio de código fuente
│       ├── 📄 App.jsx                       # Componente raíz con enrutamiento
│       ├── 📄 main.jsx                      # Punto de entrada de React DOM
│       ├── 📄 index.css                     # Estilos globales de TailwindCSS y CSS personalizado
│       │
│       ├── 📂 assets/                       # Activos estáticos (Imágenes, Iconos, Medios)
│       │   └── (logos, banners, icons)       # Imágenes específicas del proyecto
│       │
│       ├── 📂 components/                   # Componentes de UI reutilizables
│       │   ├── 📄 LoadingSpinner.jsx        # Componente de spinner de estado de carga
│       │   ├── 📄 StatusBadge.jsx           # Componente de insignia de estado de solicitud
│       │   │
│       │   ├── 📂 Cards/                    # Componentes de UI basados en tarjetas
│       │   │   ├── 📄 ApplicantDashboardCard.jsx     # Tarjeta de info de candidato para empleador
│       │   │   ├── 📄 ApplicantProfilPreview.jsx     # Modal/vista previa de perfil de candidato
│       │   │   ├── 📄 JobCard.jsx                    # Componente de tarjeta de listado de empleo
│       │   │   ├── 📄 JobDashboardCard.jsx           # Tarjeta de métricas para panel
│       │   │   └── 📄 JobPostingPreview.jsx          # Tarjeta de vista previa de publicación
│       │   │
│       │   ├── 📂 Input/                    # Componentes de entrada de formulario
│       │   │   ├── 📄 InputField.jsx        # Entrada de texto reutilizable con validación
│       │   │   ├── 📄 SalaryRangeSlider.jsx # Componente de deslizador de rango salarial
│       │   │   ├── 📄 SelectField.jsx       # Componente de campo de selección desplegable
│       │   │   └── 📄 TextareaField.jsx     # Componente de entrada de texto multilinea
│       │   │
│       │   └── 📂 layout/                   # Componentes de diseño y estructura
│       │       ├── 📄 DashboardLayout.jsx   # Diseño envoltorio para páginas de panel
│       │       ├── 📄 Navbar.jsx            # Barra de navegación superior con autenticación
│       │       └── 📄 ProfileDropdown.jsx   # Menú desplegable de perfil de usuario
│       │
│       ├── 📂 context/                      # Proveedores de React Context API
│       │   └── 📄 AuthContext.jsx           # Gestión global de estado de autenticación
│       │
│       ├── 📂 pages/                        # Componentes de nivel de página (Rutas)
│       │   │
│       │   ├── 📂 Auth/                     # Páginas de autenticación
│       │   │   ├── 📄 Login.jsx             # Página de inicio de sesión
│       │   │   └── 📄 SignUp.jsx            # Página de registro (selección de rol)
│       │   │
│       │   ├── 📂 Employer/                 # Páginas específicas de empleador
│       │   │   ├── 📄 ApplicationViewer.jsx         # Ver y gestionar candidatos
│       │   │   ├── 📄 EditProfileDetails.jsx        # Editar perfil de empresa/empleador
│       │   │   ├── 📄 EmployerDashboard.jsx         # Panel de análisis del empleador
│       │   │   ├── 📄 EmployerProfilePage.jsx       # Ver página de perfil de empresa
│       │   │   ├── 📄 JobPostingForm.jsx            # Formulario para crear/editar publicación
│       │   │   └── 📄 ManageJobs.jsx                # Página de gestión de listados
│       │   │
│       │   ├── 📂 JobSeeker/                # Páginas específicas de buscador
│       │   │   ├── 📄 JobDetails.jsx                # Página de detalle de empleo individual
│       │   │   ├── 📄 JobSeekerDashboard.jsx        # Panel de búsqueda y exploración
│       │   │   ├── 📄 SavedJobs.jsx                 # Página de empleos guardados
│       │   │   ├── 📄 UserProfile.jsx               # Página de perfil del buscador
│       │   │   │
│       │   │   └── 📂 components/           # Componentes específicos de buscador
│       │   │       ├── 📄 FilterContent.jsx         # Filtros avanzados de búsqueda
│       │   │       └── 📄 SearchHeader.jsx          # Barra de búsqueda con filtros
│       │   │
│       │   └── 📂 LandingPage/              # Página de inicio pública
│       │       ├── 📄 LandindPage.jsx       # Componente principal de landing
│       │       │
│       │       └── 📂 components/           # Secciones de la landing
│       │           ├── 📄 Analytics.jsx     # Sección de estadísticas de la plataforma
│       │           ├── 📄 Features.jsx      # Showcase de características clave
│       │           ├── 📄 Footer.jsx        # Pie de página con enlaces e info
│       │           ├── 📄 Header.jsx        # Cabecera/navegación de la landing
│       │           └── 📄 Hero.jsx          # Sección hero con CTA
│       │
│       ├── 📂 routes/                       # Configuración y protección de rutas
│       │   └── 📄 ProtectedRoute.jsx        # HOC para protección de rutas autenticadas
│       │
│       └── 📂 utils/                        # Funciones de utilidad y auxiliares
│           ├── 📄 apiPaths.js               # Constantes centralizadas de endpoints
│           ├── 📄 axiosInstance.js          # Instancia preconfigurada de Axios con interceptores
│           ├── 📄 data.js                   # Datos estáticos y constantes mock
│           ├── 📄 helper.js                 # Funciones auxiliares comunes (fecha, formato, etc.)
│           └── 📄 uploadImage.js            # Utilidades para carga de imágenes
│
└── 📄 README.md                             # Documentación principal (este archivo)
```

</details>

### 📊 Resumen del número de archivos

| Categoría | Cantidad | Descripción |
|----------|-------|-------------|
| **Controladores Backend** | 6 | Manejadores de lógica de negocio |
| **Modelos Backend** | 5 | Esquemas de base de datos |
| **Rutas Backend** | 6 | Definiciones de endpoints de API |
| **Middlewares Backend** | 2 | Funciones de middleware personalizadas |
| **Páginas Frontend** | 13 | Componentes principales de página |
| **Componentes Frontend** | 18 | Componentes de UI reutilizables |
| **Utilidades Frontend** | 5 | Funciones auxiliares |
| **Archivos de configuración** | 7 | Configs del proyecto y compilación |
| **Total de archivos** | ~62+ | Excluyendo node_modules y uploads |

---

## 🚀 Instalación

### Requisitos previos

Asegúrate de tener lo siguiente instalado en tu sistema:

| Software | Versión | Enlace de descarga |
|----------|---------|---------------|
| **Node.js** | v14.0+ | [nodejs.org](https://nodejs.org/) |
| **npm** | v6.0+ | Incluido con Node.js |
| **MongoDB** | v4.4+ | [mongodb.com](https://www.mongodb.com/try/download/community) |
| **Git** | Última | [git-scm.com](https://git-scm.com/) |

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/Abhay-0103/Job-Portal-Project.git
cd Job-Portal-Project
```

### Paso 2: Configuración del Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar todas las dependencias
npm install

# Crear el archivo .env en el directorio backend
touch .env  # En Windows: type nul > .env
```

**Configura tu archivo `.env`:**

```env
# Configuración del Servidor
PORT=5000
NODE_ENV=development

# Configuración de Base de Datos
MONGODB_URI=mongodb://localhost:27017/job-portal
# O usa MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/job-portal

# Configuración JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_this
JWT_EXPIRE=7d

# Configuración CORS (Opcional)
CORS_ORIGIN=http://localhost:5173
```

```bash
# Iniciar el servidor backend
npm start

# Para desarrollo con reinicio automático
npm run dev
```

✅ **El backend debería estar ejecutándose en** `http://localhost:5000`

### Paso 3: Configuración del Frontend

Abre una **nueva ventana/pestaña de terminal**, luego:

```bash
# Navegar al directorio frontend (desde la raíz)
cd frontend

# Instalar todas las dependencias
npm install

# (Opcional) Crear .env si necesitas una URL de API personalizada
touch .env  # En Windows: type nul > .env
```

**Configura tu archivo `.env` (si es necesario):**

```env
# Configuración de API
VITE_API_URL=http://localhost:5000
```

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

✅ **El frontend debería estar ejecutándose en** `http://localhost:5173`

### Paso 4: Acceder a la aplicación

| Servicio | URL | Descripción |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Aplicación React |
| **API Backend** | http://localhost:5000 | Servidor Express API |
| **Cargas** | http://localhost:5000/uploads | Servidor de archivos estáticos |

### Script de inicio rápido (Opcional)

Crea un archivo `start.sh` (Linux/Mac) o `start.bat` (Windows) en la raíz del proyecto:

**start.sh (Linux/Mac):**
```bash
#!/bin/bash
cd backend && npm install && npm run dev &
cd ../frontend && npm install && npm run dev
```

**start.bat (Windows):**
```batch
@echo off
start cmd /k "cd backend && npm install && npm run dev"
start cmd /k "cd frontend && npm install && npm run dev"
```

---

## 🔐 Variables de entorno

### Backend (.env)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Número de puerto del servidor | `5000` |
| `MONGODB_URI` | Cadena de conexión MongoDB | `mongodb://localhost:27017/job-portal` |
| `JWT_SECRET` | Clave secreta para firmar JWT | `your_secret_key_here` |
| `JWT_EXPIRE` | Tiempo de expiración del token | `7d` (7 días) |
| `NODE_ENV` | Modo de entorno | `development` o `production` |

### Frontend (.env) - Opcional

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL base de la API backend | `http://localhost:5000` |

---

## 💻 Uso

### Modo de desarrollo

#### Servidor Backend

```bash
cd backend

# Iniciar con Node
npm start
# o
node server.js

# Iniciar con Nodemon (reinicio automático)
npm run dev
```

#### Aplicación Frontend

```bash
cd frontend

# Iniciar servidor de desarrollo con recarga caliente
npm run dev

# Ejecutar ESLint
npm run lint
```

### Compilación para producción

#### Backend
```bash
cd backend

# Establecer entorno a producción en .env
# NODE_ENV=production

# Iniciar servidor de producción
npm start
```

#### Frontend
```bash
cd frontend

# Compilar para producción
npm run build

# Previsualizar compilación localmente
npm run preview

# La salida estará en: frontend/dist/
```

### Scripts disponibles

#### Scripts Backend

| Comando | Descripción |
|---------|-------------|
| `npm start` | Iniciar servidor con Node |
| `npm run dev` | Iniciar con Nodemon (reinicio automático) |

#### Scripts Frontend

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor dev de Vite |
| `npm run build` | Compilar para producción |
| `npm run preview` | Previsualizar compilación |
| `npm run lint` | Ejecutar ESLint |

### Puertos por defecto

- **Desarrollo Frontend**: `http://localhost:5173`
- **API Backend**: `http://localhost:5000`
- **MongoDB**: `mongodb://localhost:27017`

---

## 📚 Documentación de la API

### URL Base
```
http://localhost:5000/api
```

### Endpoints de autenticación

#### Registrar nuevo usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "jobSeeker" // o "employer"
}
```

#### Iniciar sesión
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "token": "jwt_token_here",
  "user": { ... }
}
```

#### Obtener usuario actual
```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### Cargar imagen
```http
POST /api/auth/upload-image
Content-Type: multipart/form-data
Authorization: Bearer {token}

Form Data:
  image: [file]

Response: {
  "imageUrl": "http://localhost:5000/uploads/filename.jpg"
}
```

---

### Endpoints de empleos

#### Obtener todos los empleos
```http
GET /api/jobs
Query Parameters:
  - search: string (opcional)
  - location: string (opcional)
  - type: string (opcional)
```

#### Obtener empleos por empleador
```http
GET /api/jobs/get-jobs-employer
Authorization: Bearer {token}
```

#### Obtener empleo por ID
```http
GET /api/jobs/:id
```

#### Crear nuevo empleo (Solo empleador)
```http
POST /api/jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Full Stack Developer",
  "company": "Tech Corp",
  "location": "Remote",
  "type": "Full-time",
  "description": "Job description here",
  "requirements": ["Node.js", "React"],
  "salary": "80000-100000"
}
```

#### Actualizar empleo (Solo empleador)
```http
PUT /api/jobs/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  ...
}
```

#### Eliminar empleo (Solo empleador)
```http
DELETE /api/jobs/:id
Authorization: Bearer {token}
```

#### Alternar estado del empleo (Abierto/Cerrado)
```http
PUT /api/jobs/:id/toggle-close
Authorization: Bearer {token}
```

---

### Endpoints de solicitudes

#### Obtener solicitudes del usuario
```http
GET /api/applications
Authorization: Bearer {token}
```

#### Enviar solicitud
```http
POST /api/applications
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
  jobId: string
  coverLetter: string
  resume: [file]
```

#### Obtener solicitud por ID
```http
GET /api/applications/:id
Authorization: Bearer {token}
```

#### Actualizar estado de solicitud
```http
PUT /api/applications/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "accepted" // o "rejected", "pending"
}
```

---

### Endpoints de empleos guardados

#### Obtener todos los empleos guardados
```http
GET /api/save-jobs
Authorization: Bearer {token}
```

#### Guardar un empleo
```http
POST /api/save-jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "jobId": "job_id_here"
}
```

#### Eliminar empleo guardado
```http
DELETE /api/save-jobs/:id
Authorization: Bearer {token}
```

---

### Endpoints de usuario

#### Obtener perfil de usuario
```http
GET /api/user/profile
Authorization: Bearer {token}
```

#### Actualizar perfil de usuario
```http
PUT /api/user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "bio": "User bio",
  "skills": ["JavaScript", "React"]
}
```

---

### Endpoints de análisis (Solo empleador)

#### Obtener datos de análisis
```http
GET /api/analytics
Authorization: Bearer {token}

Response: {
  "totalJobs": 10,
  "totalApplications": 50,
  "activeJobs": 8,
  "pendingApplications": 20
}
```

---

### Códigos de estado de respuesta

| Código | Descripción |
|-------------|-------------|
| `200` | Éxito |
| `201` | Creado |
| `400` | Solicitud incorrecta |
| `401` | No autorizado |
| `403` | Prohibido |
| `404` | No encontrado |
| `500` | Error interno del servidor |

---

### Autenticación

La mayoría de los endpoints requieren autenticación JWT. Incluye el token en el encabezado Authorization:

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## 🎯 Mejoras futuras

### Hoja de ruta versión 2.0 🚀

#### Funcionalidades de alta prioridad
- [ ] **Notificaciones por correo** - Correos automatizados para actualizaciones y coincidencias
  - Correos de bienvenida para nuevos usuarios
  - Confirmaciones de envío de solicitud
  - Notificaciones de cambio de estado
  - Recomendaciones diarias/semanales

- [ ] **Chat en tiempo real** - Mensajería vía WebSocket entre empleadores y candidatos
  - Funcionalidad uno a uno
  - Historial y notificaciones de mensajes
  - Compartir archivos en el chat
  - Indicadores de estado en línea

- [ ] **Búsqueda y filtros avanzados** - Descubrimiento mejorado
  - Filtros de rango salarial
  - Filtrado por nivel de experiencia
  - Coincidencia basada en habilidades
  - Preferencia de tamaño de empresa
  - Opciones de trabajo remoto

- [ ] **Constructor de currículums** - Herramienta integrada de creación
  - Múltiples opciones de plantilla
  - Función de exportación PDF
  - Auto-completado desde datos del perfil
  - Vista previa antes de descargar

#### Funcionalidades de prioridad media
- [ ] **Integración de entrevistas por video** - Llamadas integradas
  - Programar entrevistas
  - Integración Zoom/Google Meet
  - Grabación (con consentimiento)
  - Recordatorios automatizados

- [ ] **Recomendaciones con IA** - Coincidencia mediante aprendizaje automático
  - Sugerencias personalizadas
  - Análisis de brechas de habilidades
  - Recomendaciones de carrera
  - Predicciones salariales

- [ ] **Programación de entrevistas** - Coordinación automatizada
  - Integración con calendario
  - Gestión de disponibilidad
  - Manejo de zonas horarias
  - Recordatorios automatizados

- [ ] **Aplicación móvil** - Apps nativas
  - Implementación React Native
  - Soporte iOS y Android
  - Notificaciones push
  - Soporte modo fuera de línea

#### Baja prioridad / Futuras
- [ ] **Informes salariales** - Datos y comparaciones del mercado
- [ ] **Reseñas de empresas** - Calificaciones de empleados
- [ ] **Evaluaciones de habilidades** - Retos y pruebas en línea
- [ ] **Sistema de referidos** - Bonificaciones por recomendación
- [ ] **Alertas de empleo** - Notificaciones personalizadas por email/SMS
- [ ] **Panel de análisis V2** - Gráficos avanzados
- [ ] **Soporte multilingüe** - Internacionalización (i18n)
- [ ] **Modo oscuro** - Cambio de tema
- [ ] **Inicio social** - Integración OAuth Google, LinkedIn
- [ ] **Plantillas de solicitud** - Formularios prellenados
- [ ] **Acciones masivas** - Actualización en lote de estados
- [ ] **Exportar datos** - Exportación CSV/PDF
- [ ] **Panel de administración** - Gestión de plataforma
- [ ] **Integración de pagos** - Publicaciones premium
- [ ] **Expiración de empleos** - Cierre automático tras fecha límite

### Funcionalidades solicitadas por la comunidad
- Panel de monitoreo de rendimiento
- Extensión de navegador para búsqueda
- Extensión Chrome para postulación en un clic
- Análisis automatizado de currículums
- Integración de verificación de antecedentes
- API para integraciones de terceros

---

## 🚢 Guía de despliegue

### Desplegando Backend (Node.js + Express)

#### Opción 1: Heroku

1. **Preparar para despliegue**
```bash
# Iniciar sesión en Heroku
heroku login

# Crear nueva app
heroku create your-job-portal-api

# Agregar MongoDB Atlas
# (Configurar MongoDB Atlas y obtener cadena de conexión)

# Establecer variables de entorno
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set NODE_ENV=production
```

2. **Desplegar**
```bash
# Desplegar a Heroku
git push heroku main

# Ver logs
heroku logs --tail
```

#### Opción 2: Railway

1. Conectar repositorio GitHub a Railway
2. Agregar variables de entorno en el panel de Railway
3. Despliegue automático en push a git

#### Opción 3: DigitalOcean / AWS / Azure

1. **Configurar servidor** (Ubuntu 20.04 recomendado)
2. **Instalar dependencias:**
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar MongoDB
# O usar MongoDB Atlas

# Instalar PM2 (Gestor de procesos)
sudo npm install -g pm2
```

3. **Desplegar aplicación:**
```bash
# Clonar repositorio
git clone https://github.com/Abhay-0103/Job-Portal-Project.git
cd Job-Portal-Project/backend

# Instalar dependencias
npm install

# Establecer variables de entorno
nano .env
# Agregar todas las variables de producción

# Iniciar con PM2
pm2 start server.js --name job-portal-api
pm2 save
pm2 startup
```

4. **Configurar Nginx como proxy inverso:**
```bash
sudo apt install nginx

# Configurar Nginx
sudo nano /etc/nginx/sites-available/job-portal

# Agregar configuración:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/job-portal /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

5. **Configurar SSL con Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### Desplegando Frontend (React + Vite)

#### Opción 1: Vercel (Recomendado)

1. **Instalar CLI de Vercel:**
```bash
npm i -g vercel
```

2. **Desplegar:**
```bash
cd frontend
vercel

# Despliegue de producción
vercel --prod
```

3. **Configurar variables de entorno:**
- Agregar `VITE_API_URL` en el panel de Vercel
- Apuntar a la URL de tu backend desplegado

#### Opción 2: Netlify

1. **Compilar el proyecto:**
```bash
cd frontend
npm run build
```

2. **Desplegar:**
- Arrastrar y soltar carpeta `dist` en Netlify
- O conectar repositorio GitHub
- Establecer comando de build: `npm run build`
- Establecer directorio de publicación: `dist`

#### Opción 3: GitHub Pages

1. **Instalar gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Agregar a package.json:**
```json
{
  "homepage": "https://yourusername.github.io/job-portal",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Desplegar:**
```bash
npm run deploy
```

---

### Lista de verificación para producción

#### Backend
- [ ] Establecer `NODE_ENV=production`
- [ ] Usar `JWT_SECRET` robusto
- [ ] Configurar MongoDB Atlas (no local)
- [ ] Habilitar HTTPS/SSL
- [ ] Configurar CORS correctamente
- [ ] Configurar limitación de tasa
- [ ] Agregar helmet.js para encabezados de seguridad
- [ ] Configurar registro (Winston/Morgan)
- [ ] Configurar seguimiento de errores (Sentry)
- [ ] Habilitar compresión GZIP
- [ ] Configurar monitoreo (PM2/New Relic)
- [ ] Copias de seguridad habilitadas
- [ ] Variables de entorno seguras

#### Frontend
- [ ] Actualizar URLs de API a producción
- [ ] Compilar bundle optimizado (`npm run build`)
- [ ] Habilitar HTTPS
- [ ] Agregar Google Analytics (opcional)
- [ ] Probar en múltiples navegadores
- [ ] Optimizar imágenes y activos
- [ ] Configurar CDN (opcional)
- [ ] Configurar límite de errores
- [ ] Agregar meta tags para SEO
- [ ] Probar responsividad móvil

---

## 🧪 Guía de pruebas

### Ejecutar pruebas

```bash
# Pruebas backend (cuando se implementen)
cd backend
npm test

# Pruebas frontend (cuando se implementen)
cd frontend
npm test

# Pruebas E2E (cuando se implementen)
npm run test:e2e
```

### Cobertura de pruebas

| Módulo | Cobertura | Estado |
|--------|----------|--------|
| Autenticación | Manual | ✅ Probado |
| Gestión de empleos | Manual | ✅ Probado |
| Solicitudes | Manual | ✅ Probado |
| Perfiles de usuario | Manual | ✅ Probado |
| Cargas de archivos | Manual | ✅ Probado |
| Pruebas unitarias | 0% | ⏳ Planificado |
| Pruebas de integración | 0% | ⏳ Planificado |
| Pruebas E2E | 0% | ⏳ Planificado |

### Lista de verificación de pruebas manuales

#### Autenticación y autorización
- [x] El usuario puede registrarse como Buscador
- [x] El usuario puede registrarse como Empleador
- [x] El usuario puede iniciar sesión con credenciales válidas
- [x] El usuario no puede iniciar sesión con credenciales inválidas
- [x] El token JWT se guarda y persiste
- [x] El usuario puede cerrar sesión exitosamente
- [x] Las rutas protegidas redirigen al login
- [x] El acceso basado en roles funciona correctamente

#### Flujos de buscador
- [x] Puede explorar todos los empleos
- [x] Puede buscar por palabras clave
- [x] Puede filtrar por tipo/ubicación
- [x] Puede ver detalles del empleo
- [x] Puede postular con currículum
- [x] Puede guardar/desguardar empleos
- [x] Puede ver empleos guardados
- [x] Puede rastrear estado de solicitud
- [x] Puede actualizar perfil
- [x] Puede cargar foto de perfil

#### Flujos de empleador
- [x] Puede publicar nuevos empleos
- [x] Puede editar empleos existentes
- [x] Puede eliminar empleos
- [x] Puede alternar estado abierto/cerrado
- [x] Puede ver todos los publicados
- [x] Puede ver candidatos por empleo
- [x] Puede descargar currículums
- [x] Puede actualizar estado de solicitud
- [x] Puede ver panel de análisis
- [x] Puede actualizar perfil de empresa

#### Pruebas UI/UX
- [x] Responsivo en móviles
- [x] Responsivo en tablets
- [x] Funciona en navegadores desktop
- [x] Aparecen notificaciones toast
- [x] Estados de carga se muestran correctamente
- [x] Mensajes de error son claros
- [x] Formularios validan correctamente
- [x] Navegación es intuitiva

---

## 🔧 Solución de problemas

### Problemas comunes y soluciones

<details>
<summary><strong>El backend no inicia - Puerto ya en uso</strong></summary>

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solución:**
```bash
# Windows - Encontrar y matar proceso
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac - Encontrar y matar proceso
lsof -ti:5000 | xargs kill -9

# O cambiar puerto en .env
PORT=5001
```
</details>

<details>
<summary><strong>Conexión a MongoDB fallida</strong></summary>

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`

**Soluciones:**
1. **Verificar si MongoDB está corriendo:**
   ```bash
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl start mongod
   
   # Mac
   brew services start mongodb-community
   ```

2. **Verificar cadena de conexión en .env:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/job-portal
   ```

3. **Verificar estado de MongoDB:**
   ```bash
   # Linux/Mac
   sudo systemctl status mongod
   ```

4. **Usar MongoDB Atlas** si la conexión local falla
</details>

<details>
<summary><strong>Token JWT no persiste</strong></summary>

**Problema:** El usuario se desconecta al recargar la página

**Soluciones:**
1. Verificar si el token se guarda en localStorage en `AuthContext.jsx`
2. Verificar que los interceptores de axios estén configurados
3. Borrar caché y cookies del navegador
4. Revisar consola del navegador por errores
</details>

<details>
<summary><strong>Carga de archivos no funciona</strong></summary>

**Error:** La carga devuelve error 500

**Soluciones:**
1. Verificar que el directorio `uploads` exista en backend
2. Verificar límites de tamaño en uploadMiddleware.js
3. Verificar validación de tipo de archivo
4. Asegurar encabezados multipart/form-data correctos
</details>

<details>
<summary><strong>Errores de CORS en navegador</strong></summary>

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Soluciones:**
1. **Verificar configuración CORS en server.js:**
   ```javascript
   app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
   }));
   ```

2. **Verificar CORS_ORIGIN en .env:**
   ```env
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Asegurar que la URL del frontend coincida con el origen permitido**
</details>

<details>
<summary><strong>Imágenes no se muestran</strong></summary>

**Problema:** Las imágenes cargadas muestran enlace roto

**Soluciones:**
1. Verificar que uploads sirva como estático:
   ```javascript
   app.use('/uploads', express.static('uploads'));
   ```

2. Verificar formato de URL en base de datos
3. Verificar permisos de directorio uploads
4. Revisar pestaña de red por errores 404
</details>

<details>
<summary><strong>npm install falla</strong></summary>

**Error:** `npm ERR! code ERESOLVE`

**Soluciones:**
```bash
# Limpiar caché npm
npm cache clean --force

# Eliminar package-lock.json y node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# O usar legacy peer deps
npm install --legacy-peer-deps
```
</details>

<details>
<summary><strong>Compilación Vite falla</strong></summary>

**Error:** `Build failed with errors`

**Soluciones:**
1. Verificar errores TypeScript/ESLint
2. Actualizar dependencias:
   ```bash
   npm update
   ```
3. Limpiar caché Vite:
   ```bash
   rm -rf node_modules/.vite
   ```
4. Recompilar:
   ```bash
   npm run build
   ```
</details>

---

## 📈 Consejos de optimización de rendimiento

### Optimización Backend
- Habilitar middleware de compresión
- Implementar índices en base de datos
- Usar pooling de conexiones
- Cachear datos de acceso frecuente
- Optimizar consultas a BD
- Usar modo clúster de PM2

### Optimización Frontend
- División de código con React.lazy()
- Optimización de imágenes y lazy loading
- Implementar service workers
- Usar React.memo() para componentes costosos
- Optimizar tamaño de bundle con tree shaking
- Habilitar compresión Gzip

---

## 📞 FAQ (Preguntas frecuentes)

**P: ¿Puedo usar este proyecto con fines comerciales?**
R: Sí, este proyecto es de código abierto bajo licencia ISC.

**P: ¿Cómo añado más roles de usuario?**
R: Modifica el modelo User en `backend/models/User.js` y agrega lógica basada en roles en los controladores.

**P: ¿Puedo personalizar el diseño UI?**
R: ¡Absolutamente! Todo el estilo está en TailwindCSS - modifica las clases o actualiza `index.css`.

**P: ¿Cómo añado notificaciones por correo?**
R: Integra nodemailer en el backend y crea plantillas de correo.

**P: ¿Es apto para producción?**
R: Las funciones principales son estables. Agrega mejoras de seguridad (limitación de tasa, helmet.js) para producción.

**P: ¿Puedo contribuir a este proyecto?**
R: ¡Sí! Lee la sección de Contribución y envía PRs.

---

---

## 🐛 Problemas conocidos

- Ninguno por el momento. Reporta problemas [aquí](https://github.com/Abhay-0103/Job-Portal-Project/issues)

---

## 🤝 Contribución

¡Agradecemos las contribuciones de la comunidad! Aquí hay cómo puedes ayudar:

### Cómo contribuir

1. **Haz fork del repositorio**
   ```bash
   # Haz clic en el botón 'Fork' en GitHub
   ```

2. **Clona tu fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Job-Portal-Project.git
   cd Job-Portal-Project
   ```

3. **Crea una rama de función**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Haz tus cambios y commitea**
   ```bash
   git add .
   git commit -m 'Add: AmazingFeature description'
   ```

5. **Push a tu fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Abre un Pull Request**
   - Ve al repositorio original
   - Haz clic en "New Pull Request"
   - Selecciona tu fork y rama
   - Describe tus cambios
   - Envía el PR

### Lineamientos de contribución

- ✅ Sigue el estilo y convenciones de código existentes
- ✅ Escribe mensajes de commit claros y descriptivos (usa [Conventional Commits](https://www.conventionalcommits.org/))
- ✅ Prueba tus cambios exhaustivamente antes de enviar
- ✅ Actualiza la documentación para nuevas funciones
- ✅ Agrega comentarios para lógica compleja
- ✅ Mantén los PR enfocados en una sola función/arreglo
- ✅ Sé respetuoso y constructivo en las discusiones

### Formato de mensajes de commit

```
Tipo: Breve descripción

Ejemplos:
- Add: User authentication feature
- Fix: Job application submission bug
- Update: TailwindCSS to version 4.1
- Refactor: Job controller logic
- Docs: API documentation updates
```

---

## 👨‍💻 Autor

<div align="center">

### Abhay Singh

[![GitHub](https://img.shields.io/badge/GitHub-@Abhay--0103-181717?style=for-the-badge&logo=github)](https://github.com/Abhay-0103)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/abhay-singh-16a492329)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail)](ab0321054@gmail.com)

**Repositorio:** [Job-Portal-Project](https://github.com/Abhay-0103/Job-Portal-Project)

</div>

---

## 🔧 Desglose de funcionalidades principales

### Funcionalidades Backend

#### Autenticación y seguridad
- ✅ Autenticación basada en JWT con cookies HTTP-only
- ✅ Cifrado de contraseñas con bcrypt (10 rondas de sal)
- ✅ Rutas protegidas con middleware de autorización
- ✅ Control de acceso basado en roles (Buscador / Empleador)
- ✅ Carga de archivos segura con validación

#### Modelos y relaciones de BD
- **Modelo User**: Autenticación, datos de perfil, gestión de roles
- **Modelo Job**: Publicaciones con referencia al empleador
- **Modelo Application**: Solicitudes con seguimiento de estado
- **Modelo SavedJob**: Empleos marcados con referencia al usuario
- **Modelo Analytics**: Métricas y estadísticas de plataforma

#### Características de la API
- Arquitectura RESTful
- CORS habilitado para solicitudes de origen cruzado
- Middleware de manejo de errores
- Validación de solicitudes
- Soporte de carga de archivos (Multer)
- Pooling de conexión a BD

### Funcionalidades Frontend

#### Componentes UI/UX
- **Diseño responsivo**: Enfoque mobile-first con TailwindCSS
- **Animaciones**: Transiciones suaves con Framer Motion
- **Estados de carga**: Componente spinner para operaciones async
- **Insignias de estado**: Indicadores visuales de solicitud
- **Notificaciones Toast**: Retroalimentación en tiempo real
- **Modales**: Vista previa de perfil, confirmaciones

#### Componentes de página
- **Landing**: Hero, características, análisis, pie
- **Autenticación**: Login, registro con selección de rol
- **Panel Buscador**: Búsqueda, filtros, guardados
- **Panel Empleador**: Análisis, gestión de empleos, candidatos
- **Perfiles**: Perfiles usuario/empresa con carga de imagen
- **Gestión de empleos**: Crear, editar, eliminar, alternar estado

#### Gestión de estado
- React Context API para estado global de auth
- Gestión local con hooks
- Autenticación persistente con localStorage
- Interceptores de Axios para gestión de tokens

---

## 📦 Dependencias

### Dependencias Backend (Producción)

| Paquete | Versión | Propósito |
|---------|---------|---------|
| `express` | ^5.1.0 | Marco web para Node.js |
| `mongoose` | ^8.19.2 | ODM de MongoDB para modelado |
| `jsonwebtoken` | ^9.0.2 | Generación y validación de JWT |
| `bcryptjs` | ^3.0.2 | Cifrado y comparación de contraseñas |
| `cors` | ^2.8.5 | Habilitar CORS para API |
| `dotenv` | ^17.2.3 | Gestión de variables de entorno |
| `multer` | ^2.0.2 | Middleware de carga de archivos |

### Dependencias Backend (Desarrollo)

| Paquete | Versión | Propósito |
|---------|---------|---------|
| `nodemon` | ^3.1.10 | Reinicio automático en cambios |

### Dependencias Frontend (Producción)

| Paquete | Versión | Propósito |
|---------|---------|---------|
| `react` | ^19.1.1 | Biblioteca core de React |
| `react-dom` | ^19.1.1 | Renderizado React DOM |
| `react-router-dom` | ^7.7.0 | Enrutamiento del lado cliente |
| `axios` | ^1.10.0 | Cliente HTTP para API |
| `tailwindcss` | ^4.1.14 | Marco CSS por utilidades |
| `@tailwindcss/vite` | ^4.1.14 | Plugin Vite para Tailwind |
| `framer-motion` | ^12.23.24 | Biblioteca de animaciones |
| `lucide-react` | ^0.546.0 | Biblioteca de iconos (500+) |
| `react-hot-toast` | ^2.6.0 | Sistema de notificaciones |
| `moment` | ^2.30.1 | Manipulación y formato de fechas |

### Dependencias Frontend (Desarrollo)

| Paquete | Versión | Propósito |
|---------|---------|---------|
| `vite` | ^7.1.7 | Herramienta de build y servidor dev |
| `@vitejs/plugin-react` | ^5.0.4 | Plugin Vite para React |
| `eslint` | ^9.36.0 | Linting y calidad de código |
| `eslint-plugin-react-hooks` | ^5.2.0 | Reglas ESLint para hooks |
| `eslint-plugin-react-refresh` | ^0.4.22 | Plugin ESLint para Fast Refresh |
| `@eslint/js` | ^9.36.0 | Config JavaScript ESLint |
| `globals` | ^16.4.0 | Identificadores globales ESLint |
| `@types/react` | ^19.1.16 | Definiciones TypeScript para React |
| `@types/react-dom` | ^19.1.9 | Definiciones TypeScript para React DOM |

---

## 🎨 Sistema de diseño

### Paleta de colores

| Color | Código Hex | Uso |
|-------|----------|-------|
| **Azul Primario** | `#2563EB` | Botones principales, enlaces, acentos |
| **Púrpura Secundario** | `#9333EA` | Degradados, resaltados |
| **Verde Éxito** | `#10B981` | Mensajes de éxito, estado contratado |
| **Amarillo Advertencia** | `#F59E0B` | Pendiente, estado entrevista |
| **Rojo Error** | `#EF4444` | Errores, estado rechazado |
| **Escala de grises** | `#111827` - `#F9FAFB` | Texto, fondos, bordes |

### Tipografía

- **Familia**: Fuentes del sistema (Inter, -apple-system, BlinkMacSystemFont)
- **Encabezados**: Bold, 1.5rem - 2.5rem
- **Texto cuerpo**: Regular, 1rem
- **Texto pequeño**: 0.875rem

### Estilo de componentes

- **Radio de borde**: 0.5rem (rounded-lg)
- **Sombras**: Box-shadows sutiles para elevación
- **Transiciones**: 200-300ms ease-in-out
- **Espaciado**: Sistema incremental de 4px (Tailwind)

---

## 🚀 Optimizaciones de rendimiento

### Backend
- ✅ Índices en BD para campos consultados frecuentemente
- ✅ Pooling de conexiones para MongoDB
- ✅ Diseño eficiente de consultas con Mongoose
- ✅ Límites de tamaño en cargas (5MB para imágenes)
- ✅ Compresión GZIP para respuestas

### Frontend
- ✅ División de código con React.lazy()
- ✅ HMR rápido de Vite
- ✅ Bundling optimizado de activos
- ✅ Purga TailwindCSS para CSS más pequeño
- ✅ Optimización y lazy loading de imágenes
- ✅ Memoización con React.memo() donde se necesite

---

## 🔒 Funcionalidades de seguridad

### Medidas implementadas

1. **Seguridad de autenticación**
   - Tokens JWT con expiración (7 días por defecto)
   - Cifrado seguro con bcrypt
   - Cookies HTTP-only (previene XSS)
   - Validación de token en rutas protegidas

2. **Validación de datos**
   - Sanitización de entrada en todos los formularios
   - Validación de tipo de archivo en cargas
   - Límites de tamaño de payload
   - Validación de esquema con Mongoose

3. **Control de acceso**
   - Autorización basada en roles
   - Middleware de protección de rutas
   - Acceso a datos específicos por usuario
   - Endpoints exclusivos para empleadores

4. **Mejores prácticas**
   - Variables de entorno para datos sensibles
   - Configuración CORS para orígenes permitidos
   - Manejo de errores sin exponer internos
   - Actualizaciones regulares de dependencias

### Seguridad adicional recomendada

- [ ] Limitación de tasa en endpoints
- [ ] HTTPS en producción
- [ ] Protección CSRF
- [ ] Encabezados de seguridad (Helmet.js)
- [ ] Librería de sanitización (express-validator)
- [ ] Prevención inyección SQL (ya manejado por Mongoose)

---

## 🧪 Pruebas

### Lista de verificación manual

#### Flujo de autenticación
- [x] Registro (Buscador & Empleador)
- [x] Login con credenciales válidas
- [x] Persistencia de token entre sesiones
- [x] Función de logout
- [x] Acceso a rutas protegidas

#### Funciones buscador
- [x] Explorar con búsqueda/filtros
- [x] Ver detalles
- [x] Postular con carga de CV
- [x] Guardar/desguardar
- [x] Ver estado de solicitud
- [x] Actualizar perfil

#### Funciones empleador
- [x] Publicar nuevos
- [x] Editar existentes
- [x] Eliminar
- [x] Alternar estado
- [x] Ver candidatos
- [x] Actualizar estado
- [x] Ver panel de análisis

### Planes futuros
- [ ] Pruebas unitarias con Jest
- [ ] Pruebas de integración para API
- [ ] Pruebas E2E con Cypress/Playwright
- [ ] Pruebas de rendimiento
- [ ] Pruebas de accesibilidad (WCAG)

---

## 📱 Soporte de navegadores

| Navegador | Versión mínima | Estado |
|---------|----------------|----------------|
| **Chrome** | Últimas 2 versiones | ✅ Completamente soportado |
| **Firefox** | Últimas 2 versiones | ✅ Completamente soportado |
| **Safari** | Últimas 2 versiones | ✅ Completamente soportado |
| **Edge** | Últimas 2 versiones | ✅ Completamente soportado |
| **Opera** | Últimas 2 versiones | ✅ Completamente soportado |
| **Mobile Safari** | iOS 12+ | ✅ Completamente soportado |
| **Chrome Mobile** | Android 8+ | ✅ Completamente soportado |

---

## 📚 Recursos adicionales

### Enlaces de documentación

- 📘 [Documentación MongoDB](https://docs.mongodb.com/)
- 📗 [Guía Express.js](https://expressjs.com/en/guide/routing.html)
- 📙 [Documentación React](https://react.dev/)
- 📕 [Docs TailwindCSS](https://tailwindcss.com/docs)
- 📓 [Guía Vite](https://vitejs.dev/guide/)
- 📔 [Introducción JWT](https://jwt.io/introduction)

### Tutoriales útiles

- [Tutorial Stack MERN](https://www.mongodb.com/languages/mern-stack-tutorial)
- [Tutorial React Router](https://reactrouter.com/en/main/start/tutorial)
- [Guía Mongoose](https://mongoosejs.com/docs/guide.html)
- [Componentes TailwindCSS](https://tailwindui.com/)

---

## 🙏 Agradecimientos

- 🎓 **BTI College** - Por brindar la oportunidad y recursos
- 💻 **Comunidad Open Source** - Por herramientas y librerías increíbles
- 📚 **Equipos de documentación** - React, Express, MongoDB y TailwindCSS
- 🎨 **Inspiración de diseño** - Interfaz moderna de portales de empleo
- 👥 **Colaboradores** - Gracias a todos los que han contribuido
- 🌟 **Iconos** - Librería Lucide React
- 🎭 **Animaciones** - Equipo de Framer Motion

### Construido con

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

</div>

---

## 📞 Soporte y contacto

Si tienes preguntas o necesitas ayuda con el proyecto:

- 📧 **Correo**: [ab0321054@gmail.com](mailto:ab0321054@gmail.com)
- 🐛 **Reportar problemas**: [Issues de GitHub](https://github.com/Abhay-0103/Job-Portal-Project/issues)
- 💬 **Discusiones**: [Discusiones de GitHub](https://github.com/Abhay-0103/Job-Portal-Project/discussions)
- 💼 **LinkedIn**: [Abhay Singh](https://linkedin.com/in/abhay-singh-16a492329)

### Obteniendo ayuda

1. **Revisa la documentación existente** en este README
2. **Busca issues cerrados** por problemas similares
3. **Abre un issue nuevo** con descripción detallada
4. **Proporciona logs de error** y pasos para reproducir

---

## 📊 Estado del proyecto y hoja de ruta

![Development Status](https://img.shields.io/badge/Status-Active%20Development-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-yellow?style=for-the-badge)
![Maintained](https://img.shields.io/badge/Maintained-Yes-brightgreen?style=for-the-badge)

### Versión actual: 1.0.0

**Fecha de lanzamiento**: Noviembre 2025

### Hoja de ruta

#### ✅ Completado (v1.0.0)
- Sistema de autenticación principal
- Publicación y gestión de empleos
- Envío y seguimiento de solicitudes
- Perfiles de usuario con carga de imagen
- Panel de análisis para empleadores
- Funcionalidad de empleos guardados
- Diseño UI responsivo
- Implementación API RESTful

#### 🚧 En progreso (v1.1.0)
- Sistema de notificaciones por correo
- Búsqueda y filtros avanzados
- Optimizaciones de rendimiento
- Análisis mejorados

#### 📋 Planificado (v2.0.0)
- Función de chat en tiempo real
- Integración de entrevistas por video
- Recomendaciones de empleo con IA
- Aplicación móvil (React Native)
- Herramienta constructor de CV
- Reseñas y calificaciones de empresas
- Sistema de programación de entrevistas

---

<div align="center">

### ⭐ ¡Dale estrella a este repositorio si te resulta útil!

### 🔗 Conectar y colaborar

**¡Las solicitudes de extracción son bienvenidas!** Para cambios mayores, por favor abre un issue primero para discutir qué te gustaría cambiar.

---

### 📈 Estadísticas de GitHub

![GitHub stars](https://img.shields.io/github/stars/Abhay-0103/Job-Portal-Project?style=social)
![GitHub forks](https://img.shields.io/github/forks/Abhay-0103/Job-Portal-Project?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Abhay-0103/Job-Portal-Project?style=social)

---

Hecho con ❤️ por [Abhay Singh](https://github.com/Abhay-0103)

**© 2025 Job Portal - Proyecto BTI College. Todos los derechos reservados.**

</div>
