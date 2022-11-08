### STAGE 1: Build ### 
FROM node:12.7-alpine AS build 
WORKDIR /usr/src/app 
COPY package.json package-lock.json ./ 
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
