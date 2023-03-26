FROM node:lts-alpine3.16
WORKDIR /home/app
COPY . /home/app
RUN npm install express mysql2 dotenv body-parser cors mongoose
CMD node dbServer.js