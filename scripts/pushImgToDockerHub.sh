#!/bin/bash
# Name of repository at dockerhub
$DOCKER_NAME=$1

docker push $DOCKER_NAME/price-dashboard_nginx:latest
docker push $DOCKER_NAME/price-dashboard_web:latest
docker push $DOCKER_NAME/price-dashboard_user:latest
docker push $DOCKER_NAME/price-dashboard_prices:latest
docker push $DOCKER_NAME/price-dashboard_promotions:latest
docker push $DOCKER_NAME/price-dashboard_upgrade-rules:latest