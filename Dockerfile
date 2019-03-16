FROM node:alpine AS builder

WORKDIR /app

RUN adduser -S bot

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

#
# Change to a less-privileged user than root in the
# event a request escapes the sandbox
#
USER bot

#
# Starts the bot when the docker container is started
#
ENTRYPOINT ["npm", "start"]
