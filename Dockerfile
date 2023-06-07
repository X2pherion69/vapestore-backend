FROM node AS development

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . .

RUN yarn build

FROM node AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json /app

COPY --from=development /app .

EXPOSE 4000

CMD ["yarn", "start:prod"]
