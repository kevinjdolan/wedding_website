FROM debian:buster

RUN apt-get update && apt-get install -y\
    nginx

COPY ./nginx/ /etc/nginx/
COPY ./site/ /app/site

EXPOSE 80

CMD ["nginx"]
