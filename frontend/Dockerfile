FROM node:21

WORKDIR /main

EXPOSE 5173

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD [ "npm", "run", "dev"]