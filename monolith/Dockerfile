FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -g pm2@latest
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
ENTRYPOINT ["pm2-runtime", "dist/main.js"]
