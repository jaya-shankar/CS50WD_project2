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

history={}
@app.route("/",methods=["GET","POST"])
def index():
    return render_template("index.html")


@socketio.on("send")
def send_msg(data):
    ch_name=data['ch_name']
    if ch_name in history:
        # append the new number to the existing array at this slot
        if(len(history[ch_name])>5):
            history[ch_name].pop(0)
        history[ch_name].append(data['message'])
    else:
        # create a new array in this slot
        history[ch_name] = [data['message']]
    emit('display_msg',data,broadcast=True)

@socketio.on("get_chat")
def get_chat(data):
    ch_name=data['ch_name']
    if ch_name not in history:
        history[ch_name]=[]
    chats=history[ch_name]
    emit('load_chat',chats,broadcast=True)



if __name__ == '__main__':

    app.run(debug=True,host="0.0.0.0")