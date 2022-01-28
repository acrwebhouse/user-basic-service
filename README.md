# user-basic-service
build docker
docker build . -t acrwebdev/user-basic-service

run docker
docker run -p 13000:13000 --env SERVER_IP=foo --env SERVER_PORT=13000 --env DB_PORT=27017 --env DB_IP=35.201.152.0 --env SWAGGER_IP=192.168.0.13 --restart=always -d acrwebdev/user-basic-service

