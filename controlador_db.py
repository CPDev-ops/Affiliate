import pymysql
from requests import NullHandler
from datetime import date,datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

#PROD
""" def obtener_conexion():
    return pymysql.connect(host='149.50.135.169',
                                user='remote',
                                password='C3LuL4**',
                                db='app_campanas_mkt',
                                port=3306) """

#DESARROLLO
def obtener_conexion():
    return pymysql.connect(host='192.168.2.53',
                                user='remote',
                                password='1234',
                                db='app_campanas_mkt',
                                port=3306)


def insert_accion(id_premio,nombre_apellido,celular,email,qr_accion_web):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        sql = "INSERT INTO acciones_web (id_premio,nombre_apellido,celular,email,qr_accion_web) VALUES (%s,%s,%s,%s,%s)"
        cursor.execute(sql, (id_premio,nombre_apellido,celular,email,qr_accion_web)) 
    id_premio = cursor.lastrowid
    conexion.commit()
    conexion.close()
    return(str(id_premio))

def traer_datos_premio(id_premio): 
    conexion = obtener_conexion()
    with conexion.cursor(pymysql.cursors.DictCursor) as cursor:
        cursor.execute("select descripcion_premio from premios where id_premio = '"+id_premio+"' AND estado = 'ACTIVO'")
        registro = cursor.fetchone()
    conexion.close()
    return registro

def get_premios_campana(codigo_campana):
    conexion = obtener_conexion()
    with conexion.cursor(pymysql.cursors.DictCursor) as cursor:
        cursor.execute("""
                       select premios.id_premio, premios.orden_premio, premios.descripcion_premio
                        from premios 
                        left join campanas on premios.id_campana= campanas.id_campana 
                        left join (select acciones_web.id_premio, count(acciones_web.qr_accion_web) "sorteados", count(conversiones.qr_accion_web) as "reclamados"
						from acciones_web 
						left join conversiones on acciones_web.id_accion_web  =conversiones.id_accion_web
						left join premios on acciones_web.id_premio = premios.id_premio
						left join campanas on premios.id_campana = campanas.id_campana
						where conversiones.id_accion_web is not null or acciones_web.fecha_creacion >= date_add(curdate() , INTERVAL -campanas.dias_vigencia_reclamo DAY)
						group by acciones_web.id_premio) as descuento_stock on premios.id_premio = descuento_stock.id_premio
                        where campanas.codigo_campana ='"""+codigo_campana+"""' and (premios.cantidad > descuento_stock.sorteados or descuento_stock.id_premio is null) 
                        and campanas.estado = 'ACTIVA' and campanas.fecha_desde <= curdate() and campanas.fecha_hasta >= curdate() 
                        and premios.estado = 'ACTIVO' and premios.fecha_desde <= curdate() and premios.fecha_hasta >= curdate()
                        order by premios.orden_premio asc
                        """)
        registro = cursor.fetchall()
    conexion.close()
    return registro

def check_mail_cargado(email,id_premio):
    conexion = obtener_conexion()
    with conexion.cursor(pymysql.cursors.DictCursor) as cursor:
        cursor.execute("""
                       select count(id_accion_web) as 'cantidad_de_cargas' 
                        from acciones_web
                        left join premios on acciones_web.id_premio =premios.id_premio
                        left join campanas on premios.id_campana= campanas.id_campana
                        where email = '"""+str(email)+"""' and campanas.id_campana = (select campanas.id_campana  
                        from premios
                        left join campanas on premios.id_campana =campanas.id_campana 
                        where id_premio = '"""+str(id_premio)+"""')
                       """)
        registro = cursor.fetchone()
    conexion.close()
    if registro["cantidad_de_cargas"] ==0:
        return True
    else:
        return False


def check_celular_cargado(celular):
    conexion = obtener_conexion()
    with conexion.cursor(pymysql.cursors.DictCursor) as cursor:
        cursor.execute("select count(id_accion_web) as 'cantidad_de_cargas' from acciones_web where celular = '"+str(celular)+"' ")
        registro = cursor.fetchone()
    conexion.close()
    if registro["cantidad_de_cargas"] ==0:
        return True
    else:
        return False
    

def get_accion_web_x_qr(qr_accion_web):
    conexion = obtener_conexion()
    with conexion.cursor(pymysql.cursors.DictCursor) as cursor:
        cursor.execute("""select qr_accion_web, nombre_apellido, premios.descripcion_premio, acciones_web.fecha_creacion as 'fecha_vigencia', email 
                            from acciones_web
                            left join premios 
                            on acciones_web.id_premio=premios.id_premio
                            where acciones_web.qr_accion_web = '"""+str(qr_accion_web)+"'")
        registro = cursor.fetchone()
    conexion.close()
    return registro

def insert_sorteo(id_premio,qr_accion_web):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        sql = "INSERT INTO sorteos_web (id_premio,qr_accion_web) VALUES (%s,%s)"
        cursor.execute(sql, (id_premio,qr_accion_web)) 
    id_premio = cursor.lastrowid
    conexion.commit()
    conexion.close()
    return(str(id_premio))

