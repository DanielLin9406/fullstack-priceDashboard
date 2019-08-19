#!/bin/bash
# Name of repository at dockerhub
DOCKER_NAME=$1
SHA=$2

# Latest: To make sure we reclone or rebuild our cluster that the latest is truely the latest image.
# $SHA: To make sure we can correctly update stuff in production

docker push $DOCKER_NAME/price-dashboard_nginx:latest
docker push $DOCKER_NAME/price-dashboard_web:latest
docker push $DOCKER_NAME/price-dashboard_user:latest
docker push $DOCKER_NAME/price-dashboard_prices:latest
docker push $DOCKER_NAME/price-dashboard_promotions:latest
docker push $DOCKER_NAME/price-dashboard_upgrade-rules:latest
docker push $DOCKER_NAME/price-dashboard_nginx:$SHA
docker push $DOCKER_NAME/price-dashboard_web:$SHA
docker push $DOCKER_NAME/price-dashboard_user:$SHA
docker push $DOCKER_NAME/price-dashboard_prices:$SHA
docker push $DOCKER_NAME/price-dashboard_promotions:$SHA
docker push $DOCKER_NAME/price-dashboard_upgrade-rules:$SHA