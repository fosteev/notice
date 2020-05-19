FROM node:12

WORKDIR /

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
