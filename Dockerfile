FROM node:16

WORKDIR /app

RUN mkdir -p /var/log/tsokbot

COPY src/package*.json ./

RUN npm ci --production

COPY src .

EXPOSE 3000

CMD ["npm", "start"]