FROM node:10
WORKDIR /app
COPY ./app/package*.json /app/
RUN npm i
COPY ./app /app/
CMD node app.js
EXPOSE 8080