variable "environment" {
  description = "The name of the environment"
}

variable "cluster" {
  description = "The name of the ECS cluster"
}

variable "instance_group" {
  description = "The name of the instances that you consider as a group"
}

variable "vpc_id" {
  description = "The VPC id"
}

variable "instance_type" {
  description = "AWS instance type to use"
}

# variable "iam_instance_profile_id" {
#   description = "The id of the instance profile that should be used for the instances"
# }

variable "private_subnet_ids" {
  type        = list(string)
  description = "List of private cidrs ids, you may want one per avalibility zone"
}

variable "alb_target_group_arn" {
  description = "Load balancer target group"
}

variable "redis_endpoint_address" {
  description = "Redis cache primary address"
}

variable "project_name" {
  description = "tag name that can be used in aws tag editor"
}

variable "ecs_config" {
  default     = "echo '' > /etc/ecs/ecs.config"
  description = "Specify ecs configuration or get it from S3. Example: aws s3 cp s3://some-bucket/ecs.config /etc/ecs/ecs.config"
}

variable "ecs_aws_ami" {
  description = "The AWS ami id to use"
}

variable "custom_userdata" {
  default     = ""
  description = "Inject extra command in the instance template to be run on boot"
}

variable "load_balancers" {
  type        = list
  default     = []
  description = "The load balancers to couple to the instances. Only used when NOT using ALB"
}

variable "key_name" {
  description = "SSH key name to be used"
}

variable "ecs_logging" {
  default     = "[\"json-file\",\"awslogs\"]"
  description = "Adding logging option to ECS that the Docker containers can use. It is possible to add fluentd as well"
}

variable "max_size" {
  description = "Maximum size of the nodes in the cluster"
}

variable "min_size" {
  description = "Minimum size of the nodes in the cluster"
}

variable "desired_capacity" {
  description = "The desired capacity of the cluster"
}

variable "depends_id" {
  description = "Workaround to wait for the NAT gateway to finish before starting the instances"
}
