FROM debian:buster

RUN apt-get update && apt-get install -y\
    python3-pip\
    libpq-dev

RUN pip3 install\
  pyyaml\
  psycopg2\
  alembic

COPY ./migrate/ /app/migrate
WORKDIR /app/migrate

EXPOSE 80

CMD ["python3", "-u", "./run.py"]
