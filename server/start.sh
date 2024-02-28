#!/bin/bash

mkdir -p $UPLOADS_DESTINATION

chmod 755 $UPLOADS_DESTINATION

npx prisma generate

npx prisma migrate dev --name transcendence

npm run start:dev
