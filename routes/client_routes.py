from flask import Blueprint,render_template

client= Blueprint('client',__name__)

#armando las rutas habilitadas para 
@client.route("/")
def index():
    return render_template("index.html")
@client.route('/client')
def indexTest():
    return render_template("index.html")
@client.route('/client/game')
def clientGame():
    return render_template('index.html')
@client.route('/client/game/howToGet')
def clientGameHowToGet():
    return render_template('index.html')
@client.route('/client/game/minorAge')
def clientGameMinorAge():
    return render_template('index.html')
@client.route('/client/game/alreadyPlayed')
def clientGameAlreadyPlayed():
    return render_template('index.html')
