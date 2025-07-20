output "server_container_name" {
  description = "Nombre del contenedor del servidor"
  value       = docker_container.vod_server.name
}

output "server_url" {
  description = "URL del servidor Express"
  value       = "http://localhost:${var.server_port}"
}

output "client_url" {
  description = "URL del cliente (si se desplegó)"
  value       = var.deploy_client_container ? "http://localhost:${var.client_port}" : "N/A - Cliente no desplegado como contenedor"
}

output "docker_network" {
  description = "Nombre de la red Docker creada"
  value       = docker_network.vod_network.name
}
