FROM node:12.18-alpine
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

