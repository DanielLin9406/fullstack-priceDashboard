FROM node:10.16.0-jessie

LABEL maintainer_email="universetennis@gmail.com"
LABEL maintainer="daniel"

RUN npm i -g npm@6.9.0
RUN useradd --user-group --create-home --shell /bin/bash app
RUN mkdir -p /home/upgrade-rules/node_modules
RUN chown -R app:app /home/upgrade-rules/

USER app
WORKDIR /home/upgrade-rules
COPY package*.json /home/upgrade-rules/
RUN npm install

EXPOSE 5002
CMD ["npm", "start"]