#!/bin/bash
sudo apt-get update
sudo apt-get install -y nodejs npm
sudo apt-get install -y unzip
sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225 
mkdir webapp-main
mv webapp.zip ./webapp-main
cd webapp-main
unzip webapp.zip
sudo cp /home/admin/webapp/Packer/healthz-systemd.service /lib/systemd/system/healthz-systemd.service
npm install
sudo apt-get remove -y git
sudo apt-get clean
