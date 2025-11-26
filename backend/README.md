# Backend - Turismo al Cielo

Backend Node.js + Express + TypeScript + Prisma + MySQL

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar base de datos (crear tablas)
npm run db:push

# Poblar base de datos con datos iniciales
npx tsx prisma/seed.ts

# Iniciar servidor en desarrollo
npm run dev
```

## 📡 API Endpoints

### Paquetes Turísticos
- `GET /api/packages` - Listar todos los paquetes
- `GET /api/packages?featured=true` - Solo paquetes destacados
- `GET /api/packages/:slug` - Obtener paquete por slug
- `POST /api/packages` - Crear paquete

### Reservas
- `POST /api/bookings` - Crear reserva
- `GET /api/bookings/:code` - Obtener reserva por código

### Gemini IA
- `POST /api/gemini/chat` - Chatbot
  ```json
  { "message": "¿Qué hacer en Cusco?" }
  ```
- `POST /api/gemini/itinerary` - Planificador de viajes
  ```json
  {
    "destination": "Cusco",
    "days": "3",
    "style": "aventura"
  }
  ```

### Foro
- `GET /api/forum` - Listar posts
- `POST /api/forum` - Crear post
- `POST /api/forum/:postId/comments` - Crear comentario

## 🔧 Configuración

Archivo `.env`:
```env
DATABASE_URL="mysql://user:password@host:port/database"
GEMINI_API_KEY="tu-api-key"
PORT=3000
FRONTEND_URL="http://localhost:8080"
```

## 📊 Base de Datos

### Modelos
- **Package**: Paquetes turísticos
- **Booking**: Reservas
- **ForumPost**: Posts del foro
- **ForumComment**: Comentarios

### Comandos Prisma
```bash
# Ver base de datos en navegador
npm run db:studio

# Sincronizar esquema con DB
npm run db:push

# Generar cliente Prisma
npx prisma generate
```

## 🧪 Testing

```bash
# Health check
curl http://localhost:3000/health

# Listar paquetes
curl http://localhost:3000/api/packages

# Chatbot
curl -X POST http://localhost:3000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hola"}'
```

## 📝 Notas

- Rate limiting: 100 req/15min general, 10 req/min para Gemini
- Sin autenticación compleja (simplificado para desarrollo)
- Base de datos MySQL en Clever Cloud
