#!/bin/bash

sudo apt-get update
sudo apt-get install -y nodejs npm
sudo apt-get install -y unzip
mkdir webapp-main
mv webapp.zip ./webapp-main
cd webapp-main
unzip webapp.zip
npm install
sudo apt-get remove -y git
sudo apt-get clean
