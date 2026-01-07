# Tiemply Landing Page

Landing page para tiemply.com - Control horario para empresas.

## Tecnologías

- **Vue.js 3** - Framework frontend
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **Vue Router** - Enrutamiento SPA

## Requisitos

- Node.js 18+
- npm o pnpm

## Instalación

```bash
# Clonar el repositorio
cd tiemply-landing

# Copiar fuentes del esqueleto (opcional pero recomendado)
cp -r ../landpage/assets/fonts/metropolis/* src/assets/fonts/metropolis/

# Copiar favicon
cp ../landpage/assets/img/favicon.png public/

# Instalar dependencias
npm install

# Crear archivo de entorno
cp .env.example .env
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El servidor estará en http://localhost:3000
```

## Producción

```bash
# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

## Docker

```bash
# Construir imagen
docker build -f Dockerfile.prod -t tiemply-landing .

# Ejecutar contenedor
docker run -p 80:80 tiemply-landing
```

## Estructura del proyecto

```
tiemply-landing/
├── public/                 # Archivos estáticos
│   └── favicon.png
├── src/
│   ├── assets/
│   │   ├── css/           # Estilos SCSS
│   │   └── fonts/         # Fuentes Metropolis
│   ├── components/
│   │   ├── sections/      # Secciones de la landing
│   │   ├── TheNavbar.vue
│   │   └── TheFooter.vue
│   ├── composables/       # Composables Vue
│   ├── router/            # Configuración de rutas
│   ├── services/          # Servicios API
│   ├── views/             # Páginas
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── Dockerfile.prod
└── nginx.conf
```

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con Hero, Features, Pricing, FAQ, Contact |
| `/registro` | Formulario de registro de empresas en 3 pasos |
| `/registro/exito` | Confirmación de registro exitoso |
| `/precios` | Página de precios detallada |
| `/caracteristicas` | Todas las características del producto |

## Variables de entorno

```env
VITE_API_URL=https://admin.tiemply.com/api
VITE_APP_URL=https://app.tiemply.com
VITE_APP_NAME=Tiemply
```

## API Endpoints utilizados

- `POST /company-registration-requests` - Registro de nueva empresa
- `GET /company-registration-requests/{id}` - Estado de solicitud

## Despliegue

La landing page se despliega como parte del stack Docker de Tiemply:

```bash
# Desde el directorio tiemply-api
docker compose -f docker-compose.prod.yml up -d landing
```

Se sirve en `https://tiemply.com` a través del reverse proxy Nginx.
