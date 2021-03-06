FROM node:14

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production --non-interactive --frozen-lockfile

COPY . .

ARG NODE_ENV=${NODE_ENV}

RUN yarn build

EXPOSE 8000
CMD ["node", "build/server/index.js"]