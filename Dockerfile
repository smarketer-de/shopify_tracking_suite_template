FROM node:14-alpine as base

WORKDIR /src
COPY package*.json ./
EXPOSE 80

ENV NODE_ENV=development
ENV PORT=80
RUN npm install
CMD ["npm", "run", "dev"]
