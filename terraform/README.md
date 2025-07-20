# Despliegue de Proyecto VOD con Terraform y Docker

Este directorio contiene la configuración de Terraform para desplegar la aplicación VOD utilizando contenedores Docker.

## Prerrequisitos

- [Terraform](https://www.terraform.io/downloads.html) (v1.0+)
- [Docker](https://www.docker.com/get-started) instalado y funcionando
- [Docker Compose](https://docs.docker.com/compose/install/) (opcional)
- Token de API de TMDB

## Configuración

1. Asegúrate de que los Dockerfiles estén en su lugar:
   - `Dockerfile.server` en la raíz del proyecto
   - `Dockerfile.client` en el directorio del cliente

2. Crea un archivo `terraform.tfvars` basado en el ejemplo:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. Edita el archivo `terraform.tfvars` con tus valores personalizados:
   - `tmdb_api_token`: Tu token de API para TMDB
   - `server_port`: Puerto para exponer el servidor (predeterminado: 3000)
   - `client_port`: Puerto para exponer el cliente (predeterminado: 5173)
   - `use_nginx`: Si quieres usar Nginx como proxy inverso

## Despliegue

1. Inicializa el directorio de trabajo de Terraform:
   ```bash
   terraform init
   ```

2. Visualiza el plan de ejecución (opcional pero recomendado):
   ```bash
   terraform plan
   ```

3. Aplica la configuración para crear los recursos:
   ```bash
   terraform apply
   ```
   Confirma la operación escribiendo `yes` cuando se te solicite.

4. Una vez completado, Terraform mostrará las salidas configuradas, incluyendo las URLs para acceder a la aplicación.

5. Accede a la aplicación:
   - Servidor: http://localhost:3000 (o el puerto configurado)
   - Cliente (si está desplegado como contenedor separado): http://localhost:5173 (o el puerto configurado)
   - Si usas Nginx: http://localhost:80

## Eliminación de recursos

Para detener y eliminar todos los contenedores creados por Terraform:

```bash
terraform destroy
```

## Estructura de archivos Docker

- **Dockerfile.server**: Construye la imagen del servidor Express.
- **Dockerfile.client**: Construye la imagen del cliente React.
- **nginx/conf.d/default.conf**: Configuración de Nginx para el proxy inverso.

## Personalización avanzada

- Para modificar la configuración de Nginx, edita los archivos en `nginx/conf.d/`.
- Para habilitar SSL, coloca tus certificados en `nginx/ssl/` y descomenta las secciones relevantes en la configuración de Nginx.

Confirma la operación escribiendo `yes` cuando se te solicite.

## Estructura de archivos

- `main.tf`: Configuración principal de Terraform
- `variables.tf`: Declaración de variables utilizadas en la configuración
- `outputs.tf`: Definición de salidas después del despliegue
- `terraform.tfvars`: Valores específicos para las variables (no incluido en el repositorio)
- `terraform.tfvars.example`: Ejemplo de cómo configurar las variables

## Recursos creados

- VPC con subredes públicas
- Grupo de seguridad para la aplicación
- Instancia EC2 para el servidor
- Elastic IP para acceso público
- Opcionalmente: configuración de Nginx y registro DNS
