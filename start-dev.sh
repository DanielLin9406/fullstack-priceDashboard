#!/usr/local/bin/bash
# GNU bash，版本 5.0.7(1)-release (x86_64-apple-darwin18.5.0)

FullPath=$PWD
FolderName=${PWD##*/}
declare -a Containers=('nginx' 'prices' 'promotions' 'upgrade-rules' 'user' 'web')
declare -A ServicesPath=( ["nginx"]="/nginx" ["prices"]="/services/prices" ["promotions"]="/services/promotions" ["upgrade-rules"]="/services/upgrade-rules" ["user"]="/services/user" ["web"]="/services/web" )

dockerBuildImage(){
  ServicesName=$1
  docker build -t pg-price-dashboard_${ServicesName}:latest -f ./docker-dev.dockerfile .
}

dockerRemoveImage(){
  ServicesName=$1
  docker rmi $(echo ${FolderName}_${ServicesName})
}

go2Folder(){
  RelativePath=$1
  ServicesName=$2
  cd $(echo ${FullPath}${RelativePath} | tr -d '\r')
  dockerBuildImage $2
}

# Serach a need-to-be-updated container 
for i in "${Containers[@]}"; do
  [ ! "$(docker ps -a | grep $i)" ] && dockerRemoveImage $i && go2Folder ${ServicesPath[$i]} $i
done

# Build image for a particular services 
# docker build -t pg-price-dashboard_nginx:latest -f ./docker-dev.dockerfile .
# docker build -t pg-price-dashboard_web:latest -f ./docker-dev.dockerfile .
# docker build -t pg-price-dashboard_user:latest -f ./docker-dev.dockerfile .
# docker build -t pg-price-dashboard_prices:latest -f ./docker-dev.dockerfile .
# docker build -t pg-price-dashboard_promotions:latest -f ./docker-dev.dockerfile .
# docker build -t pg-price-dashboard_upgrade-rules:latest -f ./docker-dev.dockerfile .

# # Build all image and run container
# docker-compose -f docker-compose-dev.yml --build
# docker-compose -f docker-compose-dev.yml up
# docker-compose up -d


