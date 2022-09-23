import os
import json
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from pages.status import Status

class Mail:
    def __init__(self):
        self.email = None
        self.password = None
        self.status = Status()

    def login(self, email, password):
        self.email = email
        self.password = password

    def send(self, subject, receiver, data):
        print(f"RECEIVER: {receiver}")
        try:
            if (subject != None and receiver != None and data != None):
                print(f"sending from {self.email} to {receiver}")
                message = MIMEMultipart()
                message['From'] = self.email
                message['To'] = receiver
                message['Subject'] = subject
                message.attach(MIMEText(f"{data}", 'plain'))
                session = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
                session.starttls() #enable security
                session.login(self.email, self.password) #login with mail_id and password
                text = message.as_string()
                session.sendmail(self.email, receiver, text)
                session.quit()
                print(f"email sent from {self.email} to {receiver}")
                return self.status.builder(self.status.SUCCESS, {"subject" : subject, "receiver" : receiver, "message" : data})
            return (self.status.builder(self.status.ERROR, { "subject" : subject, "receiver" : receiver, "data" : data }))
        except Exception as ex:
            print(ex)
            return (self.status.builder(self.status.ERROR, { "subject" : subject, "receiver" : receiver, "data" : data }))
