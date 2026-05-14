FROM node:18-alpine
WORKDIR /frontend/
COPY frontend/ .
COPY package.json /frontend/
RUN npm install
CMD ["npm", "start"]