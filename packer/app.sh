#!/bin/bash

sudo apt-get update
sudo apt-get install -y nodejs npm
node -v
npm -v

cd /home/admin/

sudo apt-get install -y unzip



mkdir webapp-main

cd webapp-main

unzip webapp.zip

npm install

ls -a 

sudo apt-get clean
