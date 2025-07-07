# ============================================================================
# ESTÁGIO 1: BUILD - Construção da aplicação React
# ============================================================================

# Usa uma imagem Node.js Alpine (leve) como base para o build
FROM node:18-alpine as build

# Comentário sobre o propósito do Dockerfile
# Este Dockerfile cria uma imagem Docker otimizada para produção do frontend

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro (para otimizar cache do Docker)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código fonte para o container
COPY . .

# Executa o build da aplicação React para produção
RUN npm run build

# ============================================================================
# ESTÁGIO 2: PRODUÇÃO - Servindo a aplicação com Nginx
# ============================================================================

# Usa Nginx Alpine como servidor web para produção
FROM nginx:alpine

# Copia os arquivos buildados do estágio anterior para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 3000 para acesso externo
EXPOSE 3000