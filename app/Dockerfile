FROM debian:buster

RUN apt-get update && apt-get install -y\
    python3-pip\
    libpq-dev

RUN pip3 install\
  pyyaml\
  psycopg2\
  flask

COPY ./app/ /app/app
WORKDIR /app/app

ENV FLASK_APP=app.py

EXPOSE 80

CMD ["flask", "run", "--host", "0.0.0.0", "--port", "80"]
