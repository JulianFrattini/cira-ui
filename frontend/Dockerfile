FROM node:latest

COPY package.json /frontend/
WORKDIR /frontend/
RUN npm install --save

COPY src /frontend/src/
COPY public /frontend/public/

EXPOSE 5000
CMD npm run build && npm run production