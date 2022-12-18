FROM node:16-alpine

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/server

COPY ./package*.json .

RUN npm install

COPY ./ .

EXPOSE 3000

CMD ["npm", "run", "start"]

