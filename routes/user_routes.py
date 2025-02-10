from flask import Blueprint,render_template

user= Blueprint('user',__name__,url_prefix='/user')
admin= Blueprint('admin',__name__,url_prefix='/admin')
auth = Blueprint('auth',__name__)


#armando las rutas 
@auth.route("/login")
def login():
    return render_template("index.html")
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

@admin.route("/home")
def homeAdmin():
    return render_template("index.html")

@admin.route("/payments")
def paymentsAdmin():
    return render_template("index.html")

@admin.route("/invoices")
def invoicesAdmin():
    return render_template("index.html")

