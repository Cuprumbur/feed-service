FROM node:alpine
COPY . ./
RUN npm install
RUN npm install tsc -g
EXPOSE 3005

CMD npm run prod