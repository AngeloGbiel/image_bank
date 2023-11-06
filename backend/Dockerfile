FROM node:18-alpine
WORKDIR /backend
COPY package*.json ./
RUN npm install -g npm@10.2.0 && npm install
COPY . ./
EXPOSE 3000
CMD [ "npm", "start" ]