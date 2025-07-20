# Cómo habilitar GitHub Pages para este repositorio

Para que el workflow de GitHub Actions funcione correctamente, necesitas habilitar GitHub Pages en tu repositorio siguiendo estos pasos:

1. Ve a la página de tu repositorio en GitHub
2. Haz clic en "Settings" en la barra de navegación superior
3. Desplázate hacia abajo hasta la sección "GitHub Pages"
4. En la sección "Source", selecciona "GitHub Actions" 
5. Guarda la configuración

Una vez que hayas habilitado GitHub Pages, el workflow debería funcionar correctamente. Si sigues teniendo problemas, asegúrate de que:

1. El secreto `TMDB_API_TOKEN` está configurado en tu repositorio (Settings > Secrets and variables > Actions)
2. El repositorio tiene permisos para crear y ejecutar workflows (Settings > Actions > General)

## Resolución de problemas comunes

Si obtienes el error "Not Found" en la acción `actions/configure-pages`, significa que GitHub Pages no está habilitado en el repositorio. Sigue los pasos anteriores para habilitarlo.

Si obtienes un error "Error: HttpError: Not Found", podría deberse a:
- El repositorio no tiene GitHub Pages habilitado
- La rama o directorio seleccionado para GitHub Pages no existe
- No tienes los permisos necesarios en el repositorio

Para obtener más información sobre GitHub Pages, consulta la [documentación oficial](https://docs.github.com/en/pages).
