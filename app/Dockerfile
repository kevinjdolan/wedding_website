FROM debian:buster

RUN apt-get update && apt-get install -y\
    python3-pip\
    libpq-dev

RUN pip3 install\
  pyyaml\
  psycopg2\
  flask\
  Flask-SQLAlchemy

COPY ./app/ /app/app
WORKDIR /app/app

EXPOSE 80

CMD ["python3", "-u", "/app/app/app.py"]
