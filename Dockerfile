FROM nginx

ARG NPM_TOKEN
ENV NODE_ENV="production"

COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

VOLUME /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

COPY src/index.html /usr/share/nginx/html
COPY src/client.min.js /usr/share/nginx/html
COPY src/assets/ /usr/share/nginx/html/assets
COPY src/css/ /usr/share/nginx/html/css


