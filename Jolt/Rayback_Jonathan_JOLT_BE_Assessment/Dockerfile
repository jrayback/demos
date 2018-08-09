FROM node:10
WORKDIR /app
COPY ./app/package*.json /app/
RUN npm i
COPY ./app /app/
CMD npm start > server.log
EXPOSE 8080