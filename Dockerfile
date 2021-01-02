FROM node:15

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 8080
ENV PORT=8080
CMD [ "node", "index.js" ]