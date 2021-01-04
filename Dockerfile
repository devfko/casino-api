FROM node:12.2

RUN mkdir -p /app

#Se establece el directorio de trabajo
WORKDIR /app

# Se establecen variables de entorno
ENV DB_HOST=
ENV DB_PORT=
ENV DB_USER=
ENV DB_PASS=
ENV DB_NAME=
ENV NODE_ENV=
ENV URL_DOMAIN=
ENV URL_PORT=

# Instala los paquetes existentes en el package.json
COPY package*.json ./

RUN npm install -g --quiet

# Copia la aplicación
COPY . .

EXPOSE 8080

CMD ["npm", "start"]