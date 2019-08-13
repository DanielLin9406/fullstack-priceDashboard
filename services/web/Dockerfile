# Build Web-service as static file
FROM node:10.16.0-jessie as builder

LABEL maintainer_email="universetennis@gmail.com"
LABEL maintainer="daniel"

RUN npm i -g npm@6.9.0
RUN npm i -g npx
RUN useradd --user-group --create-home --shell /bin/bash app
RUN mkdir -p /home/web/node_modules
RUN chown -R app:app /home/web/

USER app
WORKDIR /home/web
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# Start Nginx to host static file as web-service server
FROM nginx
EXPOSE 3000
COPY ./nginx/default-prod.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/web/build /usr/share/nginx/html