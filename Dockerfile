FROM node:16-alpine

# Create app dir, this is container/in our image
WORKDIR /app

COPY ./tsconfig.build.json .

# Install dependencies 
COPY . .

# Initiate install dependencies
RUN yarn install

RUN yarn run build

CMD ["yarn", "run", "start:dev"]