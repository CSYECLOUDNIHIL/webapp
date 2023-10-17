#!/bin/bash

sudo apt-get update
sudo apt-get install -y nodejs npm
node -v
npm -v

cd /home/admin/

unzip webapp.zip 

ls -a 

sudo apt-get clean
