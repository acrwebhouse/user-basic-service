# user-basic-service

build docker
docker build . -t acrwebdev/user-basic-service

docker push
docker push acrwebdev/user-basic-service

run docker
docker run -p 13000:13000 --env SERVER_IP=34.81.209.11 --env SERVER_PORT=13000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=34.81.209.11 --restart=always -d acrwebdev/user-basic-service
