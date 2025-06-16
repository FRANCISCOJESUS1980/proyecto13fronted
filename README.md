# 🏋️‍♂️ AderCrossFit - Sistema de Gestión Integral

**Sistema completo de gestión para box de CrossFit con funcionalidades avanzadas de administración, seguimiento de usuarios y comunicación en tiempo real.**

[🚀 Demo en Vivo](#) • [📖 Documentación](#documentación) • [🐛 Reportar Bug](#issues) • [💡 Solicitar Feature](#features)

</div>---

## 📋 Tabla de Contenidos

- [🎯 Características Principales](#-características-principales)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [📱 Funcionalidades por Módulo](#-funcionalidades-por-módulo)
- [👥 Roles y Permisos](#-roles-y-permisos)
- [🔧 Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [📊 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔐 Autenticación y Seguridad](#-autenticación-y-seguridad)
- [📡 API y Comunicación](#-api-y-comunicación)
- [🎨 UI/UX y Diseño](#-uiux-y-diseño)
- [⚡ Optimizaciones de Performance](#-optimizaciones-de-performance)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)

---

## 🎯 Características Principales

### 🏆 **Sistema Integral de CrossFit**

- **Gestión completa de usuarios** con roles diferenciados
- **Sistema de reservas** de clases en tiempo real
- **Seguimiento de progreso físico** y marcas personales
- **Comunicación integrada** (chat grupal y mensajes privados)
- **E-commerce** para productos del box
- **Panel administrativo** completo con analytics

### ⚡ **Tecnología de Vanguardia**

- **React 18** con Hooks avanzados y Context API
- **Arquitectura modular** con feature-based organization
- **Real-time communication** con WebSockets
- **Responsive design** mobile-first
- **Performance optimizado** con lazy loading y memoización

### 🔒 **Seguridad y Compliance**

- **Autenticación JWT** robusta
- **Gestión de consentimientos** GDPR compliant
- **Protección de datos médicos** con encriptación
- **Control de acceso** granular por roles

---

## 🏗️ Arquitectura del Sistema

```mermaid
Diagram.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-r4k8{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-r4k8 .error-icon{fill:#552222;}#mermaid-diagram-r4k8 .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-r4k8 .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-r4k8 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-r4k8 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-r4k8 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-r4k8 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-r4k8 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-r4k8 .marker{fill:#666;stroke:#666;}#mermaid-diagram-r4k8 .marker.cross{stroke:#666;}#mermaid-diagram-r4k8 svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-r4k8 p{margin:0;}#mermaid-diagram-r4k8 .label{font-family:var(--font-geist-sans);color:#000000;}#mermaid-diagram-r4k8 .cluster-label text{fill:#333;}#mermaid-diagram-r4k8 .cluster-label span{color:#333;}#mermaid-diagram-r4k8 .cluster-label span p{background-color:transparent;}#mermaid-diagram-r4k8 .label text,#mermaid-diagram-r4k8 span{fill:#000000;color:#000000;}#mermaid-diagram-r4k8 .node rect,#mermaid-diagram-r4k8 .node circle,#mermaid-diagram-r4k8 .node ellipse,#mermaid-diagram-r4k8 .node polygon,#mermaid-diagram-r4k8 .node path{fill:#eee;stroke:#999;stroke-width:1px;}#mermaid-diagram-r4k8 .rough-node .label text,#mermaid-diagram-r4k8 .node .label text{text-anchor:middle;}#mermaid-diagram-r4k8 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-diagram-r4k8 .node .label{text-align:center;}#mermaid-diagram-r4k8 .node.clickable{cursor:pointer;}#mermaid-diagram-r4k8 .arrowheadPath{fill:#333333;}#mermaid-diagram-r4k8 .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-diagram-r4k8 .flowchart-link{stroke:#666;fill:none;}#mermaid-diagram-r4k8 .edgeLabel{background-color:white;text-align:center;}#mermaid-diagram-r4k8 .edgeLabel p{background-color:white;}#mermaid-diagram-r4k8 .edgeLabel rect{opacity:0.5;background-color:white;fill:white;}#mermaid-diagram-r4k8 .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#mermaid-diagram-r4k8 .cluster rect{fill:hsl(0, 0%, 98.9215686275%);stroke:#707070;stroke-width:1px;}#mermaid-diagram-r4k8 .cluster text{fill:#333;}#mermaid-diagram-r4k8 .cluster span{color:#333;}#mermaid-diagram-r4k8 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:var(--font-geist-sans);font-size:12px;background:hsl(-160, 0%, 93.3333333333%);border:1px solid #707070;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-diagram-r4k8 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-r4k8 .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-r4k8 .marker,#mermaid-diagram-r4k8 marker,#mermaid-diagram-r4k8 marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r4k8 .label,#mermaid-diagram-r4k8 text,#mermaid-diagram-r4k8 text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-r4k8 .background,#mermaid-diagram-r4k8 rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-r4k8 .entityBox,#mermaid-diagram-r4k8 .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-r4k8 .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-r4k8 .label-container,#mermaid-diagram-r4k8 rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r4k8 line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r4k8 :root{--mermaid-font-family:var(--font-geist-sans);}Frontend ReactAPI GatewayAuthentication ServiceUser ManagementClass Booking SystemE-commerce EngineCommunication HubMongoDB - UsersMongoDB - ClassesMongoDB - ProductsMongoDB - MessagesWebSocket ServerFile StorageMedia Assets
```

### 🎯 **Principios de Diseño**

- **🔄 Separation of Concerns**: Cada módulo tiene responsabilidades específicas
- **📦 Feature-Based Architecture**: Organización por funcionalidades
- **🔌 Dependency Injection**: Contextos React para gestión de estado
- **⚡ Performance First**: Optimizaciones en cada capa
- **🛡️ Security by Design**: Seguridad integrada desde el diseño

---

## 🚀 Instalación y Configuración

### 📋 **Prerrequisitos**

```shellscript
Node.js >= 18.0.0
npm >= 9.0.0
MongoDB >= 6.0.0
Git >= 2.30.0
```

### ⚙️ **Instalación Rápida**

```shellscript
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/adercrossfit.git
cd adercrossfit

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 4. Inicializar base de datos
npm run db:seed

# 5. Iniciar en modo desarrollo
npm run dev
```

### 🔧 **Variables de Entorno**

```plaintext
# Base de datos
MONGODB_URI=mongodb://localhost:27017/adercrossfit
DB_NAME=adercrossfit

# Autenticación
JWT_SECRET=tu_jwt_secret_super_seguro
JWT_EXPIRES_IN=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_password

# Storage
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# WebSocket
SOCKET_PORT=3001
CORS_ORIGIN=http://localhost:3000
```

---

## 📱 Funcionalidades por Módulo

### 🏠 **Módulo Principal (Home)**

- **Landing page** responsive con información del box
- **Galería de imágenes** optimizada
- **Testimonios** de usuarios
- **Información de contacto** y ubicación

### 👤 **Gestión de Usuarios**

#### 📝 **Registro y Autenticación**

```javascript
// Características del sistema de auth
- Registro con validación de email
- Login con JWT tokens
- Recuperación de contraseña
- Verificación de cuenta por email
- Sesiones persistentes
```

#### 🏥 **Información Médica**

- **Historial médico** completo
- **Alergias y condiciones** especiales
- **Contactos de emergencia**
- **Seguimiento de lesiones**
- **Exportación a PDF** para profesionales

#### 📊 **Aspecto Físico y Progreso**

- **Medidas corporales** con tracking temporal
- **Fotos de progreso** con comparativas
- **Gráficos de evolución** interactivos
- **Metas personalizadas** y seguimiento

### 🏋️‍♂️ **Sistema de Clases**

#### 📅 **Reservas Inteligentes**

```javascript
// Funcionalidades avanzadas
- Calendario interactivo
- Reservas en tiempo real
- Lista de espera automática
- Notificaciones push
- Cancelaciones con política flexible
```

#### 👨‍🏫 **Gestión de Entrenadores**

- **Perfiles de coaches** con especialidades
- **Horarios personalizados**
- **Evaluaciones de usuarios**
- **Comunicación directa**

### 🛒 **E-commerce Integrado**

#### 🛍️ **Tienda Online**

- **Catálogo de productos** con filtros avanzados
- **Carrito de compras** persistente
- **Checkout seguro** con múltiples métodos de pago
- **Gestión de inventario** en tiempo real
- **Sistema de descuentos** y promociones

#### 📦 **Gestión de Pedidos**

- **Tracking de envíos**
- **Historial de compras**
- **Facturación automática**
- **Devoluciones y cambios**

### 💬 **Sistema de Comunicación**

#### 🗨️ **Chat en Tiempo Real**

```javascript
// Características del chat
- Mensajes instantáneos con WebSocket
- Emojis y reacciones
- Historial persistente
- Moderación automática
- Notificaciones push
```

#### 📧 **Mensajes Privados**

- **Comunicación directa** usuario-administración
- **Adjuntos de archivos**
- **Estados de lectura**
- **Respuestas automáticas**

### ⏱️ **Timer CrossFit**

- **EMOM, AMRAP, Tabata** y más modalidades
- **Sonidos personalizables**
- **Historial de WODs**
- **Compartir entrenamientos**

### 🏆 **Marcas Personales**

- **Registro de PRs** por movimiento
- **Gráficos de progreso**
- **Comparativas con otros usuarios**
- **Metas y desafíos**

---

## 👥 Roles y Permisos

### 🔐 **Sistema de Roles Jerárquico**

```javascript
const ROLES = {
  SUPER_ADMIN: {
    level: 5,
    permissions: ['*'], // Acceso total
    description: 'Creador del sistema'
  },
  ADMIN: {
    level: 4,
    permissions: [
      'users.manage',
      'classes.manage',
      'products.manage',
      'billing.view',
      'reports.generate'
    ],
    description: 'Administrador del box'
  },
  COACH: {
    level: 3,
    permissions: ['classes.view', 'users.view', 'medical.view'],
    description: 'Entrenador certificado'
  },
  MEMBER: {
    level: 2,
    permissions: ['classes.book', 'profile.edit', 'chat.participate'],
    description: 'Miembro activo'
  },
  GUEST: {
    level: 1,
    permissions: ['classes.view', 'products.view'],
    description: 'Usuario no registrado'
  }
}
```

### 🛡️ **Control de Acceso**

```javascript
// Middleware de autorización
const requireRole = (minLevel) => {
  return (req, res, next) => {
    const userRole = req.user.role
    if (ROLES[userRole].level >= minLevel) {
      next()
    } else {
      res.status(403).json({ error: 'Acceso denegado' })
    }
  }
}
```

---

## 🔧 Tecnologías Utilizadas

### 🎨 **Frontend Stack**

| Tecnología           | Versión  | Propósito           |
| -------------------- | -------- | ------------------- |
| **React**            | 18.3.1   | Framework principal |
| **React Router**     | 6.x      | Navegación SPA      |
| **Context API**      | Built-in | Gestión de estado   |
| **CSS Modules**      | -        | Estilos modulares   |
| **Lucide React**     | Latest   | Iconografía         |
| **Socket.io Client** | 4.x      | WebSocket cliente   |

### ⚙️ **Backend Stack**

| Tecnología     | Versión | Propósito          |
| -------------- | ------- | ------------------ |
| **Node.js**    | 18+     | Runtime JavaScript |
| **Express.js** | 4.x     | Framework web      |
| **MongoDB**    | 6.x     | Base de datos      |
| **Mongoose**   | 7.x     | ODM para MongoDB   |
| **Socket.io**  | 4.x     | WebSocket servidor |
| **JWT**        | Latest  | Autenticación      |
| **Bcrypt**     | Latest  | Hash de passwords  |
| **Multer**     | Latest  | Upload de archivos |

### 🛠️ **Herramientas de Desarrollo**

```json
{
  "build": "Vite - Build tool ultrarrápido",
  "linting": "ESLint - Análisis de código",
  "formatting": "Prettier - Formateo automático",
  "testing": "Jest + React Testing Library",
  "deployment": "Docker + Nginx",
  "monitoring": "Winston + Morgan"
}
```

---

## 📊 Estructura del Proyecto

```plaintext
adercrossfit/
├── 📁 src/
│   ├── 📁 components/          # Componentes reutilizables
│   │   ├── 📁 Button/
│   │   ├── 📁 Header/
│   │   ├── 📁 Loading/
│   │   └── 📁 Modal/
│   ├── 📁 pages/              # Páginas principales
│   │   ├── 📁 Home/
│   │   ├── 📁 Register/
│   │   │   └── 📁 sections/   # Secciones del dashboard
│   │   │       ├── 📁 Dashboard/
│   │   │       ├── 📁 Medico/
│   │   │       ├── 📁 Aspecto/
│   │   │       │   └── 📁 features/
│   │   │       │       └── 📁 physical-stats/
│   │   │       ├── 📁 Chat/
│   │   │       └── 📁 Timer/
│   │   ├── 📁 Administracion/
│   │   │   ├── 📁 AdminClases/
│   │   │   ├── 📁 AdminUsuarios/
│   │   │   └── 📁 AdminProductos/
│   │   ├── 📁 Clases/
│   │   ├── 📁 Productos/
│   │   └── 📁 Videos/
│   ├── 📁 context/            # Contextos globales
│   │   ├── ConsentContext.jsx
│   │   └── CartContext.jsx
│   ├── 📁 services/           # Servicios API
│   │   └── 📁 Api/
│   ├── 📁 utils/              # Utilidades
│   ├── 📁 hooks/              # Custom hooks
│   └── 📁 styles/             # Estilos globales
├── 📁 public/                 # Assets estáticos
├── 📁 server/                 # Backend Node.js
│   ├── 📁 models/
│   ├── 📁 routes/
│   ├── 📁 middleware/
│   └── 📁 controllers/
├── 📄 package.json
├── 📄 vite.config.js
└── 📄 README.md
```

### 🏗️ **Arquitectura Feature-Based**

Cada funcionalidad principal está organizada como un módulo independiente:

```plaintext
features/
├── 📁 admin/
│   ├── 📁 components/
│   ├── 📁 context/
│   ├── 📁 hooks/
│   └── 📁 utils/
├── 📁 chat/
├── 📁 dashboard/
├── 📁 mensajes/
└── 📁 videos/
```

---

## 🔐 Autenticación y Seguridad

### 🛡️ **Sistema de Autenticación JWT**

```javascript
// Flujo de autenticación
const authFlow = {
  1: 'Usuario envía credenciales',
  2: 'Servidor valida y genera JWT',
  3: 'Token almacenado en localStorage',
  4: 'Requests incluyen Authorization header',
  5: 'Middleware valida token en cada request'
}
```

### 🔒 **Medidas de Seguridad**

- **🔐 Encriptación de passwords** con bcrypt (salt rounds: 12)
- **🛡️ Validación de entrada** en frontend y backend
- **🚫 Protección CSRF** con tokens
- **⏰ Expiración de sesiones** configurable
- **📝 Logs de seguridad** detallados
- **🔍 Rate limiting** para prevenir ataques

### 📋 **Gestión de Consentimientos GDPR**

```javascript
// Sistema de consentimientos
const consentTypes = {
  DATA_PROCESSING: 'Procesamiento de datos personales',
  IMAGE_RIGHTS: 'Derechos de imagen',
  MARKETING: 'Comunicaciones de marketing',
  MEDICAL_DATA: 'Datos médicos sensibles'
}
```

---

## 📡 API y Comunicación

### 🔌 **Endpoints Principales**

```javascript
// Estructura de la API REST
const API_ROUTES = {
  // Autenticación
  'POST /api/auth/login': 'Iniciar sesión',
  'POST /api/auth/register': 'Registro de usuario',
  'POST /api/auth/refresh': 'Renovar token',

  // Usuarios
  'GET /api/users': 'Listar usuarios',
  'GET /api/users/:id': 'Obtener usuario',
  'PUT /api/users/:id': 'Actualizar usuario',

  // Clases
  'GET /api/classes': 'Listar clases',
  'POST /api/classes/:id/book': 'Reservar clase',
  'DELETE /api/classes/:id/cancel': 'Cancelar reserva',

  // Productos
  'GET /api/products': 'Catálogo de productos',
  'POST /api/orders': 'Crear pedido',

  // Comunicación
  'GET /api/messages/private': 'Mensajes privados',
  'POST /api/messages/send': 'Enviar mensaje'
}
```

### ⚡ **WebSocket Events**

```javascript
// Eventos en tiempo real
const SOCKET_EVENTS = {
  // Chat
  chatMessage: 'Nuevo mensaje en chat grupal',
  messageUpdated: 'Mensaje editado',
  messageDeleted: 'Mensaje eliminado',

  // Clases
  classBooked: 'Nueva reserva de clase',
  classUpdated: 'Clase modificada',

  // Notificaciones
  notification: 'Notificación general',
  privateMessage: 'Mensaje privado recibido'
}
```

---

## 🎨 UI/UX y Diseño

### 🎯 **Principios de Diseño**

- **📱 Mobile First**: Diseño responsive desde móvil
- **♿ Accesibilidad**: WCAG 2.1 AA compliance
- **⚡ Performance**: Carga rápida y animaciones fluidas
- **🎨 Consistencia**: Design system unificado
- **👤 User-Centered**: Enfoque en experiencia del usuario

### 🎨 **Sistema de Colores**

```css
:root {
  /* Colores principales */
  --primary-color: #3b82f6; /* Azul principal */
  --secondary-color: #10b981; /* Verde éxito */
  --accent-color: #f59e0b; /* Amarillo acento */
  --danger-color: #ef4444; /* Rojo peligro */

  /* Colores neutros */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-900: #111827;

  /* Modo oscuro */
  --dark-bg: #121212;
  --dark-surface: #1e1e1e;
  --dark-text: #ffffff;
}
```

### 📐 **Tipografía y Espaciado**

```css
/* Sistema tipográfico */
.text-xs {
  font-size: 0.75rem;
}
.text-sm {
  font-size: 0.875rem;
}
.text-base {
  font-size: 1rem;
}
.text-lg {
  font-size: 1.125rem;
}
.text-xl {
  font-size: 1.25rem;
}

/* Sistema de espaciado */
.space-1 {
  margin: 0.25rem;
}
.space-2 {
  margin: 0.5rem;
}
.space-4 {
  margin: 1rem;
}
.space-8 {
  margin: 2rem;
}
```

---

## ⚡ Optimizaciones de Performance

### 🚀 **Técnicas Implementadas**

#### 🔄 **React Optimizations**

```javascript
// Memoización de componentes
const OptimizedComponent = React.memo(({ data }) => {
  return <div>{data.name}</div>
})

// Custom hooks optimizados
const useOptimizedData = () => {
  const context = useContext(DataContext)

  const memoizedData = useMemo(
    () => ({
      filteredItems: context.items.filter((item) => item.active),
      totalCount: context.items.length
    }),
    [context.items]
  )

  return memoizedData
}
```

#### 📦 **Code Splitting**

```javascript
// Lazy loading de rutas
const AdminPanel = lazy(() => import('./pages/Admin/AdminPanel'))
const UserDashboard = lazy(() => import('./pages/Dashboard/UserDashboard'))

// Suspense boundaries
;<Suspense fallback={<Loading />}>
  <AdminPanel />
</Suspense>
```

#### 🖼️ **Image Optimization**

- **WebP format** con fallback a JPEG
- **Lazy loading** con Intersection Observer
- **Responsive images** con srcset
- **Placeholder blur** durante carga

### 📊 **Métricas de Performance**

| Métrica                      | Objetivo | Actual |
| ---------------------------- | -------- | ------ |
| **First Contentful Paint**   | < 1.5s   | 1.2s   |
| **Largest Contentful Paint** | < 2.5s   | 2.1s   |
| **Cumulative Layout Shift**  | < 0.1    | 0.05   |
| **Time to Interactive**      | < 3.5s   | 2.8s   |

---

## 🧪 Testing

### 🔬 **Estrategia de Testing**

```javascript
// Estructura de tests
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── utils/
├── __mocks__/
└── setupTests.js
```

#### 🧩 **Unit Tests**

```javascript
// Ejemplo de test de componente
import { render, screen } from '@testing-library/react'
import { Button } from '../components/Button/Button'

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
})
```

#### 🔗 **Integration Tests**

```javascript
// Test de flujo completo
describe('User Registration Flow', () => {
  test('complete registration process', async () => {
    render(<App />)

    // Navegar a registro
    fireEvent.click(screen.getByText('Registrarse'))

    // Llenar formulario
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    })

    // Enviar formulario
    fireEvent.click(screen.getByText('Crear cuenta'))

    // Verificar redirección
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })
  })
})
```

### 📈 **Coverage Goals**

- **Unit Tests**: > 80% coverage
- **Integration Tests**: Flujos críticos cubiertos
- **E2E Tests**: Scenarios principales automatizados

---

## 🚀 Deployment

### 🐳 **Containerización con Docker**

```dockerfile

FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### ⚙️ **Docker Compose**

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - '80:80'
    depends_on:
      - backend

  backend:
    build: ./server
    ports:
      - '3001:3001'
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/adercrossfit
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
    ports:
      - '27017:27017'

volumes:
  mongo_data:
```

### 🌐 **Configuración de Nginx**

```plaintext
server {
    listen 80;
    server_name adercrossfit.com;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;

    # Static files
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;

        # Cache headers
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy
    location /api/ {
        proxy_pass http://backend:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # WebSocket proxy
    location /socket.io/ {
        proxy_pass http://backend:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## 🤝 Contribución

### 🔄 **Workflow de Desarrollo**

```shellscript
# 1. Fork del repositorio
git clone https://github.com/tu-usuario/adercrossfit.git

# 2. Crear rama feature
git checkout -b feature/nueva-funcionalidad

# 3. Desarrollar y commitear
git add .
git commit -m "feat: agregar nueva funcionalidad"

# 4. Push y Pull Request
git push origin feature/nueva-funcionalidad
```

### 📝 **Convenciones de Commit**

```plaintext
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
style: cambios de formato
refactor: refactorización de código
test: agregar o modificar tests
chore: tareas de mantenimiento
```

### 🎯 **Guidelines de Código**

- **📏 ESLint**: Seguir reglas de linting
- **🎨 Prettier**: Formateo automático
- **📝 JSDoc**: Documentar funciones complejas
- **🧪 Tests**: Incluir tests para nuevas funcionalidades
- **♿ A11y**: Mantener accesibilidad

---

## 📊 Roadmap

### 🎯 **Q1 2025**

- **📱 App móvil nativa** (React Native)
- **🔔 Push notifications** avanzadas
- **📊 Analytics dashboard** mejorado
- **🤖 Chatbot** con IA para soporte

### 🎯 **Q2 2025**

- **💳 Pagos integrados** (Stripe/PayPal)
- **📅 Calendario avanzado** con sincronización
- **🏆 Sistema de gamificación**
- **📈 Reportes avanzados**

### 🎯 **Q3 2025**

- **🌐 Multi-idioma** (i18n)
- **🔗 Integraciones** con wearables
- **📱 PWA** completa
- **🤝 API pública** para terceros

---

## 📞 Soporte y Contacto

### 🆘 **Obtener Ayuda**

- **📖 Documentación**: [Wiki del proyecto](#)
- **🐛 Issues**: [GitHub Issues](#)
- **💬 Discusiones**: [GitHub Discussions](#)
- **📧 Email**: [soporte@adercrossfit.com](mailto:soporte@adercrossfit.com)

### 👥 **Equipo de Desarrollo**

- **🏗️ Arquitecto Principal**: [Tu Nombre](#)
- **🎨 UI/UX Designer**: [Nombre](#)
- **⚙️ Backend Developer**: [Nombre](#)
- **📱 Mobile Developer**: [Nombre](#)

---

## 📄 Licencia

Este proyecto está licenciado bajo la **MIT License** - ver el archivo [LICENSE](LICENSE) para más detalles.

```plaintext
MIT License

Copyright (c) 2024 AderCrossFit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div>**⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella! ⭐**

**Hecho con ❤️ para la comunidad CrossFit**

[🔝 Volver arriba](#-adercrossfit---sistema-de-gestión-integral)

</div>---

## 📊 Estadísticas del Proyecto
