FROM node:16.13

WORKDIR /server/orchestrator

ENV PORT=4000

COPY package.json /server/orchestrator

COPY package-lock.json /server/orchestrator

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

EXPOSE 4000

CMD ["npm", "run", "start"]