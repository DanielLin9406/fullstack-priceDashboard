FROM node:10.16.0-jessie

LABEL maintainer_email="universetennis@gmail.com"
LABEL maintainer="daniel"

RUN npm i -g npm@6.9.0
RUN useradd --user-group --create-home --shell /bin/bash app
RUN mkdir -p /home/prices-service/node_modules
RUN chown -R app:app /home/prices-service/

USER app
WORKDIR /home/prices-service
COPY package*.json /home/prices-service/
RUN npm install

EXPOSE 5000
CMD ["npm", "start"]