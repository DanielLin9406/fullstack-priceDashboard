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

variable "private_subnet_ids" {
  type        = list(string)
  description = "List of private cidrs ids, you may want one per avalibility zone"
}

variable "alb_target_group_arn" {
  description = "Load balancer target group"
}
