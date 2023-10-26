#!/bin/bash
sudo apt-get update
sudo apt-get install -y nodejs npm
sudo apt-get install -y unzip
sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225
sudo mv /home/admin/webapp.zip /opt/csye6225/webapp.zip
cd /opt/csye6225/
sudo unzip webapp.zip
sudo chown -R csye6225:csye6225 /opt/csye6225
sudo chmod -R 750 /opt/csye6225
sudo cp /opt/csye6225/packer/healthz-systemd.service /lib/systemd/system/healthz-systemd.service
sudo npm install
sudo apt-get remove -y git
sudo apt-get clean
