FROM node:10.16.0-jessie

LABEL maintainer_email="universetennis@gmail.com"
LABEL maintainer="daniel"

RUN npm i -g npm@6.9.0
RUN useradd --user-group --create-home --shell /bin/bash app
RUN mkdir -p /home/promotions-service/node_modules
RUN chown -R app:app /home/promotions-service/

USER app
WORKDIR /home/promotions-service
COPY package*.json /home/promotions-service/
RUN npm install

EXPOSE 5001
CMD ["npm", "start"]