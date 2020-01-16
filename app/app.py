import csv
import datetime
import io
import flask
import logging
import yaml
import sqlalchemy as sa
from flask_sqlalchemy import SQLAlchemy

with open('/secret/config.yaml') as f:
    CONFIG = yaml.safe_load(f)

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = CONFIG['sql']
db = SQLAlchemy(app)

class EmailRecord(db.Model):

    __tablename__ = 'email'

    id = sa.Column('id', sa.Integer, primary_key=True)
    email = sa.Column('email', sa.String())
    name = sa.Column('name', sa.String())
    date = sa.Column('date', sa.DateTime())

@app.route('/app/submit/')
def submit():
    name = flask.request.values.get('name')
    email = flask.request.values.get('email')
    record = EmailRecord(
        name=name,
        email=email,
        date=datetime.datetime.now(),
    )
    db.session.add(record)
    db.session.commit()
    return "OK"

@app.route('/app/download.csv')
def download():
    records = EmailRecord.query.order_by(EmailRecord.date.desc())
    output = io.StringIO()
    writer = csv.DictWriter(output, [
        'date',
        'name',
        'email',
    ])
    writer.writeheader()
    for record in records:
        writer.writerow({
            'date': str(record.date),
            'name': record.name,
            'email': record.email,
        })
    output_csv = output.getvalue()

    response = flask.make_response(output_csv)
    response.headers["Content-Disposition"] = "attachment; filename=emails.csv"
    response.headers["Content-type"] = "text/csv"
    return response

app.run(
    host="0.0.0.0",
    port=80,
    debug=False,
)
