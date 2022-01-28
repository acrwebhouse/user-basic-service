# user-basic-service
build docker
docker build . -t acrwebdev/user-basic-service

docker push
docker push acrwebdev/user-basic-service

run docker
docker run -p 13000:13000 --env SERVER_IP=35.201.152.0 --env SERVER_PORT=13000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=35.201.152.0 --restart=always -d acrwebdev/user-basic-service

