from flask import Blueprint,render_template

user= Blueprint('user',__name__,url_prefix='/user')

#armando las rutas 
@user.route("/balance")
def balance():
    return render_template("index.html")
@user.route("/goals")
def goals():
    return render_template("index.html")
@user.route("/details")
def details():
    return render_template("index.html")
@user.route("/summary")
def summary():
    return render_template("index.html")
@user.route("/collaborators")
def collaborators():
    return render_template("index.html")
