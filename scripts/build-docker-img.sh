#!/bin/bash
$DOCKER_NAME=$1

docker build -t $DOCKER_NAME/price-dashboard_nginx:latest -t $DOCKER_NAME/price-dashboard_nginx:$SHA ./nginx
docker build -t $DOCKER_NAME/price-dashboard_web:latest -t $DOCKER_NAME/price-dashboard_web:$SHA ./services/web
docker build -t $DOCKER_NAME/price-dashboard_user:latest -t $DOCKER_NAME/price-dashboard_user:$SHA ./services/user
docker build -t $DOCKER_NAME/price-dashboard_prices:latest -t $DOCKER_NAME/price-dashboard_prices:$SHA ./services/prices
docker build -t $DOCKER_NAME/price-dashboard_promotions:latest -t $DOCKER_NAME/price-dashboard_promotions:$SHA ./services/promotions
docker build -t $DOCKER_NAME/price-dashboard_upgrade-rules:latest -t $DOCKER_NAME/price-dashboard_upgrade-rules:$SHA ./services/upgrade-rules