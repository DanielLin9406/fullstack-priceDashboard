variable "vpc_id" {
  description = "The VPC id"
}

variable "environment" {
  description = "The name of the environment"
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "List of private cidrs, you may want one per avalibility zone"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "List of private ids, you may want one per avalibility zone"
}

variable "project_name" {
  description = "tag name that can be used in aws tag editor"
}
