FROM node:16.13

WORKDIR /server/services/app/server

ENV PORT=4002

COPY package.json ./

COPY package-lock.json ./

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

EXPOSE 4002

CMD ["npm", "run", "start"]
