from datetime import datetime,date,timedelta
from wsgiref import headers
from flask import Flask, message_flashed, render_template, request, url_for, flash, redirect, Blueprint, session, send_file,jsonify, make_response, Response
from json import JSONEncoder
from werkzeug.exceptions import abort
from flask_login import LoginManager, login_user ,login_required, current_user, UserMixin
from flask_session import Session
from flask_cors import CORS
from flask_cors import cross_origin
import pymysql
from controlador_db import obtener_conexion
import controlador_db
import xlsxwriter
import urllib.request as urllib
import json
import requests
from jinja2 import Environment, FileSystemLoader
import uuid
import random
from decimal import Decimal
from functools import wraps
import re
import qrcode
from io import BytesIO
import envio_mail

def require_params(params):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            missing_params = [param for param in params if param not in request.args]
            if missing_params:
                return jsonify({'error': f'Missing parameters: {", ".join(missing_params)}'}), 400
            return func(*args, **kwargs)
        return wrapper
    return decorator

def generar_codigo_unico():
    codigo = str(uuid.uuid4().hex)[:10]  # Obtén los primeros 10 caracteres del UUID
    return codigo


app = Flask(__name__)
app.config['SECRET_KEY'] = '9%H9Nu9EM*901j9edfghsfghfhxfgh1Ikf'
app.config['SESSION_TYPE'] = 'filesystem'  # Almacenamiento de la sesión en el sistema de archivos (puedes cambiar esto según tus necesidades)
# Configuración para establecer el tiempo de vida de las cookies de sesión
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=90)  # La cookie de sesión durará 1 día
app.config['UPLOAD_FOLDER'] = './Archivos PDF/'
app.config['SESSION_COOKIE_SAMESITE'] = 'None' 
app.config['SESSION_COOKIE_SECURE'] = True 
CORS(app, supports_credentials=True,origins="*")
Session(app)

@app.route("/")
def index():
    return render_template("index.html")

#ruta nueva de terminos y condiciones REACT
@app.route('/terms')
def terms():
    return render_template('index.html')

#ruta nueva para como llegar REACT
@app.route('/howToGet')
def howToGet():
    return render_template('index.html')

#ruta nueva para como llegar REACT
@app.route('/minorAge')
def minorAge():
    return render_template('index.html')

@app.route('/client/game')
def clientGame():
    return render_template('index.html')

@app.route('/client/game/howToGet')
def clientGameHowToGet():
    return render_template('index.html')

@app.route('/client/game/minorAge')
def clientGameMinorAge():
    return render_template('index.html')

@app.route('/client/game/alreadyPlayed')
def clientGameAlreadyPlayed():
    return render_template('index.html')

@app.route("/template_mail")
def template_mail():
    return render_template("mail.html")

@app.route("/template_terms")
def template_terms():
    return render_template("terminos-condiciones.html")

# ruta nueva 
@app.route('/alreadyPlayed')
def already_played():
    return render_template('index.html')

# Función para insertar una acción
@app.route("/insertar_accion", methods=["POST"])
def insertar_accion():
    # Verificar si el formulario ya ha sido enviado
    if 'formulario_enviado' in session:
        return jsonify({'error': 'El formulario ya ha sido enviado',
                        'status_code': 401}), 401
    # Verificar que los campos del formulario estén completos
    required_fields = ['nombre_apellido', 'email']
    for field in required_fields:
        if field not in request.form or not request.form[field]:
            return jsonify({'error': f'Falta el campo requerido: {field}',
                        'status_code': 405}), 405
    # Verificar si se cumplen las condiciones en las cookies
    required_cookies = ['id_premio']
    for cookie in required_cookies:
        if cookie not in session:
            return jsonify({'error': f'Debe jugar para poder recibir el premio',
                        'status_code': 403}), 403
    # Si las condiciones se cumplen, proceder a insertar la acciónD
    id_premio = session["id_premio"]
    nombre_apellido = request.form["nombre_apellido"]
    celular = request.form["celular"]
    email = request.form["email"]
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({'error': 'Formato de correo electrónico inválido',
                        'status_code': 404}), 404
    if controlador_db.check_mail_cargado(email,id_premio) == False:
        return jsonify({'error': 'Email ya cargado anteriormente',
                        'status_code': 402}), 402
    qr_accion_web = session['qr_accion_web']
    # Insertar la acción en la base de datos
    controlador_db.insert_accion(id_premio, nombre_apellido, celular, email, qr_accion_web)
    # Marcar el formulario como enviado en la sesión
    session['formulario_enviado'] = True
    respuesta_de_carga= controlador_db.get_accion_web_x_qr(qr_accion_web)
    context = {'nombre': respuesta_de_carga["nombre_apellido"], 
               'imagen_qr': respuesta_de_carga["qr_accion_web"], 
               'codigo_qr': respuesta_de_carga["qr_accion_web"], 
               'premio': respuesta_de_carga["descripcion_premio"],
               'fecha_vigencia': respuesta_de_carga["fecha_vigencia"]}
    envio_mail.envio_mail_template(email, 'Promociones Oasis Pilar', '/templates/mail.html', context)
    return jsonify({
        'message': 'Correo enviado correctamente',
                        'status_code': 200
    })

