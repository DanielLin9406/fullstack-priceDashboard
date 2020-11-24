variable "vpc_cidr" {
  description = "VPC cidr block. Example: 10.0.0.0/16"
}

variable "environment" {
  description = "The name of the environment"
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "List of public cidrs, you may want one per avalibility zone"
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "List of private cidrs, you may want one per avalibility zone"
}

variable "destination_cidr_block" {
  default     = "0.0.0.0/0"
  description = "Specify all traffic to be routed either trough Internet Gateway or NAT to access the internet"
}


variable "availability_zones" {
  type        = list(string)
  description = "List of avalibility zones you want. Example: eu-west-1a and eu-west-1b"
}

variable "project_name" {
  description = "tag name that can be used in aws tag editor"
}
