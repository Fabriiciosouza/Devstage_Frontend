FROM node:18-alpine as build

#docker frontend

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # Altere conforme seu comando de build

# Servidor de produção
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000