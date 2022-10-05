# user-basic-service

build docker
docker build . -t acrwebdev/user-basic-service:0.0.2

docker push
docker push acrwebdev/user-basic-service:0.0.2

docker pull
docker pull acrwebdev/user-basic-service:0.0.2

docker pull acrwebdev/user-basic-service:latest

run docker
docker run -p 13000:13000 --env SERVER_IP=34.80.78.75 --env SERVER_PORT=13000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=34.80.78.75 --restart=always --name=user-basic-service -d acrwebdev/user-basic-service:0.0.2
