FROM node:16

# Create app dir, this is container/in our image
WORKDIR /vapestore/src/app

# Install dependencies 
COPY package*.json ./

# Initiate install dependencies
RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 8432

CMD ["node", "dist/main"]