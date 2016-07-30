FROM mhart/alpine-node:6.3
MAINTAINER Pier-Luc Gendreau <pierluc@outlook.com>

RUN npm install --production

EXPOSE 3000

CMD [ "npm", "start" ]
