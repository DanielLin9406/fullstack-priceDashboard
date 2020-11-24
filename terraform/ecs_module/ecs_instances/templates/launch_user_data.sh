#!/bin/bash

# Timezone
ln -fs /usr/share/zoneinfo/Europe/Amsterdam /etc/localtime

# ECS config
${ecs_config}
{
    echo "ECS_CLUSTER=${cluster_name}"
    echo 'ECS_AVAILABLE_LOGGING_DRIVERS=${ecs_logging}'
} >> /etc/ecs/ecs.config

start ecs

#Get ECS instance info, althoug not used in this user_data it self this allows you to use
#az(availability zone) and region
until $(curl --output /dev/null --silent --head --fail http://localhost:51678/v1/metadata); do
    printf '.'
    sleep 5
done
instance_arn=$(curl -s http://localhost:51678/v1/metadata | jq -r '. | .ContainerInstanceArn' | awk -F/ '{print $NF}' )
az=$(curl -s http://instance-data/latest/meta-data/placement/availability-zone)
region=$${az:0:$${#az} - 1}

#Custom userdata script code
${custom_userdata}

echo "Done"