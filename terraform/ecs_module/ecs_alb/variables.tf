variable "environment" {
  description = "The name of the environment"
}

variable "vpc_id" {
  description = "The VPC id"
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "List of public cidrs ids, you may want one per avalibility zone"
}

variable "cluster" {
  description = "The name of the ECS cluster"
}

variable "security_group_id" {
  description = "ecs instance security group"
}
