#!/bin/bash
K8S_Folder="../k8s"

$DOCKER_NAME=$1
$SHA=$2

# Config google cloud and GCD is incharge of kuectl command inside travis environment
# Build template and feed a config file to kubectl
webTemplate=`cat "$K8S_Folder/web-deployment.yaml" | sed "s/{{DOCKER_NAME}}/$DOCKER_NAME/g"`
userTemplate=`cat "$K8S_Folder/user-deployment.yaml" | sed "s/{{DOCKER_NAME}}/$DOCKER_NAME/g"`
pricesTemplate=`cat "$K8S_Folder/prices-deployment.yaml" | sed "s/{{DOCKER_NAME}}/$DOCKER_NAME/g"`
promotionsTemplate=`cat "$K8S_Folder/promotions-deployment.yaml" | sed "s/{{DOCKER_NAME}}/$DOCKER_NAME/g"`
upgradeRulesTemplate=`cat "$K8S_Folder/upgrade-rules-deployment.yaml" | sed "s/{{DOCKER_NAME}}/$DOCKER_NAME/g"`

echo $webTemplate | kubctl apply -f -
echo $userTemplate | kubctl apply -f -
echo $pricesTemplate | kubctl apply -f -
echo $promotionsTemplate | kubctl apply -f -
echo $upgradeRulesTemplate | kubctl apply -f -

# Feed a config file to kubectl
kubctl apply -f k8s/setting

# Update image
kubctl set image deployments/web-deployment web=$DOCKER_NAME/price-dashboard_web:$SHA
kubctl set image deployments/user-deployment user=$DOCKER_NAME/price-dashboard_user:$SHA
kubctl set image deployments/prices-deployment prices=$DOCKER_NAME/price-dashboard_prices:$SHA
kubctl set image deployments/promotions-deployment promotions=$DOCKER_NAME/price-dashboard_promotions:$SHA
kubctl set image deployments/upgrade-rules-deployment upgrade-rules=$DOCKER_NAME/price-dashboard_upgrade-rules:$SHA
