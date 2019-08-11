FROM node:10.16.0-jessie

LABEL maintainer_email="universetennis@gmail.com"
LABEL maintainer="daniel"

RUN npm i -g npm@6.9.0
RUN useradd --user-group --create-home --shell /bin/bash app
RUN mkdir -p /home/user/node_modules
RUN chown -R app:app /home/user/

USER app
WORKDIR /home/user
COPY package*.json /home/user/
RUN npm install

EXPOSE 4999
CMD ["npm", "start"]