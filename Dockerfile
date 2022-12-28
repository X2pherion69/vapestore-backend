FROM node:16

# Create app dir, this is container/in our image
WORKDIR /app

# Install dependencies 
COPY ./package*.json ./

# Initiate install dependencies
RUN yarn install

COPY . .

RUN yarn run build

CMD ["npm", "start"]