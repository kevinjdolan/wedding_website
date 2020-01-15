from flask import Flask
app = Flask(__name__)

@app.route('/app/')
def hello_world():
    return "Hello, World"
