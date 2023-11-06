FROM node:18-alpine as build 
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.2.0 && npm install
COPY . ./
RUN npm run build
EXPOSE 4000
CMD ["npm","run","dev"]