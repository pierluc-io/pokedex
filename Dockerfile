FROM mhart/alpine-node:6.3
MAINTAINER Pier-Luc Gendreau <pierluc@outlook.com>

RUN npm install --production && \
    npm install -g pushstate-server && \
    pushstate-server build

EXPOSE 9000

CMD [ "start", "http://localhost:9000" ]
