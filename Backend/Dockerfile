# Backend/Dockerfile
FROM node:22.15.0-alpine

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache \
    python3 \
    make \
    g++

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para nodemon)
RUN npm ci

# Copiar el resto del código
COPY . .

# Crear directorio para uploads si es necesario
RUN mkdir -p uploads

# Exponer puerto
EXPOSE 3050

# Variables de entorno por defecto (se sobrescriben con docker-compose)
ENV NODE_ENV=development
ENV SERVER_PORT=3050
ENV SERVER_HOST=0.0.0.0

# Usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Comando de inicio con nodemon para desarrollo
CMD ["npm", "run", "dev"]