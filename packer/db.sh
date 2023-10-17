#!/bin/bash
# Installing the postresql sever
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# starting the server
sudo systemctl start postgresql.service
sudo systemctl enable postgresql.service

# Set the password for the user
sudo -u postgres psql -c "ALTER ROLE postgres WITH PASSWORD 'Assasinscreed2!';"


# Stop the PostgreSQL service
sudo systemctl stop postgresql.service
