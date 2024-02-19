FROM node:16.13

WORKDIR /server/services/users

ENV PORT=4001

COPY package.json ./

COPY package-lock.json ./

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

EXPOSE 4001

CMD ["npm", "run", "start"]
