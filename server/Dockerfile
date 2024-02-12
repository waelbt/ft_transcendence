FROM node:lts-alpine

ARG UPLOADS_DESTINATION

WORKDIR /server

COPY . /server/

RUN npm install

RUN npm install -g prisma

RUN mkdir -p $UPLOADS_DESTINATION && \
    chmod 755 $UPLOADS_DESTINATION

RUN chmod +x start.sh

EXPOSE 3000

CMD [ "sh", "./start.sh" ]