terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
  
  # Opcional: configurar backend para estado remoto
  # backend "local" {
  #   path = "terraform.tfstate"
  # }
}

provider "docker" {
  # Si usas Docker Desktop, no necesitas configuración adicional.
  # Para Docker remoto, puedes descomentar y configurar lo siguiente:
  # host = "tcp://docker-host:2375/"
}

# Red Docker para comunicación entre contenedores
resource "docker_network" "vod_network" {
  name = "${var.project_name}_network"
}

# Volumen persistente para datos de la aplicación (opcional)
resource "docker_volume" "vod_data" {
  name = "${var.project_name}_data"
}

# Imagen de la aplicación cliente (frontend)
resource "docker_image" "vod_client" {
  name = "${var.project_name}-client"
  build {
    context    = var.client_context_path
    dockerfile = "Dockerfile.client"
    build_args = {
      VITE_TMDB_API_TOKEN = var.tmdb_api_token
    }
  }
  triggers = {
    dir_sha1 = sha1(join("", [for f in fileset(var.client_context_path, "**") : filesha1("${var.client_context_path}/${f}")]))
  }
}

# Imagen de la aplicación servidor (backend)
resource "docker_image" "vod_server" {
  name = "${var.project_name}-server"
  build {
    context    = var.server_context_path
    dockerfile = "Dockerfile.server"
  }
  triggers = {
    dir_sha1 = sha1(join("", [for f in fileset(var.server_context_path, "**") : filesha1("${var.server_context_path}/${f}")]))
  }
}

# Contenedor para el servidor
resource "docker_container" "vod_server" {
  name  = "${var.project_name}-server"
  image = docker_image.vod_server.image_id
  
  env = [
    "NODE_ENV=production",
    "PORT=3000"
  ]

  # Exponer el puerto del servidor
  ports {
    internal = 3000
    external = var.server_port
  }
  
  volumes {
    container_path = "/app/data"
    volume_name    = docker_volume.vod_data.name
  }
  
  networks_advanced {
    name = docker_network.vod_network.name
  }
  
  restart = "unless-stopped"
  
  # Configuración de salud
  healthcheck {
    test         = ["CMD", "wget", "--spider", "http://localhost:3000/health"]
    interval     = "30s"
    timeout      = "10s"
    start_period = "5s"
    retries      = 3
  }
}

# Contenedor para el cliente (desarrollo o producción)
resource "docker_container" "vod_client" {
  count = var.deploy_client_container ? 1 : 0
  name  = "${var.project_name}-client"
  image = docker_image.vod_client.image_id
  
  env = [
    "NODE_ENV=production",
    "VITE_API_BASE_URL=http://localhost:${var.server_port}"
  ]

  # Exponer el puerto de desarrollo de Vite (si es necesario)
  ports {
    internal = 5173
    external = var.client_port
  }
  
  networks_advanced {
    name = docker_network.vod_network.name
  }
  
  restart = "unless-stopped"
  
  depends_on = [docker_container.vod_server]
}

# Nginx como reverse proxy (opcional)
resource "docker_image" "nginx" {
  count = var.use_nginx ? 1 : 0
  name  = "nginx:alpine"
}

resource "docker_container" "nginx" {
  count = var.use_nginx ? 1 : 0
  name  = "${var.project_name}-nginx"
  image = docker_image.nginx[0].image_id
  
  ports {
    internal = 80
    external = 80
  }
  
  ports {
    internal = 443
    external = 443
  }
  
  volumes {
    host_path      = "${abspath(path.root)}/nginx/conf.d"
    container_path = "/etc/nginx/conf.d"
  }
  
  volumes {
    host_path      = "${abspath(path.root)}/nginx/ssl"
    container_path = "/etc/nginx/ssl"
  }
  
  networks_advanced {
    name = docker_network.vod_network.name
  }
  
  restart = "unless-stopped"
  
  depends_on = [
    docker_container.vod_server,
    docker_container.vod_client
  ]
}

# Crear instancia EC2 para el servidor
resource "aws_instance" "vod_server" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.app_sg.id]
  subnet_id              = aws_subnet.public_subnet[0].id
  
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y nodejs npm git
              
              # Instalar Node.js v18 (LTS)
              curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
              sudo apt-get install -y nodejs
              
              # Instalar PM2 para gestión de procesos
              sudo npm install -g pm2
              
              # Clonar el repositorio
              git clone ${var.repository_url} /home/ubuntu/vod-platform
              cd /home/ubuntu/vod-platform
              
              # Configurar variables de entorno
              echo "VITE_TMDB_API_TOKEN=${var.tmdb_api_token}" > ./client/.env
              
              # Instalar dependencias y construir la aplicación
              npm run install:all
              npm run build
              
              # Iniciar el servidor con PM2
              pm2 start npm --name "vod-server" -- start
              pm2 startup
              pm2 save
              
              # Configurar Nginx para servir la aplicación (opcional)
              if [ "${var.setup_nginx}" = "true" ]; then
                sudo apt-get install -y nginx
                
                # Configuración para Nginx
                cat > /etc/nginx/sites-available/vod-platform <<NGINX
              server {
                  listen 80;
                  server_name ${var.domain_name};
              
                  location / {
                      proxy_pass http://localhost:3000;
                      proxy_http_version 1.1;
                      proxy_set_header Upgrade \$http_upgrade;
                      proxy_set_header Connection 'upgrade';
                      proxy_set_header Host \$host;
                      proxy_cache_bypass \$http_upgrade;
                  }
              }
              NGINX
              
                # Activar el sitio y reiniciar Nginx
                sudo ln -s /etc/nginx/sites-available/vod-platform /etc/nginx/sites-enabled/
                sudo nginx -t && sudo systemctl restart nginx
              fi
              EOF
  
  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }
  
  tags = {
    Name = "${var.project_name}-server"
  }
}

# Opcional: Crear Elastic IP para la instancia
resource "aws_eip" "server_eip" {
  instance = aws_instance.vod_server.id
  domain   = "vpc"
  
  tags = {
    Name = "${var.project_name}-eip"
  }
}

# Opcional: Crear registro DNS (si se proporciona un dominio)
resource "aws_route53_record" "app_dns" {
  count   = var.domain_name != "" ? 1 : 0
  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = "A"
  ttl     = "300"
  records = [aws_eip.server_eip.public_ip]
}
