# FROM node:19-alpine
# WORKDIR /app
# COPY package*.json .
# RUN npm install
# COPY . .
# EXPOSE 5173
# CMD ["npm","run","dev"]


FROM nginx:1.27.5-alpine-slim
WORKDIR /app
COPY ./dist /usr/share/nginx/html
EXPOSE 80

