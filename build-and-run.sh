#!/bin/sh

git fetch origin
git merge
sudo docker build -t joelin/rain-webapp:latest .
sudo docker run -it --rm -v /home/joelin/rain-webapp:/app -v /app/node_modules -p 8081:8081 -e CHOKIDAR_USEPOLLING=true joelin/rain-webapp:latest

