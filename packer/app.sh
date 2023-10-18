#!/bin/bash

sudo apt-get update
sudo apt-get install -y nodejs npm
node -v
npm -v
sudo apt-get install -y unzip

mkdir webapp-main

ls -a

mv webapp.zip ./webapp-main

if [ -f /home/admin/webapp-main/webapp.zip ]; then
    echo "webapp.zip exists"
else
    echo "webapp.zip does not exist"
fi



cd webapp-main

unzip webapp.zip

npm install

ls -a 

sudo apt-get clean
