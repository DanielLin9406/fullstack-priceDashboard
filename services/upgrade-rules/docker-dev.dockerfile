FROM node:10.16.0-jessie

LABEL maintainer_email="universetennis@gmail.com"
LABEL maintainer="daniel"

RUN npm i -g npm@6.9.0
RUN useradd --user-group --create-home --shell /bin/bash app
RUN mkdir -p /home/upgrade-rule-service/node_modules
RUN chown -R app:app /home/upgrade-rule-service/

USER app
WORKDIR /home/upgrade-rule-service
COPY package*.json /home/upgrade-rule-service/
RUN npm install

EXPOSE 5002
CMD ["npm", "start"]