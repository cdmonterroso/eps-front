# ETAPA 1: BUILD (Compilación)
#FROM node:20.16.0-alpine AS build

# Estableci3neo el directorio de trabajo
#WORKDIR /app

# Copia los archivos de configuración de dependencias
#COPY package.json package-lock.json angular.json

# Instala las dependencias (omitir --production ya que es una etapa de build)
#RUN npm install

# Copia el resto de los archivos de la aplicación
#COPY . .

# Compilando la aplicación para producción.
#RUN npm run build --configuration=production
#RUN npm run build

# --------------------------------------------------------------------------------------
# ETAPA 2: RUN (Ejecución/Servicio)
#FROM nginx:alpine AS final

# Copiando los archivos de la aplicación compilada desde la etapa 'build'
#COPY --from=build /app/dist/front /usr/share/nginx/html

# Copia la configuración de Nginx para manejar el Router de Angular
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto por defecto de Nginx
#EXPOSE 3091
#EXPOSE 80

# Comando para iniciar Nginx
#CMD ["nginx", "-g", "daemon off;"]


# --- STAGE 1: FASE DE CONSTRUCCIÓN (BUILD) ---
FROM node:20.16.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci 

# Copia todo el código fuente de la aplicación
COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Genera la versión de producción de la aplicación
RUN npm run build


# --- STAGE 2: FASE DE SERVICIO (PRODUCTION) ---
FROM node:20.16.0-alpine AS server

RUN npm install -g serve

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos compilados desde la etapa 'builder'
# Por defecto suele ser el nombre del proyecto en angular.json.
COPY --from=builder /app/dist/front ./

# Expone el puerto por defecto de 'serve' (3000)
EXPOSE 3091
EXPOSE 3000

# Comando para iniciar la aplicación con 'serve'
CMD ["serve", "-s", "-p", "3000"]
