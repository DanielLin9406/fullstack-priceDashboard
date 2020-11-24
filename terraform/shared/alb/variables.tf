variable "alb_name" {
  default     = "default alb"
  description = "The name of the loadbalancer"
}

variable "environment" {
  description = "The name of the environment"
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "List of public subnet ids"
}

variable "vpc_id" {
  description = "The VPC id"
}

variable "allow_cidr_block" {
  default     = ["0.0.0.0/0"]
  description = "Specify cidr block that is allowed to access the LoadBalancer"
}

variable "deregistration_delay" {
  default     = "300"
  description = "The default deregistration delay"
}

variable "health_check_path" {
  default     = "/"
  description = "The default health check path"
}

variable "project_name" {
  description = "tag name that can be used in aws tag editor"
}
