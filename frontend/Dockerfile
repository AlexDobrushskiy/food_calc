FROM node:11

RUN mkdir /build
WORKDIR /
COPY ./build /build
COPY ./app.js /app.js
RUN npm init; npm install express

CMD node app.js
