#!/bin/sh
# This is a comment!
echo Quick start        # This is a comment, too!


sudo kill -9 $(lsof -ti tcp:27017) #clear ports
sudo kill -9 $(lsof -ti tcp:8000)
sudo kill -9 $(lsof -ti tcp:3000)
mongod --dbpath /data/mongodb & #start mongoDB
cd ./API
sleep 1
node api.js & #start api
cd ..
cd ./React-App 
npm start #start the react server

echo here
