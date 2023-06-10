FROM node:18

WORKDIR /pedraPapelTesoura

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]