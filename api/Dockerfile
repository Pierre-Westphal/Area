# setting up docker environnement

FROM python:3.8-slim-buster

WORKDIR /api
COPY . /api

RUN pip3 install -r requirements.txt

ENV SPOTIPY_CLIENT_ID=b2aab053fc67420abcde533046c2da7e
ENV SPOTIPY_CLIENT_SECRET=3369eaad77154324befde25c26f0f401
ENV SPOTIPY_REDIRECT_URI=http://localhost:8081
#ENV SPOTIPY_REDIRECT_URI=https://area.rom4all.com/spotify

# expose port
EXPOSE 8080
