FROM node:lts-alpine

WORKDIR /client

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8000

CMD ["npm", "start"]