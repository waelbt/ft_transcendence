FROM node:alpine

WORKDIR /client

COPY package*.json ./

RUN npm install

RUN npm install --save-dev vite


COPY . .

EXPOSE 8000

CMD ["npm", "start"]