#!/bin/bash

npx prisma generate

npx prisma migrate dev --name transcendence

npm run start:dev
