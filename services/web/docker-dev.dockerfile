FROM node:10.16.0-jessie

LABEL maintainer_email="universetennis@gmail.com"
LABEL maintainer="daniel"

RUN npm i -g npm@6.9.0
RUN npm i -g npx
RUN useradd --user-group --create-home --shell /bin/bash app
RUN mkdir -p /home/web/node_modules
RUN chown -R app:app /home/web/

USER app
WORKDIR /home/web
COPY package*.json /home/web/
RUN npm install

EXPOSE "3000:8080"
CMD ["npm", "run", "start:dev"]