@app.route("/obtener_qr_premio")
@require_params(['qr_accion_web'])
def obtener_qr_premio():
    qr_accion_web= request.args.get('qr_accion_web')
    respuesta_de_carga= controlador_db.get_accion_web_x_qr(qr_accion_web)
    if respuesta_de_carga == ():
        return jsonify({
            'error' : 'Premio no existente'
        })
    else:
        qr_a_generar = qrcode.make(qr_accion_web)
        qr_io = BytesIO()
        qr_a_generar.save(qr_io, 'PNG')
        qr_io.seek(0)
        return send_file(qr_io, mimetype='image/png')

@app.route("/obtener_data_qr")
@require_params(['qr_accion_web'])
def obtener_data_qr():
    qr_accion_web = request.args.get('qr_accion_web')
    respuesta_de_carga= controlador_db.get_accion_web_x_qr(qr_accion_web)
    return jsonify(respuesta_de_carga)

@app.route("/obtener_premio")
@require_params(['codigo_campana'])
def obtener_premio():
    codigo_campana = request.args.get('codigo_campana')
    # Verificar si el usuario ya jugó antes
    if 'formulario_enviado' in session:
        respuesta_de_carga = controlador_db.traer_datos_premio(session["id_premio"])
        return jsonify({'error': 'El premio ya ha sido enviado',
                        'premio': respuesta_de_carga["descripcion_premio"],
                        'status_code': 401}), 401
    if 'id_premio' in session:
        premios = controlador_db.get_premios_campana(codigo_campana)
        resultados = [elemento for elemento in premios if str(elemento.get('id_premio')) == session["id_premio"]]
        if len(resultados) >= 1:
            respuesta_de_carga = controlador_db.traer_datos_premio(session["id_premio"])
            return jsonify({'error': 'Ya participaste de este juego',
                            'premio': respuesta_de_carga["descripcion_premio"],
                        'status_code': 402}),402
        else:
            session.pop('id_premio', None)
            session.pop('qr_accion_web', None)
            session.pop('formulario_enviado', None)
    # Verificar si la campaña existe
    premios = controlador_db.get_premios_campana(codigo_campana)
    if not premios:
        return jsonify({'error': 'Campaña no encontrada o no disponible',
                        'status_code': 403}),403
    # Número total de premios
    total_premios = len(premios)

    # Constantes para ajustar las probabilidades
    a = 1  # Mantenemos este valor constante
    b = 2.5  # Ajusta este valor para acercar las probabilidades deseadas

    # Generar pesos utilizando una función exponencial ajustada
    probabilidades = [a * (b ** i) for i in range(1, total_premios + 1)]

    # Seleccionar un premio al azar utilizando las probabilidades calculadas
    premio_seleccionado = random.choices(premios, weights=probabilidades, k=1)[0]
    session['id_premio'] = str(premio_seleccionado["id_premio"])
    session['qr_accion_web'] = generar_codigo_unico()
    #guardar premio sorteado
    controlador_db.insert_sorteo(str(premio_seleccionado["id_premio"]), session['qr_accion_web'] )
    # Retornar el premio
    premio_obtenido = {
        'premio': premio_seleccionado["descripcion_premio"],
        'status_code': 200
    }
    return jsonify(premio_obtenido),200

@app.route("/mail_enviado")
def mail_enviado():
    if 'formulario_enviado' in session:
        qr_accion_web = session['qr_accion_web']
        respuesta_de_carga= controlador_db.get_accion_web_x_qr(qr_accion_web)
        context = {'email': respuesta_de_carga["email"],
                   'status_code': 200}
        return jsonify(context)
    else:
        return jsonify({
            'error' : 'Debe jugar para poder obtener el premio',
                        'status_code': 401
        }), 401


# Manejo de errores para rutas no encontradas
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Página no encontrada',
                        'status_code': 404}), 404

# Manejo de errores para errores internos del servidor
@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Error interno del servidor',
                        'status_code': 500}), 500


if __name__ == '__main__' :
    app.run()

