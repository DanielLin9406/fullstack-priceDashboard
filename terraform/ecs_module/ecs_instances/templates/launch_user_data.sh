#!/bin/bash

# # Timezone
# ln -fs /usr/share/zoneinfo/Europe/Amsterdam /etc/localtime

# ECS config
echo ECS_CLUSTER=${cluster_name} >> /etc/ecs/ecs.config

start ecs

# yum install -y aws-cli jq

#Get ECS instance info, althoug not used in this user_data it self this allows you to use
#az(availability zone) and region
until $(curl --output /dev/null --silent --head --fail http://localhost:51678/v1/metadata); do
    printf '.'
    sleep 5
done
instance_arn=$(curl -s http://localhost:51678/v1/metadata | jq -r '. | .ContainerInstanceArn' | awk -F/ '{print $NF}' )
az=$(curl -s http://instance-data/latest/meta-data/placement/availability-zone)
region=$${az:0:$${#az} - 1}

aws ecs start-task --cluster ${cluster_name} --task-definition cadvisor:1 --container-instances $instance_arn --region $region

#Custom userdata script code
${custom_userdata}

echo "Done"