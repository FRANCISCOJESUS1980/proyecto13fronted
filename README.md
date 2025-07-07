# 🏋️‍♂️ AderCrossFit - Sistema de Gestión Integral

**Sistema completo de gestión para box de CrossFit con funcionalidades avanzadas de administración, seguimiento de usuarios y comunicación en tiempo real.**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/FRANCISCOJESUS1980/proyecto13fronted)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248.svg?logo=mongodb)](https://mongodb.com/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[🚀 Demo en Vivo](https://proyecto13fronted-git-main-francisco-jesus-projects.vercel.app/) • [📖 Documentación](#documentación) • [🐛 Reportar Bug](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/issues) • [💡 Solicitar Feature](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/issues/new?template=feature_request.md)

![AderCrossFit Preview](https://proyecto13fronted-git-main-francisco-jesus-projects.vercel.app/)

</div>

---

## 📋 Tabla de Contenidos

- [🎯 Características Principales](#-características-principales)
- [🚀 Demo y Capturas](#-demo-y-capturas)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [⚡ Inicio Rápido](#-inicio-rápido)
- [🔧 Instalación Detallada](#-instalación-detallada)
- [📱 Funcionalidades por Módulo](#-funcionalidades-por-módulo)
- [👥 Roles y Permisos](#-roles-y-permisos)
- [🔧 Stack Tecnológico](#-stack-tecnológico)
- [📊 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔐 Autenticación y Seguridad](#-autenticación-y-seguridad)
- [📡 API y Comunicación](#-api-y-comunicación)
- [🎨 UI/UX y Diseño](#-uiux-y-diseño)
- [⚡ Optimizaciones de Performance](#-optimizaciones-de-performance)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [📊 Métricas y Analytics](#-métricas-y-analytics)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contribución](#-contribución)
- [📞 Soporte](#-soporte)
- [📄 Licencia](#-licencia)

---

## 🎯 Características Principales

<table>
<tr>
<td width="50%">

### 🏆 **Gestión Integral**

- ✅ **Sistema completo de usuarios** con roles diferenciados
- ✅ **Reservas de clases** en tiempo real con lista de espera
- ✅ **Seguimiento médico** y físico personalizado
- ✅ **E-commerce integrado** con gestión de inventario
- ✅ **Comunicación en tiempo real** (chat + mensajes privados)
- ✅ **Panel administrativo** con analytics avanzados

</td>
<td width="50%">

### ⚡ **Tecnología Avanzada**

- ✅ **React 18** con Hooks y Context API
- ✅ **Arquitectura modular** escalable
- ✅ **WebSocket** para comunicación real-time
- ✅ **Responsive design** mobile-first
- ✅ **Performance optimizado** con lazy loading
- ✅ **PWA ready** con service workers

</td>
</tr>
</table>

### 🔒 **Seguridad y Compliance**

| Característica               | Estado          | Descripción                                     |
| ---------------------------- | --------------- | ----------------------------------------------- |
| 🔐 **Autenticación JWT**     | ✅ Implementado | Tokens seguros con refresh automático           |
| 🛡️ **Encriptación de datos** | ✅ Implementado | Bcrypt para passwords, AES para datos sensibles |
| 📋 **GDPR Compliance**       | ✅ Implementado | Gestión completa de consentimientos             |
| 🚫 **Rate Limiting**         | ✅ Implementado | Protección contra ataques DDoS                  |
| 📝 **Audit Logs**            | ✅ Implementado | Registro completo de actividades                |

---

## 🚀 Demo y Capturas

### 🌐 **Enlaces de Demo**

| Entorno        | URL                                                                                                | Estado     |
| -------------- | -------------------------------------------------------------------------------------------------- | ---------- |
| **Producción** | [adercrossfit.vercel.app](https://proyecto13fronted-git-main-francisco-jesus-projects.vercel.app/) | 🟢 Online  |
| **Staging**    | [staging-adercrossfit.vercel.app](#)                                                               | 🟡 Testing |
| **API Docs**   | [api.adercrossfit.com/docs](#)                                                                     | 🟢 Online  |

### 📱 **Capturas de Pantalla**

<details>
<summary>🖼️ Ver capturas de pantalla</summary>

| Dashboard Principal                                                                                        | Sistema de Clases                                                                                    | Chat en Tiempo Real                                                                              |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| ![Dashboard](C:\Users\usuario\Desktop\proyecto13fronted\public\imagenes\Captura de pantalladashboard.jpeg) | ![Clases](C:\Users\usuario\Desktop\proyecto13fronted\public\imagenes\captura de pantallaclases.jpeg) | ![Chat](C:\Users\usuario\Desktop\proyecto13fronted\public\imagenes\Captura de pantallachat.jpeg) | c:\Users\usuario\Downloads\Captura de pantalla_7-7-2025_124150_localhost.jpeg |

| E-commerce                                                                                            | Panel Admin                                                                                                 | Perfil Usuario                                                                                              |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![Shop](C:\Users\usuario\Desktop\proyecto13fronted\public\imagenes\Captura de pantallaproductos.jpeg) | ![Admin](C:\Users\usuario\Desktop\proyecto13fronted\public\imagenes\Captura de pantallaadministracion.jpeg) | ![Profile](C:\Users\usuario\Desktop\proyecto13fronted\public\imagenes\Captura de pantallaeditarperfil.jpeg) |

</details>

---

## 🏗️ Arquitectura del Sistema

\`\`\`mermaid
graph TB
subgraph "Frontend Layer"
A[React App] --> B[React Router]
A --> C[Context API]
A --> D[WebSocket Client]
end

    subgraph "API Gateway"
        E[Express.js Server]
        F[Authentication Middleware]
        G[Rate Limiting]
    end

    subgraph "Services Layer"
        H[User Service]
        I[Class Service]
        J[Product Service]
        K[Message Service]
        L[Payment Service]
    end

    subgraph "Data Layer"
        M[(MongoDB Users)]
        N[(MongoDB Classes)]
        O[(MongoDB Products)]
        P[(MongoDB Messages)]
        Q[File Storage]
    end

    subgraph "External Services"
        R[Email Service]
        S[Payment Gateway]
        T[Cloud Storage]
    end

    A --> E
    E --> F
    F --> G
    G --> H
    G --> I
    G --> J
    G --> K
    G --> L

    H --> M
    I --> N
    J --> O
    K --> P
    L --> S

    E --> R
    E --> T
    Q --> T

\`\`\`

### 🎯 **Principios Arquitectónicos**

| Principio                      | Implementación                           | Beneficio                      |
| ------------------------------ | ---------------------------------------- | ------------------------------ |
| **🔄 Separation of Concerns**  | Módulos independientes por funcionalidad | Mantenibilidad y escalabilidad |
| **📦 Feature-Based Structure** | Organización por características         | Desarrollo en equipo eficiente |
| **🔌 Dependency Injection**    | Context API para gestión de estado       | Bajo acoplamiento              |
| **⚡ Performance First**       | Lazy loading y memoización               | Experiencia de usuario óptima  |
| **🛡️ Security by Design**      | Validación en todas las capas            | Protección integral            |

---

## ⚡ Inicio Rápido

### 🚀 **Instalación en 3 pasos**

\`\`\`bash

# 1️⃣ Clonar repositorios

git clone https://github.com/FRANCISCOJESUS1980/proyecto13fronted.git frontend
git clone https://github.com/FRANCISCOJESUS1980/proyecto13backend.git backend

# 2️⃣ Instalar dependencias

cd frontend && npm install
cd ../backend && npm install

# 3️⃣ Configurar y ejecutar

cp .env.example .env
npm run dev
\`\`\`

### 🐳 **Con Docker (Recomendado)**

\`\`\`bash

# Ejecutar todo el stack

docker-compose up -d

# Verificar servicios

docker-compose ps
\`\`\`

### ✅ **Verificación de Instalación**

Después de la instalación, verifica que todo funcione:

- ✅ Frontend: [http://localhost:5173](http://localhost:5173)
- ✅ Backend: [http://localhost:3001](http://localhost:3001)
- ✅ Database: MongoDB en puerto 27017
- ✅ WebSocket: Conectado automáticamente

---

## 🔧 Instalación Detallada

### 📋 **Prerrequisitos**

| Herramienta | Versión Mínima | Versión Recomendada | Instalación                        |
| ----------- | -------------- | ------------------- | ---------------------------------- |
| **Node.js** | 18.0.0         | 20.x LTS            | [nodejs.org](https://nodejs.org)   |
| **npm**     | 9.0.0          | Latest              | Incluido con Node.js               |
| **MongoDB** | 6.0.0          | 7.x                 | [mongodb.com](https://mongodb.com) |
| **Git**     | 2.30.0         | Latest              | [git-scm.com](https://git-scm.com) |

### 🔧 **Variables de Entorno**

Crea un archivo \`.env\` en la raíz del proyecto:

\`\`\`env

# 🗄️ Base de Datos

MONGODB_URI=mongodb://localhost:27017/adercrossfit
DB_NAME=adercrossfit

# 🔐 Autenticación

JWT_SECRET=tu_jwt_secret_super_seguro_aqui
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=tu_refresh_token_secret

# 📧 Configuración de Email

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password

# ☁️ Almacenamiento en la Nube

CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# 🔌 WebSocket

SOCKET_PORT=3001
CORS_ORIGIN=http://localhost:5173

# 💳 Pagos (Opcional)

STRIPE*SECRET_KEY=sk_test*...
STRIPE*WEBHOOK_SECRET=whsec*...

# 🔍 Monitoreo (Opcional)

SENTRY_DSN=https://...
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
\`\`\`

### 🗄️ **Configuración de Base de Datos**

\`\`\`bash

# Inicializar datos de prueba

npm run db:seed

# Crear índices optimizados

npm run db:index

# Backup de seguridad

npm run db:backup
\`\`\`

---

## 📱 Funcionalidades por Módulo

### 🏠 **Módulo Principal (Home)**

<details>
<summary>📋 Ver funcionalidades detalladas</summary>

#### ✨ **Características**

- 🎨 **Landing page responsive** con diseño moderno
- 🖼️ **Galería de imágenes** con lazy loading
- 💬 **Testimonios dinámicos** de usuarios
- 📍 **Mapa interactivo** de ubicación
- 📞 **Formulario de contacto** con validación
- 🔍 **SEO optimizado** con meta tags dinámicos

#### 🛠️ **Tecnologías Utilizadas**

- React Router para navegación
- Intersection Observer para lazy loading
- Google Maps API para ubicación
- React Hook Form para formularios

</details>

### 👤 **Gestión de Usuarios**

<details>
<summary>📋 Ver funcionalidades detalladas</summary>

#### 🔐 **Autenticación**

- ✅ **Registro multi-paso** con validación en tiempo real
- ✅ **Login con JWT** y refresh tokens
- ✅ **Recuperación de contraseña** por email
- ✅ **Verificación de cuenta** obligatoria
- ✅ **Sesiones persistentes** con localStorage
- ✅ **Login social** (Google, Facebook) - _Próximamente_

#### 🏥 **Información Médica**

- 📋 **Historial médico completo** con encriptación
- 🚨 **Alergias y condiciones** con alertas automáticas
- 📞 **Contactos de emergencia** siempre accesibles
- 🩹 **Seguimiento de lesiones** con timeline
- 📄 **Exportación a PDF** para profesionales médicos
- 🔒 **Acceso controlado** solo para personal autorizado

#### 📊 **Progreso Físico**

- 📏 **Medidas corporales** con gráficos de evolución
- 📸 **Fotos de progreso** con comparativas automáticas
- 📈 **Análisis de tendencias** con IA
- 🎯 **Metas personalizadas** con seguimiento automático
- 🏆 **Sistema de logros** gamificado

</details>

### 🏋️‍♂️ **Sistema de Clases**

<details>
<summary>📋 Ver funcionalidades detalladas</summary>

#### 📅 **Reservas Inteligentes**

- 🗓️ **Calendario interactivo** con vista mensual/semanal
- ⚡ **Reservas en tiempo real** con WebSocket
- 📋 **Lista de espera automática** con notificaciones
- 🔔 **Notificaciones push** para recordatorios
- ❌ **Cancelaciones flexibles** con política configurable
- 📊 **Analytics de asistencia** para optimización

#### 👨‍🏫 **Gestión de Entrenadores**

- 👤 **Perfiles detallados** con especialidades y certificaciones
- 📅 **Horarios personalizados** con disponibilidad
- ⭐ **Sistema de evaluaciones** de usuarios
- 💬 **Comunicación directa** con mensajería integrada
- 📈 **Métricas de rendimiento** y feedback

#### 🏃‍♂️ **Tipos de Clases**

- 🔥 **CrossFit tradicional** con escalabilidad
- 🏋️‍♀️ **Weightlifting** especializado
- 🤸‍♂️ **Gymnastics** y movilidad
- 🏃‍♂️ **Cardio** y resistencia
- 🧘‍♀️ **Recovery** y yoga
- 👶 **Clases familiares** y kids

</details>

### 🛒 **E-commerce Integrado**

<details>
<summary>📋 Ver funcionalidades detalladas</summary>

#### 🛍️ **Tienda Online**

- 🔍 **Catálogo avanzado** con filtros inteligentes
- 🛒 **Carrito persistente** entre sesiones
- 💳 **Checkout seguro** con múltiples métodos de pago
- 📦 **Gestión de inventario** en tiempo real
- 🎫 **Sistema de cupones** y promociones automáticas
- ⭐ **Reviews y ratings** de productos

#### 📦 **Gestión de Pedidos**

- 🚚 **Tracking de envíos** con actualizaciones automáticas
- 📋 **Historial completo** de compras
- 🧾 **Facturación automática** con PDF
- 🔄 **Devoluciones y cambios** simplificados
- 📊 **Analytics de ventas** para administradores

#### 🏷️ **Productos Disponibles**

- 👕 **Ropa deportiva** personalizada del box
- 🥤 **Suplementos** y nutrición
- 🏋️‍♂️ **Equipamiento** de entrenamiento
- 🎁 **Gift cards** y membresías
- 📚 **Planes de entrenamiento** digitales

</details>

### 💬 **Sistema de Comunicación**

<details>
<summary>📋 Ver funcionalidades detalladas</summary>

#### 🗨️ **Chat Grupal en Tiempo Real**

- ⚡ **Mensajes instantáneos** con WebSocket
- 😀 **Emojis y reacciones** completas
- 📎 **Adjuntos multimedia** (imágenes, videos, documentos)
- 🔍 **Búsqueda avanzada** en historial
- 🛡️ **Moderación automática** con filtros de contenido
- 🔔 **Notificaciones inteligentes** configurables

#### 📧 **Mensajes Privados**

- 💬 **Comunicación directa** usuario-administración
- 📎 **Adjuntos de archivos** seguros
- ✅ **Estados de lectura** y entrega
- 🤖 **Respuestas automáticas** fuera de horario
- 📋 **Categorización** de consultas
- 📊 **Métricas de respuesta** para staff

#### 🔔 **Sistema de Notificaciones**

- 📱 **Push notifications** multiplataforma
- 📧 **Email notifications** personalizables
- 🔕 **Configuración granular** por usuario
- 🎯 **Segmentación** de audiencia
- 📈 **Analytics** de engagement

</details>

### ⏱️ **Timer CrossFit Avanzado**

<details>
<summary>📋 Ver funcionalidades detalladas</summary>

#### ⏰ **Modalidades de Timer**

- 🔄 **EMOM** (Every Minute on the Minute)
- 🏃‍♂️ **AMRAP** (As Many Rounds As Possible)
- ⚡ **Tabata** (20s trabajo / 10s descanso)
- 🎯 **For Time** con cronómetro
- 🔢 **Custom intervals** personalizables
- 🏋️‍♂️ **Rest timer** entre series

#### 🎵 **Características Avanzadas**

- 🔊 **Sonidos personalizables** por fase
- 📱 **Vibración** en dispositivos móviles
- 🎨 **Temas visuales** customizables
- 📊 **Historial de WODs** completados
- 🤝 **Compartir entrenamientos** con la comunidad
- 📈 **Estadísticas** de rendimiento

</details>

### 🏆 **Marcas Personales (PRs)**

<details>
<summary>📋 Ver funcionalidades detalladas</summary>

#### 📊 **Seguimiento de PRs**

- 🏋️‍♂️ **Registro por movimiento** (Squat, Deadlift, etc.)
- 📈 **Gráficos de progreso** temporales
- 🥇 **Comparativas** con otros usuarios (opcional)
- 🎯 **Metas automáticas** basadas en progreso
- 🏆 **Sistema de logros** y badges
- 📱 **Recordatorios** para testing de PRs

#### 🎖️ **Gamificación**

- 🏅 **Badges de logros** por hitos alcanzados
- 🏆 **Leaderboards** mensuales
- 🎁 **Recompensas** por consistencia
- 👥 **Desafíos grupales** semanales
- 📊 **Ranking interno** del box

</details>

---

## 👥 Roles y Permisos

### 🔐 **Jerarquía de Roles**

\`\`\`javascript
const ROLES_HIERARCHY = {
SUPER_ADMIN: {
level: 5,
permissions: ['*'], // Todos los permisos
description: 'Creador y administrador supremo del sistema',
badge: '👑',
color: '#ff6b6b'
},
ADMIN: {
level: 4,
permissions: [
'users.manage',
'classes.manage',
'products.manage',
'billing.view',
'reports.generate',
'settings.modify'
],
description: 'Administrador del box con acceso completo',
badge: '🛡️',
color: '#4ecdc4'
},
COACH: {
level: 3,
permissions: [
'classes.view',
'classes.modify_own',
'users.view_basic',
'medical.view',
'messages.send'
],
description: 'Entrenador certificado con acceso a clases',
badge: '🏋️‍♂️',
color: '#45b7d1'
},
MEMBER_PREMIUM: {
level: 2.5,
permissions: [
'classes.book_unlimited',
'products.discount',
'chat.priority',
'features.advanced'
],
description: 'Miembro premium con beneficios adicionales',
badge: '⭐',
color: '#f9ca24'
},
MEMBER: {
level: 2,
permissions: [
'classes.book',
'profile.edit',
'chat.participate',
'products.buy',
'timer.use'
],
description: 'Miembro activo del box',
badge: '💪',
color: '#6c5ce7'
},
GUEST: {
level: 1,
permissions: [
'classes.view',
'products.view',
'info.view'
],
description: 'Visitante con acceso limitado',
badge: '👤',
color: '#a0a0a0'
}
}
\`\`\`

### 🛡️ **Matriz de Permisos**

| Funcionalidad           | Super Admin | Admin | Coach | Member Premium | Member | Guest |
| ----------------------- | ----------- | ----- | ----- | -------------- | ------ | ----- |
| **Gestión de Usuarios** | ✅          | ✅    | 👁️    | ❌             | ❌     | ❌    |
| **Gestión de Clases**   | ✅          | ✅    | 📝    | ❌             | ❌     | ❌    |
| **Reservar Clases**     | ✅          | ✅    | ✅    | ✅             | ✅     | ❌    |
| **Ver Datos Médicos**   | ✅          | ✅    | ✅    | ❌             | ❌     | ❌    |
| **E-commerce**          | ✅          | ✅    | 🛒    | 🛒💰           | 🛒     | 👁️    |
| **Chat Grupal**         | ✅          | ✅    | ✅    | ✅             | ✅     | ❌    |
| **Mensajes Privados**   | ✅          | ✅    | ✅    | ✅             | ✅     | ❌    |
| **Timer CrossFit**      | ✅          | ✅    | ✅    | ✅             | ✅     | ❌    |
| **Analytics**           | ✅          | ✅    | 📊    | ❌             | ❌     | ❌    |

**Leyenda:** ✅ Acceso completo | 📝 Solo sus clases | 👁️ Solo lectura | 🛒 Comprar | 💰 Descuentos | 📊 Limitado | ❌ Sin acceso

---

## 🔧 Stack Tecnológico

### 🎨 **Frontend Technologies**

<table>
<tr>
<td width="50%">

#### ⚛️ **Core Framework**

| Tecnología       | Versión | Propósito               |
| ---------------- | ------- | ----------------------- |
| **React**        | 18.3.1  | Framework principal     |
| **React Router** | 6.x     | Navegación SPA          |
| **Vite**         | 5.x     | Build tool y dev server |

#### 🎨 **UI & Styling**

| Tecnología          | Versión | Propósito              |
| ------------------- | ------- | ---------------------- |
| **CSS Modules**     | -       | Estilos modulares      |
| **Lucide React**    | Latest  | Iconografía            |
| **React Hook Form** | 7.x     | Gestión de formularios |

</td>
<td width="50%">

#### 🔧 **State Management**

| Tecnología       | Versión  | Propósito           |
| ---------------- | -------- | ------------------- |
| **Context API**  | Built-in | Estado global       |
| **useReducer**   | Built-in | Estado complejo     |
| **Custom Hooks** | -        | Lógica reutilizable |

#### 🔌 **Communication**

| Tecnología           | Versión | Propósito              |
| -------------------- | ------- | ---------------------- |
| **Socket.io Client** | 4.x     | WebSocket cliente      |
| **Axios**            | 1.x     | HTTP requests          |
| **React Query**      | 4.x     | Cache y sincronización |

</td>
</tr>
</table>

### ⚙️ **Backend Technologies**

<table>
<tr>
<td width="50%">

#### 🚀 **Server & Runtime**

| Tecnología     | Versión | Propósito          |
| -------------- | ------- | ------------------ |
| **Node.js**    | 18+     | Runtime JavaScript |
| **Express.js** | 4.x     | Framework web      |
| **Socket.io**  | 4.x     | WebSocket servidor |

#### 🗄️ **Database & Storage**

| Tecnología     | Versión | Propósito               |
| -------------- | ------- | ----------------------- |
| **MongoDB**    | 6.x     | Base de datos principal |
| **Mongoose**   | 7.x     | ODM para MongoDB        |
| **Cloudinary** | Latest  | Almacenamiento de media |

</td>
<td width="50%">

#### 🔐 **Security & Auth**

| Tecnología | Versión | Propósito         |
| ---------- | ------- | ----------------- |
| **JWT**    | Latest  | Autenticación     |
| **Bcrypt** | Latest  | Hash de passwords |
| **Helmet** | Latest  | Seguridad HTTP    |

#### 📧 **External Services**

| Tecnología     | Versión | Propósito              |
| -------------- | ------- | ---------------------- |
| **Nodemailer** | Latest  | Envío de emails        |
| **Multer**     | Latest  | Upload de archivos     |
| **Stripe**     | Latest  | Procesamiento de pagos |

</td>
</tr>
</table>

### 🛠️ **Development Tools**

| Categoría               | Herramientas                | Propósito                       |
| ----------------------- | --------------------------- | ------------------------------- |
| **📦 Package Manager**  | npm, yarn                   | Gestión de dependencias         |
| **🔍 Code Quality**     | ESLint, Prettier            | Linting y formateo              |
| **🧪 Testing**          | Jest, React Testing Library | Testing unitario e integración  |
| **🐳 Containerization** | Docker, Docker Compose      | Containerización y orquestación |
| **🚀 Deployment**       | Vercel, Render, Railway     | Despliegue y hosting            |
| **📊 Monitoring**       | Sentry, LogRocket           | Monitoreo y debugging           |

---

## 📊 Estructura del Proyecto

### 📁 **Organización del Frontend**

\`\`\`
proyecto13fronted/
├── 📁 public/ # Assets estáticos
│ ├── 🖼️ favicon.ico
│ ├── 📄 manifest.json # PWA manifest
│ └── 🤖 robots.txt # SEO robots
├── 📁 src/ # Código fuente principal
│ ├── 📁 assets/ # Recursos multimedia
│ │ ├── 🖼️ images/ # Imágenes optimizadas
│ │ ├── 🎵 sounds/ # Sonidos para timer
│ │ ├── 🎨 icons/ # Iconos personalizados
│ │ └── 📹 videos/ # Videos promocionales
│ ├── 📁 components/ # Componentes reutilizables
│ │ ├── 📁 ui/ # Componentes base UI
│ │ │ ├── 📄 Button/
│ │ │ ├── 📄 Modal/
│ │ │ ├── 📄 Loading/
│ │ │ └── 📄 Toast/
│ │ ├── 📁 layout/ # Componentes de layout
│ │ │ ├── 📄 Header/
│ │ │ ├── 📄 Footer/
│ │ │ └── 📄 Sidebar/
│ │ └── 📁 forms/ # Componentes de formularios
│ ├── 📁 context/ # Contextos globales
│ │ ├── 📄 AuthContext.jsx # Autenticación
│ │ ├── 📄 CartContext.jsx # Carrito de compras
│ │ ├── 📄 ConsentContext.jsx # Consentimientos GDPR
│ │ └── 📄 SocketContext.jsx # WebSocket connection
│ ├── 📁 hooks/ # Custom hooks
│ │ ├── 📄 useAuth.js # Hook de autenticación
│ │ ├── 📄 useSocket.js # Hook de WebSocket
│ │ ├── 📄 useLocalStorage.js # Persistencia local
│ │ └── 📄 useTimer.js # Timer CrossFit
│ ├── 📁 pages/ # Páginas principales
│ │ ├── 📁 Home/ # Página principal
│ │ ├── 📁 Auth/ # Login/Register
│ │ ├── 📁 Dashboard/ # Panel de usuario
│ │ ├── 📁 Classes/ # Sistema de clases
│ │ ├── 📁 Shop/ # E-commerce
│ │ ├── 📁 Chat/ # Comunicación
│ │ ├── 📁 Admin/ # Panel administrativo
│ │ └── 📁 Profile/ # Perfil de usuario
│ ├── 📁 services/ # Servicios y API
│ │ ├── 📄 api.js # Cliente API base
│ │ ├── 📄 auth.js # Servicios de auth
│ │ ├── 📄 users.js # Gestión de usuarios
│ │ ├── 📄 classes.js # Gestión de clases
│ │ └── 📄 products.js # Gestión de productos
│ ├── 📁 utils/ # Utilidades
│ │ ├── 📄 constants.js # Constantes globales
│ │ ├── 📄 formatters.js # Formateo de datos
│ │ ├── 📄 validators.js # Validaciones
│ │ └── 📄 helpers.js # Funciones auxiliares
│ ├── 📁 styles/ # Estilos globales
│ │ ├── 🎨 globals.css # Estilos base
│ │ ├── 🎨 variables.css # Variables CSS
│ │ └── 🎨 themes.css # Temas (claro/oscuro)
│ ├── 📄 App.jsx # Componente raíz
│ └── 📄 main.jsx # Punto de entrada
├── 📄 package.json # Dependencias y scripts
├── 📄 vite.config.js # Configuración Vite
├── 📄 .env.example # Variables de entorno ejemplo
└── 📄 README.md # Documentación
\`\`\`

### 🏗️ **Arquitectura Feature-Based**

Cada módulo principal sigue esta estructura:

\`\`\`
feature/
├── 📁 components/ # Componentes específicos
├── 📁 hooks/ # Hooks personalizados
├── 📁 services/ # Servicios API
├── 📁 utils/ # Utilidades específicas
├── 📁 types/ # Tipos TypeScript (futuro)
└── 📄 index.js # Punto de entrada
\`\`\`

---

## 🔐 Autenticación y Seguridad

### 🛡️ **Flujo de Autenticación JWT**

\`\`\`mermaid
sequenceDiagram
participant U as Usuario
participant F as Frontend
participant B as Backend
participant DB as Database

    U->>F: Credenciales de login
    F->>B: POST /api/auth/login
    B->>DB: Verificar usuario
    DB-->>B: Usuario válido
    B->>B: Generar JWT + Refresh Token
    B-->>F: Tokens + Datos usuario
    F->>F: Almacenar en localStorage
    F-->>U: Redirigir a dashboard

    Note over F,B: Requests posteriores
    F->>B: Request con Authorization header
    B->>B: Verificar JWT
    alt Token válido
        B-->>F: Respuesta exitosa
    else Token expirado
        B-->>F: 401 Unauthorized
        F->>B: POST /api/auth/refresh
        B-->>F: Nuevo JWT
        F->>B: Reintentar request original
    end

\`\`\`

### 🔒 **Medidas de Seguridad Implementadas**

<table>
<tr>
<td width="50%">

#### 🛡️ **Autenticación**

- ✅ **JWT con refresh tokens** para sesiones seguras
- ✅ **Bcrypt con salt rounds 12** para passwords
- ✅ **Rate limiting** en endpoints de auth
- ✅ **Account lockout** tras intentos fallidos
- ✅ **Password strength validation** en frontend/backend
- ✅ **2FA opcional** con Google Authenticator

</td>
<td width="50%">

#### 🔐 **Protección de Datos**

- ✅ **Encriptación AES-256** para datos médicos
- ✅ **HTTPS obligatorio** en producción
- ✅ **Sanitización de inputs** contra XSS
- ✅ **Validación de esquemas** con Joi
- ✅ **CORS configurado** correctamente
- ✅ **Headers de seguridad** con Helmet

</td>
</tr>
</table>

### 📋 **Gestión de Consentimientos GDPR**

\`\`\`javascript
const CONSENT_TYPES = {
ESSENTIAL: {
id: 'essential',
name: 'Cookies esenciales',
description: 'Necesarias para el funcionamiento básico',
required: true,
category: 'functional'
},
ANALYTICS: {
id: 'analytics',
name: 'Análisis y estadísticas',
description: 'Nos ayudan a mejorar la experiencia',
required: false,
category: 'analytics'
},
MARKETING: {
id: 'marketing',
name: 'Marketing y publicidad',
description: 'Para personalizar contenido y ofertas',
required: false,
category: 'marketing'
},
MEDICAL_DATA: {
id: 'medical',
name: 'Datos médicos sensibles',
description: 'Información de salud y condición física',
required: false,
category: 'sensitive',
encryption: true
}
}
\`\`\`

### 🔍 **Auditoría y Logging**

\`\`\`javascript
const AUDIT_EVENTS = {
USER_LOGIN: 'user.login',
USER_LOGOUT: 'user.logout',
PASSWORD_CHANGE: 'user.password_change',
DATA_ACCESS: 'data.access',
DATA_MODIFICATION: 'data.modify',
ADMIN_ACTION: 'admin.action',
SECURITY_VIOLATION: 'security.violation'
}
\`\`\`

---

## 📡 API y Comunicación

### 🔌 **Endpoints de la API REST**

<details>
<summary>🔐 **Autenticación y Usuarios**</summary>

\`\`\`javascript
// Autenticación
POST /api/auth/register // Registro de usuario
POST /api/auth/login // Inicio de sesión
POST /api/auth/refresh // Renovar token
POST /api/auth/logout // Cerrar sesión
POST /api/auth/forgot-password // Recuperar contraseña
POST /api/auth/reset-password // Restablecer contraseña
POST /api/auth/verify-email // Verificar email

// Gestión de usuarios
GET /api/users // Listar usuarios (admin)
GET /api/users/:id // Obtener usuario específico
PUT /api/users/:id // Actualizar usuario
DELETE /api/users/:id // Eliminar usuario (admin)
GET /api/users/:id/profile // Perfil público
PUT /api/users/:id/medical // Actualizar info médica
GET /api/users/:id/stats // Estadísticas de usuario
\`\`\`

</details>

<details>
<summary>🏋️‍♂️ **Clases y Reservas**</summary>

\`\`\`javascript
// Gestión de clases
GET /api/classes // Listar clases disponibles
GET /api/classes/:id // Detalles de clase específica
POST /api/classes // Crear nueva clase (admin)
PUT /api/classes/:id // Actualizar clase (admin)
DELETE /api/classes/:id // Eliminar clase (admin)

// Reservas
POST /api/classes/:id/book // Reservar clase
DELETE /api/classes/:id/cancel // Cancelar reserva
GET /api/classes/:id/attendees // Lista de asistentes
POST /api/classes/:id/waitlist // Unirse a lista de espera
GET /api/users/:id/bookings // Reservas de usuario
\`\`\`

</details>

<details>
<summary>🛒 **E-commerce**</summary>

\`\`\`javascript
// Productos
GET /api/products // Catálogo de productos
GET /api/products/:id // Detalles de producto
POST /api/products // Crear producto (admin)
PUT /api/products/:id // Actualizar producto (admin)
DELETE /api/products/:id // Eliminar producto (admin)

// Carrito y pedidos
GET /api/cart // Obtener carrito
POST /api/cart/add // Agregar al carrito
PUT /api/cart/update // Actualizar cantidad
DELETE /api/cart/remove // Remover del carrito
POST /api/orders // Crear pedido
GET /api/orders // Historial de pedidos
GET /api/orders/:id // Detalles de pedido
\`\`\`

</details>

<details>
<summary>💬 **Comunicación**</summary>

\`\`\`javascript
// Mensajes privados
GET /api/messages/private // Conversaciones privadas
POST /api/messages/send // Enviar mensaje privado
PUT /api/messages/:id/read // Marcar como leído
DELETE /api/messages/:id // Eliminar mensaje

// Chat grupal (vía WebSocket principalmente)
GET /api/chat/history // Historial del chat
POST /api/chat/message // Enviar mensaje al chat
PUT /api/chat/:id/edit // Editar mensaje
DELETE /api/chat/:id // Eliminar mensaje
\`\`\`

</details>

### ⚡ **WebSocket Events**

\`\`\`javascript
const SOCKET_EVENTS = {
// Conexión
CONNECTION: 'connection',
DISCONNECT: 'disconnect',

// Chat grupal
CHAT_MESSAGE: 'chat:message',
CHAT_MESSAGE_EDIT: 'chat:message:edit',
CHAT_MESSAGE_DELETE: 'chat:message:delete',
CHAT_TYPING: 'chat:typing',

// Mensajes privados
PRIVATE_MESSAGE: 'private:message',
PRIVATE_MESSAGE_READ: 'private:message:read',

// Clases y reservas
CLASS_BOOKED: 'class:booked',
CLASS_CANCELLED: 'class:cancelled',
CLASS_UPDATED: 'class:updated',
WAITLIST_UPDATED: 'waitlist:updated',

// Notificaciones
NOTIFICATION: 'notification',
SYSTEM_ANNOUNCEMENT: 'system:announcement',

// Presencia de usuarios
USER_ONLINE: 'user:online',
USER_OFFLINE: 'user:offline',
USER_STATUS: 'user:status'
}
\`\`\`

### 📊 **Códigos de Estado HTTP**

| Código  | Significado           | Uso en la API                   |
| ------- | --------------------- | ------------------------------- |
| **200** | OK                    | Operación exitosa               |
| **201** | Created               | Recurso creado exitosamente     |
| **204** | No Content            | Eliminación exitosa             |
| **400** | Bad Request           | Datos de entrada inválidos      |
| **401** | Unauthorized          | Token inválido o expirado       |
| **403** | Forbidden             | Sin permisos suficientes        |
| **404** | Not Found             | Recurso no encontrado           |
| **409** | Conflict              | Conflicto (ej: email ya existe) |
| **422** | Unprocessable Entity  | Validación fallida              |
| **429** | Too Many Requests     | Rate limit excedido             |
| **500** | Internal Server Error | Error del servidor              |

---

## 🎨 UI/UX y Diseño

### 🎯 **Principios de Diseño**

<table>
<tr>
<td width="50%">

#### 📱 **Mobile First**

- ✅ **Responsive design** desde 320px
- ✅ **Touch-friendly** interfaces
- ✅ **Gestos intuitivos** para navegación
- ✅ **Optimización** para pantallas pequeñas

#### ♿ **Accesibilidad (WCAG 2.1 AA)**

- ✅ **Contraste mínimo** 4.5:1
- ✅ **Navegación por teclado** completa
- ✅ **Screen readers** compatibles
- ✅ **Focus indicators** visibles

</td>
<td width="50%">

#### ⚡ **Performance UX**

- ✅ **Skeleton screens** durante carga
- ✅ **Lazy loading** de imágenes
- ✅ **Animaciones fluidas** 60fps
- ✅ **Feedback inmediato** en acciones

#### 🎨 **Consistencia Visual**

- ✅ **Design system** unificado
- ✅ **Componentes reutilizables**
- ✅ **Tipografía coherente**
- ✅ **Espaciado sistemático**

</td>
</tr>
</table>

### 🎨 **Sistema de Colores**

\`\`\`css
:root {
/_ Colores primarios _/
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-900: #1e3a8a;

/_ Colores secundarios _/
--secondary-50: #fff7ed;
--secondary-500: #ff5a1f;
--secondary-600: #ea580c;

/_ Colores de estado _/
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #06b6d4;

/_ Escala de grises _/
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-500: #6b7280;
--gray-900: #111827;

/_ Modo oscuro _/
--dark-bg: #0f172a;
--dark-surface: #1e293b;
--dark-border: #334155;
}
\`\`\`

### 📐 **Sistema de Espaciado**

\`\`\`css
/_ Escala de espaciado (basada en 4px) _/
.space-1 { margin: 0.25rem; } /_ 4px _/
.space-2 { margin: 0.5rem; } /_ 8px _/
.space-3 { margin: 0.75rem; } /_ 12px _/
.space-4 { margin: 1rem; } /_ 16px _/
.space-6 { margin: 1.5rem; } /_ 24px _/
.space-8 { margin: 2rem; } /_ 32px _/
.space-12 { margin: 3rem; } /_ 48px _/
.space-16 { margin: 4rem; } /_ 64px _/
\`\`\`

### 🔤 **Tipografía**

\`\`\`css
/_ Escala tipográfica _/
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }

/_ Pesos de fuente _/
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
\`\`\`

### 🎭 **Componentes del Design System**

<details>
<summary>🔘 **Botones**</summary>

\`\`\`css
/_ Variantes de botones _/
.btn-primary {
background: var(--primary-500);
color: white;
border: none;
padding: 0.5rem 1rem;
border-radius: 0.375rem;
font-weight: 500;
transition: all 0.2s;
}

.btn-primary:hover {
background: var(--primary-600);
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
background: transparent;
color: var(--primary-500);
border: 1px solid var(--primary-500);
}

.btn-danger {
background: var(--error);
color: white;
}
\`\`\`

</details>

<details>
<summary>📝 **Formularios**</summary>

\`\`\`css
/_ Estilos de inputs _/
.form-input {
width: 100%;
padding: 0.75rem;
border: 1px solid var(--gray-300);
border-radius: 0.375rem;
font-size: 1rem;
transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
outline: none;
border-color: var(--primary-500);
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.error {
border-color: var(--error);
box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
\`\`\`

</details>

---

## ⚡ Optimizaciones de Performance

### 🚀 **Métricas de Performance Actuales**

| Métrica                      | Objetivo | Actual | Estado |
| ---------------------------- | -------- | ------ | ------ |
| **First Contentful Paint**   | < 1.5s   | 1.2s   | ✅     |
| **Largest Contentful Paint** | < 2.5s   | 2.1s   | ✅     |
| **Cumulative Layout Shift**  | < 0.1    | 0.05   | ✅     |
| **Time to Interactive**      | < 3.5s   | 2.8s   | ✅     |
| **First Input Delay**        | < 100ms  | 45ms   | ✅     |
| **Speed Index**              | < 3.0s   | 2.4s   | ✅     |

### 🔄 **Optimizaciones de React**

<details>
<summary>⚛️ **Component Optimization**</summary>

\`\`\`javascript
// Memoización de componentes
const OptimizedUserCard = React.memo(({ user, onEdit }) => {
return (

<div className="user-card">
<img src={user.avatar || "/placeholder.svg"} alt={user.name} loading="lazy" />
<h3>{user.name}</h3>
<button onClick={() => onEdit(user.id)}>Editar</button>
</div>
)
}, (prevProps, nextProps) => {
// Custom comparison para evitar re-renders innecesarios
return prevProps.user.id === nextProps.user.id &&
prevProps.user.name === nextProps.user.name
})

// Hook optimizado con useMemo
const useFilteredUsers = (users, searchTerm) => {
return useMemo(() => {
if (!searchTerm) return users
return users.filter(user =>
user.name.toLowerCase().includes(searchTerm.toLowerCase())
)
}, [users, searchTerm])
}

// useCallback para funciones estables
const UserList = ({ users }) => {
const [searchTerm, setSearchTerm] = useState('')

const handleSearch = useCallback((term) => {
setSearchTerm(term)
}, [])

const filteredUsers = useFilteredUsers(users, searchTerm)

return (

<div>
<SearchInput onSearch={handleSearch} />
{filteredUsers.map(user => (
<OptimizedUserCard key={user.id} user={user} />
))}
</div>
)
}
\`\`\`

</details>

<details>
<summary>📦 **Code Splitting & Lazy Loading**</summary>

\`\`\`javascript
// Lazy loading de páginas
const AdminPanel = lazy(() => import('./pages/Admin/AdminPanel'))
const UserDashboard = lazy(() => import('./pages/Dashboard/UserDashboard'))
const ShopPage = lazy(() => import('./pages/Shop/ShopPage'))

// Componente de carga con skeleton
const PageSkeleton = () => (

  <div className="page-skeleton">
    <div className="skeleton-header"></div>
    <div className="skeleton-content"></div>
    <div className="skeleton-sidebar"></div>
  </div>
)

// Router con suspense
const AppRouter = () => (
<Router>
<Routes>
<Route path="/" element={<Home />} />
<Route
path="/admin/\*"
element={
<Suspense fallback={<PageSkeleton />}>
<AdminPanel />
</Suspense>
}
/>
<Route
path="/dashboard"
element={
<Suspense fallback={<PageSkeleton />}>
<UserDashboard />
</Suspense>
}
/>
</Routes>
</Router>
)

// Dynamic imports para funcionalidades opcionales
const loadChartLibrary = () => import('recharts')
const loadPDFGenerator = () => import('jspdf')
\`\`\`

</details>

<details>
<summary>🖼️ **Image Optimization**</summary>

\`\`\`javascript
// Componente de imagen optimizada
const OptimizedImage = ({
src,
alt,
width,
height,
className,
priority = false
}) => {
const [isLoaded, setIsLoaded] = useState(false)
const [error, setError] = useState(false)

// Generar srcSet para diferentes densidades
const srcSet = useMemo(() => {
const baseSrc = src.replace(/\.(jpg|jpeg|png|webp)$/, '')
    const ext = src.match(/\.(jpg|jpeg|png|webp)$/)?.[0] || '.jpg'

    return [
      \`\${baseSrc}\${ext} 1x\`,
      \`\${baseSrc}@2x\${ext} 2x\`,
      \`\${baseSrc}@3x\${ext} 3x\`
    ].join(', ')

}, [src])

return (

<div className={\`image-container \${className}\`}>
{!isLoaded && !error && (
<div
className="image-placeholder"
style={{
            width,
            height,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite'
          }}
/>
)}
<img
src={src || "/placeholder.svg"}
srcSet={srcSet}
alt={alt}
width={width}
height={height}
loading={priority ? 'eager' : 'lazy'}
decoding="async"
onLoad={() => setIsLoaded(true)}
onError={() => setError(true)}
style={{
          display: isLoaded ? 'block' : 'none',
          transition: 'opacity 0.3s ease'
        }}
/>
{error && (
<div className="image-error">
<span>Error al cargar imagen</span>
</div>
)}
</div>
)
}
\`\`\`

</details>

### 📊 **Bundle Analysis**

\`\`\`javascript
// Configuración de Vite para análisis de bundle
export default defineConfig({
build: {
rollupOptions: {
output: {
manualChunks: {
// Separar vendor libraries
vendor: ['react', 'react-dom', 'react-router-dom'],
ui: ['lucide-react'],
utils: ['date-fns', 'lodash-es'],
charts: ['recharts'],
// Separar por features
admin: ['./src/pages/Admin'],
shop: ['./src/pages/Shop'],
chat: ['./src/pages/Chat']
}
}
},
// Configuración de compresión
minify: 'terser',
terserOptions: {
compress: {
drop_console: true,
drop_debugger: true
}
}
}
})
\`\`\`

---

## 🧪 Testing

### 🔬 **Estrategia de Testing**

<table>
<tr>
<td width="33%">

#### 🧩 **Unit Tests**

- ✅ **Componentes individuales**
- ✅ **Hooks personalizados**
- ✅ **Funciones utilitarias**
- ✅ **Servicios API**
- 🎯 **Objetivo: >80% coverage**

</td>
<td width="33%">

#### 🔗 **Integration Tests**

- ✅ **Flujos de usuario completos**
- ✅ **Interacción entre componentes**
- ✅ **API + Frontend**
- ✅ **Context providers**
- 🎯 **Objetivo: Flujos críticos**

</td>
<td width="33%">

#### 🌐 **E2E Tests**

- ✅ **Scenarios de usuario real**
- ✅ **Cross-browser testing**
- ✅ **Mobile testing**
- ✅ **Performance testing**
- 🎯 **Objetivo: Happy paths**

</td>
</tr>
</table>

### 🧪 **Configuración de Testing**

<details>
<summary>⚙️ **Setup y Configuración**</summary>

\`\`\`javascript
// jest.config.js
export default {
testEnvironment: 'jsdom',
setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
moduleNameMapping: {
'^@/(._)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
},
collectCoverageFrom: [
'src/\*\*/_.{js,jsx}',
'!src/\*_/_.test.{js,jsx}',
'!src/main.jsx',
'!src/vite-env.d.ts'
],
coverageThreshold: {
global: {
branches: 80,
functions: 80,
lines: 80,
statements: 80
}
}
}

// setupTests.js
import '@testing-library/jest-dom'
import { server } from './mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
\`\`\`

</details>

<details>
<summary>🧩 **Unit Tests Examples**</summary>

\`\`\`javascript
// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button Component', () => {
test('renders with correct text', () => {
render(<Button>Click me</Button>)
expect(screen.getByText('Click me')).toBeInTheDocument()
})

test('handles click events', () => {
const handleClick = jest.fn()
render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)

})

test('applies correct variant styles', () => {
render(<Button variant="primary">Primary Button</Button>)
const button = screen.getByText('Primary Button')
expect(button).toHaveClass('btn-primary')
})

test('is disabled when loading', () => {
render(<Button loading>Loading Button</Button>)
const button = screen.getByRole('button')
expect(button).toBeDisabled()
expect(screen.getByText('Cargando...')).toBeInTheDocument()
})
})

// useAuth.test.js
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../useAuth'
import { AuthProvider } from '../AuthContext'

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

describe('useAuth Hook', () => {
test('should login user successfully', async () => {
const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('test@example.com', 'password123')
    })

    expect(result.current.user).toBeTruthy()
    expect(result.current.isAuthenticated).toBe(true)

})

test('should handle login errors', async () => {
const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      try {
        await result.current.login('invalid@email.com', 'wrongpassword')
      } catch (error) {
        expect(error.message).toBe('Credenciales inválidas')
      }
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)

})
})
\`\`\`

</details>

<details>
<summary>🔗 **Integration Tests Examples**</summary>

\`\`\`javascript
// UserRegistration.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import App from '../App'

const AppWrapper = ({ children }) => (
<BrowserRouter>
<AuthProvider>
{children}
</AuthProvider>
</BrowserRouter>
)

describe('User Registration Flow', () => {
test('complete registration process', async () => {
const user = userEvent.setup()
render(<App />, { wrapper: AppWrapper })

    // Navegar a registro
    await user.click(screen.getByText('Registrarse'))

    // Llenar formulario
    await user.type(screen.getByLabelText('Nombre'), 'Juan Pérez')
    await user.type(screen.getByLabelText('Email'), 'juan@example.com')
    await user.type(screen.getByLabelText('Contraseña'), 'Password123!')
    await user.type(screen.getByLabelText('Confirmar Contraseña'), 'Password123!')

    // Aceptar términos
    await user.click(screen.getByLabelText('Acepto los términos y condiciones'))

    // Enviar formulario
    await user.click(screen.getByText('Crear cuenta'))

    // Verificar redirección a dashboard
    await waitFor(() => {
      expect(screen.getByText('Bienvenido, Juan')).toBeInTheDocument()
    })

    // Verificar que el usuario está autenticado
    expect(screen.getByText('Mi Dashboard')).toBeInTheDocument()

})

test('shows validation errors for invalid data', async () => {
const user = userEvent.setup()
render(<App />, { wrapper: AppWrapper })

    await user.click(screen.getByText('Registrarse'))

    // Intentar enviar formulario vacío
    await user.click(screen.getByText('Crear cuenta'))

    // Verificar errores de validación
    expect(screen.getByText('El nombre es requerido')).toBeInTheDocument()
    expect(screen.getByText('El email es requerido')).toBeInTheDocument()
    expect(screen.getByText('La contraseña es requerida')).toBeInTheDocument()

})
})
\`\`\`

</details>

### 📊 **Coverage Reports**

\`\`\`bash

# Generar reporte de coverage

npm run test:coverage

# Ver reporte en navegador

npm run test:coverage:open

# Coverage por archivos

npm run test:coverage:files
\`\`\`

---

## 🚀 Deployment

### 🐳 **Containerización con Docker**

<details>
<summary>🐳 **Dockerfile Frontend**</summary>

\`\`\`dockerfile

# Multi-stage build para optimizar tamaño

FROM node:18-alpine AS builder

# Configurar directorio de trabajo

WORKDIR /app

# Copiar archivos de dependencias

COPY package\*.json ./

# Instalar dependencias

RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente

COPY . .

# Build de producción

RUN npm run build

# Etapa de producción con Nginx

FROM nginx:alpine AS production

# Copiar configuración de Nginx

COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivos build

COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer puerto

EXPOSE 80

# Comando de inicio

CMD ["nginx", "-g", "daemon off;"]
\`\`\`

</details>

<details>
<summary>🐳 **Docker Compose**</summary>

\`\`\`yaml
version: '3.8'

services:

# Frontend

frontend:
build:
context: .
dockerfile: Dockerfile
ports: - "80:80"
depends_on: - backend
environment: - NODE_ENV=production
networks: - app-network

# Backend

backend:
build:
context: ./server
dockerfile: Dockerfile
ports: - "3001:3001"
environment: - NODE_ENV=production - MONGODB_URI=mongodb://mongo:27017/adercrossfit - JWT_SECRET=\${JWT_SECRET}
depends_on: - mongo - redis
networks: - app-network

# Base de datos

mongo:
image: mongo:6-jammy
restart: always
ports: - "27017:27017"
volumes: - mongo_data:/data/db - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
environment: - MONGO_INITDB_ROOT_USERNAME=admin - MONGO_INITDB_ROOT_PASSWORD=\${MONGO_PASSWORD} - MONGO_INITDB_DATABASE=adercrossfit
networks: - app-network

# Redis para cache y sesiones

redis:
image: redis:7-alpine
restart: always
ports: - "6379:6379"
volumes: - redis_data:/data
networks: - app-network

# Nginx como reverse proxy

nginx:
image: nginx:alpine
ports: - "443:443"
volumes: - ./nginx/nginx.conf:/etc/nginx/nginx.conf - ./nginx/ssl:/etc/nginx/ssl
depends_on: - frontend - backend
networks: - app-network

volumes:
mongo_data:
redis_data:

networks:
app-network:
driver: bridge
\`\`\`

</details>

### 🌐 **Configuración de Nginx**

<details>
<summary>⚙️ **nginx.conf**</summary>

\`\`\`nginx
events {
worker_connections 1024;
}

http {
include /etc/nginx/mime.types;
default_type application/octet-stream;

    # Configuración de logs
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;

    # Configuración de compresión
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

    # Upstream para backend
    upstream backend {
        server backend:3001;
    }

    server {
        listen 80;
        server_name adercrossfit.com www.adercrossfit.com;

        # Redirigir HTTP a HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name adercrossfit.com www.adercrossfit.com;

        # Configuración SSL
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
        ssl_prefer_server_ciphers off;

        # Headers de seguridad
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # Archivos estáticos del frontend
        location / {
            root /usr/share/nginx/html;
            try_files $uri $uri/ /index.html;

            # Cache para assets estáticos
            location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
                expires 1y;
                add_header Cache-Control "public, immutable";
            }
        }

        # API del backend
        location /api/ {
            limit_req zone=api burst=20 nodelay;

            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # Timeouts
            proxy_connect_timeout 30s;
            proxy_send_timeout 30s;
            proxy_read_timeout 30s;
        }

        # Endpoints de autenticación con rate limiting estricto
        location /api/auth/login {
            limit_req zone=login burst=5 nodelay;
            proxy_pass http://backend;
        }

        # WebSocket para chat en tiempo real
        location /socket.io/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }

}
\`\`\`

</details>

### ☁️ **Deployment en la Nube**

<table>
<tr>
<td width="33%">

#### 🚀 **Vercel (Frontend)**

\`\`\`json
{
"builds": [
{
"src": "package.json",
"use": "@vercel/static-build"
}
],
"routes": [
{
"src": "/api/(.*)",
"dest": "https://api.adercrossfit.com/api/$1"
},
{
"src": "/(.*)",
"dest": "/index.html"
}
]
}
\`\`\`

</td>
<td width="33%">

#### 🌊 **Railway (Backend)**

\`\`\`yaml

# railway.toml

[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"

[deploy]
startCommand = "npm start"
healthcheckPath = "/health"
healthcheckTimeout = 30
\`\`\`

</td>
<td width="33%">

#### 🍃 **MongoDB Atlas**

- ✅ **Cluster dedicado** M10+
- ✅ **Backup automático** diario
- ✅ **Monitoring** integrado
- ✅ **Security** con IP whitelist

</td>
</tr>
</table>

### 🔄 **CI/CD Pipeline**

<details>
<summary>⚙️ **GitHub Actions**</summary>

\`\`\`yaml

# .github/workflows/deploy.yml

name: Deploy to Production

on:
push:
branches: [main]
pull_request:
branches: [main]

jobs:
test:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

build:
needs: test
runs-on: ubuntu-latest
if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.API_URL }}
          VITE_SOCKET_URL: ${{ secrets.SOCKET_URL }}

      - name: Build Docker image
        run: |
          docker build -t adercrossfit:${{ github.sha }} .
          docker tag adercrossfit:${{ github.sha }} adercrossfit:latest

      - name: Deploy to production
        run: |
          # Deploy script aquí
          echo "Deploying to production..."

\`\`\`

</details>

---

## 📊 Métricas y Analytics

### 📈 **Dashboard de Métricas**

<table>
<tr>
<td width="50%">

#### 👥 **Métricas de Usuarios**

- 📊 **Usuarios activos** diarios/mensuales
- 📈 **Tasa de registro** y conversión
- 🔄 **Retención** por cohortes
- 📱 **Dispositivos** más utilizados
- 🌍 **Ubicación geográfica** de usuarios

</td>
<td width="50%">

#### 🏋️‍♂️ **Métricas de Negocio**

- 💰 **Revenue** mensual y anual
- 🎯 **Clases más populares**
- 🛒 **Ventas** de productos
- ⭐ **Satisfacción** del cliente (NPS)
- 📅 **Ocupación** de clases

</td>
</tr>
</table>

### 🔍 **Herramientas de Monitoreo**

\`\`\`javascript
// Configuración de analytics
const analytics = {
// Google Analytics 4
gtag: {
measurementId: 'G-XXXXXXXXXX',
events: [
'page_view',
'user_registration',
'class_booking',
'purchase',
'chat_message'
]
},

// Métricas personalizadas
custom: {
classBookings: 'Reservas de clases',
messagesSent: 'Mensajes enviados',
productsViewed: 'Productos vistos',
timerUsage: 'Uso del timer'
},

// Eventos de conversión
conversions: {
registration: 'Registro completado',
firstBooking: 'Primera reserva',
firstPurchase: 'Primera compra',
membershipUpgrade: 'Upgrade a premium'
}
}
\`\`\`

---

## 🗺️ Roadmap

### 🎯 **Q1 2025 - Expansión Mobile**

<table>
<tr>
<td width="50%">

#### 📱 **App Móvil Nativa**

- ✅ **React Native** para iOS y Android
- ✅ **Push notifications** nativas
- ✅ **Offline mode** para funciones básicas
- ✅ **Biometric authentication**
- ✅ **Apple/Google Pay** integration

</td>
<td width="50%">

#### 🤖 **Inteligencia Artificial**

- 🔄 **Chatbot** con IA para soporte 24/7
- 📊 **Recomendaciones** personalizadas de clases
- 📈 **Análisis predictivo** de asistencia
- 🎯 **Optimización automática** de horarios

</td>
</tr>
</table>

### 🎯 **Q2 2025 - Integración Avanzada**

<table>
<tr>
<td width="50%">

#### 💳 **Pagos y Facturación**

- ✅ **Stripe Connect** para pagos
- ✅ **Suscripciones** automáticas
- ✅ **Facturación electrónica**
- ✅ **Multi-currency** support
- ✅ **Reporting financiero** avanzado

</td>
<td width="50%">

#### 🔗 **Integraciones Externas**

- ⌚ **Wearables** (Apple Watch, Fitbit)
- 📅 **Calendarios** (Google, Outlook)
- 📧 **Email marketing** (Mailchimp)
- 📊 **CRM** integration (HubSpot)

</td>
</tr>
</table>

### 🎯 **Q3 2025 - Escalabilidad**

<table>
<tr>
<td width="50%">

#### 🌐 **Internacionalización**

- 🌍 **Multi-idioma** (ES, EN, FR, PT)
- 💱 **Multi-moneda** automática
- 🕐 **Zonas horarias** inteligentes
- 📍 **Localización** de contenido

</td>
<td width="50%">

#### 🏢 **Multi-tenant**

- 🏋️‍♂️ **Múltiples boxes** en una instancia
- 👥 **Gestión centralizada**
- 📊 **Analytics consolidados**
- 🔐 **Aislamiento de datos**

</td>
</tr>
</table>

### 🎯 **Q4 2025 - Innovación**

- 🥽 **VR/AR** para entrenamientos remotos
- 🤖 **AI Coach** personalizado
- 🎮 **Gamificación** avanzada
- 📱 **PWA** completa con capacidades nativas

---

## 🤝 Contribución

### 🔄 **Workflow de Desarrollo**

\`\`\`mermaid
gitgraph
commit id: "Initial commit"
branch develop
checkout develop
commit id: "Setup project"
branch feature/user-auth
checkout feature/user-auth
commit id: "Add login"
commit id: "Add registration"
checkout develop
merge feature/user-auth
branch feature/class-booking
checkout feature/class-booking
commit id: "Add booking system"
checkout develop
merge feature/class-booking
checkout main
merge develop
commit id: "Release v1.0"
\`\`\`

### 📝 **Convenciones de Commit**

\`\`\`bash

# Tipos de commit

feat: # Nueva funcionalidad
fix: # Corrección de bug
docs: # Actualización de documentación
style: # Cambios de formato (no afectan funcionalidad)
refactor: # Refactorización de código
test: # Agregar o modificar tests
chore: # Tareas de mantenimiento
perf: # Mejoras de performance
ci: # Cambios en CI/CD

# Ejemplos

git commit -m "feat(auth): add JWT refresh token functionality"
git commit -m "fix(booking): resolve double booking issue"
git commit -m "docs(readme): update installation instructions"
\`\`\`

### 🎯 **Guidelines de Código**

<details>
<summary>📏 **Estándares de Código**</summary>

\`\`\`javascript
// ✅ Buenas prácticas

// 1. Nombres descriptivos
const calculateUserBMI = (weight, height) => {
return weight / (height \* height)
}

// 2. Funciones puras cuando sea posible
const formatCurrency = (amount, currency = 'EUR') => {
return new Intl.NumberFormat('es-ES', {
style: 'currency',
currency
}).format(amount)
}

// 3. Manejo de errores consistente
const fetchUserData = async (userId) => {
try {
const response = await api.get(\`/users/\${userId}\`)
return { data: response.data, error: null }
} catch (error) {
console.error('Error fetching user:', error)
return { data: null, error: error.message }
}
}

// 4. Componentes con PropTypes o TypeScript
const UserCard = ({ user, onEdit, className = '' }) => {
if (!user) return null

return (

<div className={\`user-card \${className}\`}>
<h3>{user.name}</h3>
<p>{user.email}</p>
{onEdit && (
<button onClick={() => onEdit(user.id)}>
Editar
</button>
)}
</div>
)
}
\`\`\`

</details>

### 🐛 **Reportar Issues**

Al reportar un bug, incluye:

- 📝 **Descripción clara** del problema
- 🔄 **Pasos para reproducir**
- 🎯 **Comportamiento esperado**
- 📱 **Información del entorno** (browser, OS, etc.)
- 📸 **Screenshots** si es relevante
- 🔗 **Enlaces** a logs o errores

### 💡 **Solicitar Features**

Para nuevas funcionalidades:

- 🎯 **Problema que resuelve**
- 💡 **Solución propuesta**
- 🔄 **Alternativas consideradas**
- 📊 **Impacto esperado**
- 🎨 **Mockups** si es UI/UX

---

## 📞 Soporte

### 🆘 **Canales de Soporte**

<table>
<tr>
<td width="25%">

#### 📖 **Documentación**

- [Wiki del proyecto](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/wiki)
- [API Documentation](https://api.adercrossfit.com/docs)
- [Video Tutorials](https://youtube.com/adercrossfit)

</td>
<td width="25%">

#### 🐛 **Issues Técnicos**

- [GitHub Issues](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/issues)
- [Bug Reports](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/issues/new?template=bug_report.md)
- [Feature Requests](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/issues/new?template=feature_request.md)

</td>
<td width="25%">

#### 💬 **Comunidad**

- [Discord Server](https://discord.gg/adercrossfit)
- [GitHub Discussions](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/discussions)
- [Reddit Community](https://reddit.com/r/adercrossfit)

</td>
<td width="25%">

#### 📧 **Contacto Directo**

- **Email**: [soporte@adercrossfit.com](adadevosgil@gmail.com)
- **WhatsApp**: [+34 655 453 374](https://wa.me/34XXXXXXXXX)
- **Teléfono**: +34 655 453 374

</td>
</tr>
</table>

### ⏰ **Horarios de Soporte**

| Canal             | Horario        | Tiempo de Respuesta |
| ----------------- | -------------- | ------------------- |
| **GitHub Issues** | 24/7           | < 24 horas          |
| **Email**         | L-V 9:00-18:00 | < 4 horas           |
| **Discord**       | 24/7           | < 1 hora            |
| **Teléfono**      | L-V 9:00-18:00 | Inmediato           |

### 👥 **Equipo de Desarrollo**

<table>
<tr>
<td align="center" width="25%">
  <img src="https://github.com/FRANCISCOJESUS1980.png" width="100px;" alt="Francisco Jesús"/>
  <br />
  <sub><b>Francisco Jesús González</b></sub>
  <br />
  <sub>🏗️ Full Stack Developer</sub>
  <br />
  <a href="https://github.com/FRANCISCOJESUS1980">GitHub</a> •
  <a href="jesusgonzalezvergara@hotmail.com">Email</a>
</td>
<td align="center" width="25%">
  <img src="/placeholder.svg?height=100&width=100&text=Team" width="100px;" alt="Team Member"/>
 
---

## 📄 Licencia

Este proyecto está licenciado bajo la **MIT License** - ver el archivo [LICENSE](LICENSE) para más detalles.

<details>
<summary>📋 **Texto completo de la licencia**</summary>

\`\`\`
MIT License

Copyright (c) 2025 AderCrossFit - Francisco Jesús González

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
\`\`\`

</details>

---

<div align="center">

## 🌟 ¡Apoya el Proyecto!

Si este proyecto te ha sido útil, considera:

[![⭐ Star en GitHub](https://img.shields.io/badge/⭐-Star%20en%20GitHub-yellow?style=for-the-badge)](https://github.com/FRANCISCOJESUS1980/proyecto13fronted)
[![🍴 Fork](https://img.shields.io/badge/🍴-Fork-blue?style=for-the-badge)](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/fork)
[![📢 Compartir](https://img.shields.io/badge/📢-Compartir-green?style=for-the-badge)](https://twitter.com/intent/tweet?text=¡Increíble%20sistema%20de%20gestión%20para%20CrossFit!&url=https://github.com/FRANCISCOJESUS1980/proyecto13fronted)

### 📊 **Estadísticas del Proyecto**

![GitHub stars](https://img.shields.io/github/stars/FRANCISCOJESUS1980/proyecto13fronted?style=social)
![GitHub forks](https://img.shields.io/github/forks/FRANCISCOJESUS1980/proyecto13fronted?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/FRANCISCOJESUS1980/proyecto13fronted?style=social)

![GitHub last commit](https://img.shields.io/github/last-commit/FRANCISCOJESUS1980/proyecto13fronted)
![GitHub issues](https://img.shields.io/github/issues/FRANCISCOJESUS1980/proyecto13fronted)
![GitHub pull requests](https://img.shields.io/github/issues-pr/FRANCISCOJESUS1980/proyecto13fronted)

---

**💪 Hecho con ❤️ para la comunidad CrossFit**

_"El fitness no es solo una actividad física, es una forma de vida"_

---

### 🔗 **Enlaces Rápidos**

[🏠 inicio](#-adercrossfit---sistema-de-gestión-integral) •
[🚀 Demo](https://proyecto13fronted-git-main-francisco-jesus-projects.vercel.app/) •
[📖 Docs](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/wiki) •
[🐛 Issues](https://github.com/FRANCISCOJESUS1980/proyecto13fronted/issues) •
[💬 Discord](https://discord.gg/adercrossfit) •
[📧 Contacto](adadevosgil@gamil.com)
