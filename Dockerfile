FROM node:16-alpine3.11

WORKDIR /app

COPY . /app

RUN npm install & npm install nodemon -g

EXPOSE 3000

CMD ["npm","run","dev"]

