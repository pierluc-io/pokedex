FROM mhart/alpine-node:6.3
MAINTAINER Pier-Luc Gendreau <pierluc@outlook.com>

RUN npm install --production && \
    npm install -g pushstate-server

EXPOSE 9000

CMD [ "pushstate-server", "build" ]
