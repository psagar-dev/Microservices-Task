FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]