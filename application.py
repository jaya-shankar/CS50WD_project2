import os

from flask import Flask,render_template,session,redirect,request
from flask_socketio import SocketIO, emit
import requests
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import requests
from models import *

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

global username
@app.route("/",methods=["GET","POST"])
def index():
    return render_template("index.html")


@socketio.on("send")
def send_msg(data):
    print("hell")
    print(data)


if __name__ == '__main__':

    app.run(debug=True,host="0.0.0.0")