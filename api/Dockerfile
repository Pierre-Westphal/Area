# setting up docker environnement

FROM python:3.8-slim-buster

WORKDIR /api
COPY . /api

RUN pip3 install -r requirements.txt

ENV SPOTIPY_REDIRECT_URI=http://localhost:8081
#ENV SPOTIPY_REDIRECT_URI=https://area.rom4all.com/spotify

# expose port
EXPOSE 8080
