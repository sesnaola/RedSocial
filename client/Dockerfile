FROM node:14.14.0

# hacer la carpeta 'client' el directorio de trabajo actual
WORKDIR /usr/src/redsocial/client

# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./

# instalar dependencias del proyecto
RUN npm install

COPY . .

CMD ["npm", "run", "serve"]