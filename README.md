# 🚗 Aurum POS - Sistema de Punto de Venta para Lavaderos

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-20%2B-green.svg)
![React](https://img.shields.io/badge/react-18%2B-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5%2B-blue.svg)

**Sistema completo de punto de venta diseñado específicamente para lavaderos de autos en Paraguay** con cumplimiento fiscal completo y gestión integral del negocio.

## ✨ Características Principales

### 🏢 **Sistema POS Completo**
- **Gestión de Servicios**: Catálogo completo de servicios de lavado con precios y duraciones
- **Órdenes de Trabajo**: Seguimiento desde recepción hasta entrega
- **Facturación**: Sistema de ventas con cumplimiento fiscal paraguayo
- **Caja**: Control de ingresos y egresos con reportes detallados

### 👥 **Gestión de Clientes**
- **Base de Datos de Clientes**: Información completa con historial de servicios
- **Régimen Turismo**: Soporte especial para clientes extranjeros
- **Vehículos**: Registro y seguimiento de vehículos por cliente
- **Historial**: Seguimiento completo de servicios realizados

### 📋 **Inventario y Stock**
- **Gestión de Inventario**: Control de productos y materiales
- **Alertas de Stock**: Notificaciones de stock bajo
- **Movimientos**: Registro de entradas y salidas
- **Reportes**: Análisis de consumo y costos

### 🇵🇾 **Cumplimiento Fiscal Paraguay**
- **Validación RUC**: Sistema de validación automática de RUC paraguayo
- **Timbrado**: Control automático de vigencia de timbrados fiscales
- **Facturación Electrónica**: Preparado para DNIT (SET Paraguay)
- **Reportes Fiscales**: Informes para cumplimiento tributario

### 📊 **Dashboard y Reportes**
- **Analytics**: Métricas de negocio en tiempo real
- **Reportes**: Ventas, servicios, clientes y inventario
- **Gráficos**: Visualización de datos con charts interactivos
- **Exportación**: Datos exportables para análisis

### 🔐 **Autenticación Multi-Usuario**
- **Roles**: Sistema de roles (Admin, Operador)
- **Sesiones Seguras**: Autenticación basada en sesiones
- **Control de Acceso**: Permisos granulares por función
- **Auditoría**: Log de acciones de usuarios

## 🚀 **Tecnologías**

### **Frontend**
- **React 18** con TypeScript
- **Vite** para desarrollo y build optimizado
- **Shadcn/ui** + **Tailwind CSS** para UI moderna
- **TanStack Query** para gestión de estado del servidor
- **Wouter** para routing ligero
- **React Hook Form** + **Zod** para formularios

### **Backend**
- **Node.js** + **Express.js**
- **TypeScript** para seguridad de tipos
- **Drizzle ORM** para base de datos
- **PostgreSQL** (Neon serverless)
- **Passport.js** para autenticación

### **Base de Datos**
- **PostgreSQL** con esquemas optimizados
- **Migraciones automáticas** con Drizzle
- **Backup automático** y versionado
- **Escalabilidad** para crecimiento del negocio

## 📦 **Instalación y Desarrollo**

### **Prerrequisitos**
- Node.js 20+
- PostgreSQL (o usar DATABASE_URL de Neon)
- Variables de entorno configuradas

### **Instalación**
```bash
# Clonar repositorio
git clone https://github.com/[tu-usuario]/aurum-pos.git
cd aurum-pos

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Configurar base de datos
npm run db:push

# Iniciar desarrollo
npm run dev
```

### **Variables de Entorno Requeridas**
```env
# Base de datos
DATABASE_URL=postgresql://user:password@host:port/database

# Sesiones (mínimo 32 caracteres)
SESSION_SECRET=tu_clave_secreta_super_segura_aqui

# DNIT/SET Paraguay (opcional, mínimo 32 caracteres)
DNIT_ENCRYPTION_KEY=tu_clave_encriptacion_dnit_aqui

# Ambiente
NODE_ENV=production
PORT=5000
```

## 🎯 **Uso del Sistema**

### **Primer Acceso**
1. **Usuario Admin**: `admin`
2. **Contraseña**: `aurum1705`
3. **Configurar Empresa**: Ir a Configuración → Datos de Empresa
4. **Agregar Servicios**: Crear catálogo de servicios
5. **Registrar Usuarios**: Crear cuentas para operadores

### **Flujo de Trabajo Típico**
1. **Recepción**: Registrar cliente y vehículo
2. **Orden de Trabajo**: Seleccionar servicios
3. **Proceso**: Seguimiento del lavado
4. **Entrega**: Facturación y cobro
5. **Reportes**: Análisis diario/mensual

## 🏗️ **Arquitectura del Sistema**

### **Estructura de Archivos**
```
aurum-pos/
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/       # Páginas principales
│   │   ├── lib/         # Utilidades y configuración
│   │   └── hooks/       # Custom hooks
├── server/              # Backend Express
│   ├── routes.ts        # Rutas API
│   ├── storage.ts       # Capa de datos
│   └── index.ts         # Servidor principal
├── shared/              # Tipos compartidos
│   └── schema.ts        # Esquemas Drizzle + Zod
└── package.json
```

### **API Endpoints**
- `GET /api/auth/*` - Autenticación
- `GET|POST /api/customers` - Gestión de clientes
- `GET|POST /api/services` - Servicios de lavado
- `GET|POST /api/work-orders` - Órdenes de trabajo
- `GET|POST /api/sales` - Ventas y facturación
- `GET|POST /api/inventory` - Inventario
- `GET /api/reports/*` - Reportes y analytics

## 🇵🇾 **Características Específicas para Paraguay**

### **Validación RUC**
- Algoritmo de validación automática
- Formato correcto: 12345678-9
- Verificación de dígito verificador

### **Timbrado Fiscal**
- Control automático de vigencia
- Bloqueo de facturación si está vencido
- Alertas de próximo vencimiento

### **Régimen de Turismo**
- Identificación de clientes extranjeros
- Aplicación de reglas fiscales especiales
- Documentación requerida

## 📈 **Beneficios del Sistema**

### **Para el Negocio**
- ✅ **Control Total**: Visibilidad completa de operaciones
- ✅ **Cumplimiento Fiscal**: Sin preocupaciones tributarias
- ✅ **Eficiencia**: Procesos optimizados y automatizados
- ✅ **Crecimiento**: Datos para tomar mejores decisiones

### **Para los Clientes**
- ✅ **Servicio Profesional**: Experiencia moderna y confiable
- ✅ **Transparencia**: Precios claros y facturación correcta
- ✅ **Historial**: Registro de todos los servicios
- ✅ **Facturación Legal**: Documentos fiscales válidos

## 🛠️ **Soporte y Mantenimiento**

### **Actualizaciones**
- Actualizaciones regulares de seguridad
- Nuevas funcionalidades basadas en feedback
- Compatibilidad con cambios fiscales

### **Backup y Seguridad**
- Backup automático de base de datos
- Cifrado de datos sensibles
- Sesiones seguras y control de acceso

## 📄 **Licencia**

MIT License - Ver [LICENSE.txt](LICENSE.txt) para detalles.

## 🤝 **Contribuciones**

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 📞 **Contacto**

Para soporte técnico o consultas comerciales:
- 📧 Email: [tu-email]
- 💬 Issues: [GitHub Issues](https://github.com/[tu-usuario]/aurum-pos/issues)

---

**Desarrollado con ❤️ para lavaderos paraguayos**