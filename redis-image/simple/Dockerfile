# get existing base image
FROM node:alpine

# redirect where npm is install
WORKDIR /usr/app

# avoid extra time for rebuild 
COPY ./package.json ./
# npm install dependencies
RUN npm install

# copy all info for package.json
COPY ./ ./

# start program
CMD [ "npm", "start" ]