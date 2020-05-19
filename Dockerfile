FROM node:12

WORKDIR /

RUN npm install
RUN npm build

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
