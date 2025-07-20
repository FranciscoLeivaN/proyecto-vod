# Proyecto VOD

Esta es una aplicación de video bajo demanda con backend en Express y frontend en React utilizando Vite.

## Estructura del Proyecto

- `client/` - Frontend en React construido con Vite
- `server/` - API backend en Express
- `terraform/` - Infraestructura como Código para despliegue con Docker
- `.github/workflows/` - Flujos de trabajo de GitHub Actions para despliegue

## Configuración

1. Instalar todas las dependencias tanto para el servidor como para el cliente:

```bash
npm run install:all
```

2. Configurar variables de entorno:

Crea un archivo `.env` en el directorio `client` con las siguientes variables:
```
VITE_TMDB_API_TOKEN=tu_token_api_tmdb_aquí
```

Puedes copiar el archivo `.env.example` como punto de partida:
```bash
cp client/.env.example client/.env
```

Para obtener un token de la API de TMDB:
- Regístrate en [themoviedb.org](https://www.themoviedb.org/signup)
- Ve a la configuración de tu cuenta -> API -> Crear -> Solicita una clave API
- Una vez aprobada, genera un Token de Acceso de Lectura API (autenticación v4)

## Desarrollo

Inicia el servidor backend (se ejecuta en el puerto 3000):

```bash
npm run dev:server
```

En una terminal separada, inicia el servidor de desarrollo frontend (se ejecuta en el puerto 5173):

```bash
npm run dev:client
```

## Compilación para Producción

Compila el frontend para producción:

```bash
npm run build
```

Esto creará una carpeta `dist` en el directorio del cliente con una compilación optimizada para producción.

## Ejecución en Producción

Para ejecutar la aplicación en modo producción:

```bash
npm start
```

Esto servirá los archivos estáticos del frontend desde el servidor Express.

## Despliegue con Terraform y Docker

Este proyecto incluye configuración de Terraform para desplegar la aplicación usando contenedores Docker.

### Prerrequisitos
- [Terraform](https://www.terraform.io/downloads.html) (v1.0+)
- [Docker](https://www.docker.com/get-started) instalado y funcionando
- [Docker Compose](https://docs.docker.com/compose/install/) (opcional)

### Pasos para el Despliegue

1. Navega al directorio de Terraform:
   ```bash
   cd terraform
   ```

2. Crea un archivo `terraform.tfvars` basado en el ejemplo:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. Edita el archivo `terraform.tfvars` con tus valores:
   - `tmdb_api_token`: Tu token API de TMDB
   - `server_port`: Puerto para exponer el servidor (predeterminado: 3000)
   - `client_port`: Puerto para exponer el cliente (predeterminado: 5173)
   - `use_nginx`: Si se debe usar Nginx como proxy inverso

4. Inicializa Terraform:
   ```bash
   terraform init
   ```

5. Despliega la infraestructura:
   ```bash
   terraform apply
   ```

Para más detalles, consulta el [README de Terraform](./terraform/README.md).

## Despliegue con GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages cuando se realizan cambios en la rama `main`.

### Prerrequisitos
- Repositorio GitHub con GitHub Pages habilitado (ver instrucciones detalladas a continuación)
- Token API de TMDB añadido como secreto del repositorio con el nombre `TMDB_API_TOKEN`

### Habilitando GitHub Pages
1. Ve a tu repositorio en GitHub
2. Haz clic en "Settings" en la navegación superior
3. Desplázate hacia abajo hasta la sección "GitHub Pages"
4. En "Source", selecciona "GitHub Actions"
5. Guarda la configuración

Para instrucciones más detalladas, consulta la [Guía de Configuración de GitHub Pages](./docs/github-pages-setup.md)

### Cómo funciona
1. Envía tus cambios a la rama `main`
2. El flujo de trabajo de GitHub Actions construirá la aplicación React
3. La aplicación construida será desplegada en GitHub Pages
4. La aplicación estará disponible en `https://[tu-nombre-usuario].github.io/proyecto-vod/`

### Despliegue manual
También puedes activar el despliegue manualmente desde la pestaña Actions en tu repositorio GitHub.

### Nota sobre la funcionalidad del servidor
Cuando se despliega en GitHub Pages, la aplicación se ejecuta sin el backend Express. Todas las llamadas API se realizan directamente a la API de TMDB utilizando la variable de entorno del lado del cliente.
