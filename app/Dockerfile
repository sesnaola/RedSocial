FROM node:15-alpine
WORKDIR /usr/src/redsocial/app
COPY package*.json ./ 
RUN npm install 
COPY . . 
EXPOSE 3080
CMD ["npm", "start"]