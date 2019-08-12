#!/bin/bash
FullPath=$PWD
declare -a Containers=('nginx' 'prices' 'promotions' 'upgrade-rules' 'user' 'web')
declare -a ServicesName=(["nginx"]="$FullPath/nginx" ["prices"]="$FullPath/services/prices" ["promotions"]="$FullPath/services/promotions" ["upgrade-rules"]="$FullPath/services/upgrade-rules" ["user"]="$FullPath/services/user" ["web"]="$FullPath/services/web")

FolderName=${PWD##*/}

go2Folder(){
  cd $(echo $1 | tr -d '\r')
}

for i in "${Containers[@]}"; do
  # echo $i
  # echo ${ServicesName[$i]}
  [ ! "$(docker ps -a | grep $i)" ] && go2Folder ${ServicesName[$i]}
done
# # Build image for a particular services 
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


