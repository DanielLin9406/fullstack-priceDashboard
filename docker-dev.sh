#!/usr/local/bin/bash
# GNU bash，版本 5.0.7(1)-release (x86_64-apple-darwin18.5.0)

FullPath=$PWD
FolderName=${PWD##*/}
declare -a Containers=('nginx' 'prices' 'promotions' 'upgrade-rules' 'user' 'web')
declare -A ServicesPath=( ["nginx"]="/nginx" ["prices"]="/services/prices" ["promotions"]="/services/promotions" ["upgrade-rules"]="/services/upgrade-rules" ["user"]="/services/user" ["web"]="/services/web" )

dockerBuildImage(){
  RelativePath=$1
  ServicesName=$2
  docker build -t ${FolderName}_${ServicesName}:latest -f .${RelativePath}/docker-dev.dockerfile .${RelativePath}
}

dockerRemoveImage(){
  ServicesName=$1
  docker rmi $(echo ${FolderName}_${ServicesName})
}

# Serach a need-to-be-updated container 
for i in "${Containers[@]}"; do
  [ ! "$(docker ps -a | grep $i)" ] && dockerRemoveImage $i && dockerBuildImage ${ServicesPath[$i]} $i
done

# Build image for a particular services 
# docker build -t pg-price-dashboard_nginx:latest -f ./nginx/docker-dev.dockerfile ./nginx
# docker build -t pg-price-dashboard_web:latest -f ./services/web/docker-dev.dockerfile ./services/web
# docker build -t pg-price-dashboard_user:latest -f ./services/user/docker-dev.dockerfile ./services/user
# docker build -t pg-price-dashboard_prices:latest -f ./services/prices/docker-dev.dockerfile ./services/prices
# docker build -t pg-price-dashboard_promotions:latest -f ./services/promotions/docker-dev.dockerfile ./services/promotions
# docker build -t pg-price-dashboard_upgrade-rules:latest -f ./services/upgrade-rules/docker-dev.dockerfile ./services/upgrade-rules

# Build all image and run container
# docker-compose -f docker-compose-dev.yml build
# docker-compose -f docker-compose-dev.yml up
# docker-compose up -d

# Remove stop-state container
# docker stop $(docker ps -a -q)
# docker stop rm <containerID>
# docker container rm <containerID>

# Clear Redis Cache keys
# docker exec -it 33216c0bbd11 redis-cli FLUSHALL