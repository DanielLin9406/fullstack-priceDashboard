#!/bin/bash

export TF_LOG=TRACE
export TF_LOG=

# CD
terraform plan -var-file="ecs.tfvars"
terraform plan -out=./plan/ecs-plan

terraform destroy -var-file="ecs.tfvars"

terraform apply "./plan/ecs-plan"