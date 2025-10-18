# --------------------------------------------------------------------------------------
# ETAPA 1: BUILD (Compilación)
# --------------------------------------------------------------------------------------
FROM node:20.16.0-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias (puedes omitir --production ya que es una etapa de build)
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación para producción.
# REEMPLAZA 'tu-app-name' con el nombre de tu proyecto Angular (lo que aparece en angular.json)
# RUN npm run build -- --configuration production
RUN npm run build

# --------------------------------------------------------------------------------------
# ETAPA 2: RUN (Ejecución/Servicio)
# --------------------------------------------------------------------------------------
FROM nginx:alpine AS final

# Copia los archivos de la aplicación compilada desde la etapa 'build'
# REEMPLAZA 'tu-app-name' con el nombre de tu proyecto Angular
COPY --from=build /app/dist/front /usr/share/nginx/html

# Copia la configuración de Nginx para manejar el Router de Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto por defecto de Nginx
EXPOSE 3091
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]