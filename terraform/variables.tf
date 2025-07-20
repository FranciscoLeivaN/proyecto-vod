variable "project_name" {
  description = "Nombre del proyecto para etiquetado de recursos"
  type        = string
  default     = "vod-platform"
}

variable "client_context_path" {
  description = "Ruta al directorio del cliente React"
  type        = string
  default     = "../client"
}

variable "server_context_path" {
  description = "Ruta al directorio del servidor Express"
  type        = string
  default     = "../server"
}

variable "tmdb_api_token" {
  description = "Token de API para TMDB"
  type        = string
  sensitive   = true
}

variable "ami_id" {
  description = "ID de AMI para la instancia EC2 (Ubuntu Server 22.04 LTS)"
  type        = string
  default     = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS en us-east-1, actualizar según región
}

variable "server_port" {
  description = "Puerto externo para el servidor Express"
  type        = number
  default     = 3000
}

variable "client_port" {
  description = "Puerto externo para el cliente React (desarrollo)"
  type        = number
  default     = 5173
}

variable "deploy_client_container" {
  description = "Si se debe desplegar un contenedor separado para el cliente"
  type        = bool
  default     = false
}

variable "repository_url" {
  description = "URL del repositorio Git (no usado en Docker, mantenido para compatibilidad)"
  type        = string
  default     = ""
}

variable "use_nginx" {
  description = "Si se debe usar Nginx como proxy inverso"
  type        = bool
  default     = false
}

variable "nginx_config_path" {
  description = "Ruta a la configuración de Nginx"
  type        = string
  default     = "./nginx"
}

variable "domain_name" {
  description = "Nombre de dominio para la aplicación (dejar en blanco si no se usa)"
  type        = string
  default     = ""
}
