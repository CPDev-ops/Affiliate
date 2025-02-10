from flask import Blueprint, render_template

admin = Blueprint('admin', __name__, url_prefix='/admin')

@admin.route("/home")
def adminHome():
    return render_template("index.html")