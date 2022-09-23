FROM node:lts

RUN mkdir -p /app
WORKDIR /app

COPY . /app/

VOLUME [ "/app/apk" ]

RUN npm install

EXPOSE 8081

CMD [ "npm", "start" ]
