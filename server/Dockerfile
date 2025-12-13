FROM node:20

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma.config.ts ./
COPY .env ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate --config prisma.config.ts

COPY src ./src

EXPOSE 3000

CMD ["npm", "run", "dev"]
