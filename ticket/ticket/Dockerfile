FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY . .

EXPOSE 4001

CMD ["npm","start"]