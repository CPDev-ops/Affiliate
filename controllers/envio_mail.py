import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from jinja2 import Environment, FileSystemLoader
import base64

def envio_mail_template(mail, subject, template_name, context):
    # Configurar los detalles del servidor SMTP de Gmail
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587  # El puerto 587 es el puerto estándar para el envío de correo SMTP con cifrado TLS (STARTTLS)
    # Configurar las credenciales de la cuenta de Gmail
    sender_email = 'promociones@bingopilar.com.ar'
    sender_password = 'jqwp ximc orha bijc'

    try:
        # Crear el mensaje
        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = mail
        message['Subject'] = subject

        # Cargar el template HTML
        env = Environment(loader=FileSystemLoader('.'))
        template = env.get_template(template_name)

        # Renderizar el template con el contexto proporcionado
        body = template.render(context)
        print(template)
        # Adjuntar el cuerpo del correo
        message.attach(MIMEText(body, 'html'))

        # Iniciar una conexión segura con el servidor SMTP de Gmail
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        # Iniciar sesión en la cuenta de Gmail
        server.login(sender_email, sender_password)
        # Enviar el correo electrónico
        server.send_message(message)
        # Cerrar la conexión con el servidor SMTP
        server.quit()
        return "Correo electrónico enviado correctamente"
    except smtplib.SMTPException as e:
        return f"Error al enviar el correo electrónico: {str(e)}"
    except Exception as e:
        return f"Error inesperado: {str(e)}"
