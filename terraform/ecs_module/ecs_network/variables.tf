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

variable "private_db_subnet_cidrs" {
  type        = list(string)
  description = "List of private db cidrs, you may want one per avalibility zone"
}

variable "availability_zones" {
  type        = list(string)
  description = "List of avalibility zones you want. Example: eu-west-1a and eu-west-1b"
}
