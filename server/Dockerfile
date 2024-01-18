FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x start.sh

EXPOSE 4000

CMD [ "sh", "./start.sh" ]

# FROM node:18

# ARG UPLOADS_DESTINATION

# WORKDIR /server

# COPY . /server/

# RUN npm install

# RUN npm install -g prisma

# RUN mkdir -p $UPLOADS_DESTINATION && \
#     chmod 755 $UPLOADS_DESTINATION

# EXPOSE 4000
