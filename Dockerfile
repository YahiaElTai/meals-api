FROM node:lts as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV production

EXPOSE 8080

CMD ["npm", "start"]
