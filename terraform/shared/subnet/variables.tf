variable "subnet_name" {
  description = "Name of the subnet, actual name will be, for example: name_eu-west-1a"
}

variable "environment" {
  description = "The name of the environment"
}

variable "cidr_blocks" {
  type        = list(string)
  description = "List of cidrs, for every avalibility zone you want you need one. Example: 10.0.0.0/24 and 10.0.1.0/24"
}

# variable "nat_gateway_id" {
#   default = []
#   type    = list(string)
# }

# variable "internet_gateway_id" {
#   default = ""
#   type    = string
# }

variable "availability_zones" {
  type        = list(string)
  description = "List of avalibility zones you want. Example: eu-west-1a and eu-west-1b"
}

variable "vpc_id" {
  description = "VPC id to place to subnet info"
}

variable "project_name" {
  description = "tag name that can be used in aws tag editor"
}
