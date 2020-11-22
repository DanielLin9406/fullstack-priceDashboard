#!/bin/bash

ecs_env_s3_bucket_name='price-dashboard-ecs-env'

project_path=$(dirname "$PWD")
s3_bucket_name_url="s3://$ecs_env_s3_bucket_name"

for i in `ls $project_path/services/*/.env` ;do
    aws s3 cp $i $s3_bucket_name_url/${i##*services/}
done