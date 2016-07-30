FROM mhart/alpine-node:6.3
MAINTAINER Pier-Luc Gendreau <pierluc@outlook.com>

RUN npm install -g pushstate-server && \
    mkdir /srv/www

WORKDIR /srv/www
ADD . /srv/www
RUN npm install && \
    npm install --only=dev && \
    npm run build

EXPOSE 9000

CMD [ "pushstate-server", "build" ]
