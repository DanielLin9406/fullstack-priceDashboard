provider "aws" {
  region = var.aws_region
}

variable "region" {
  description = "Region Name"
  default     = "us-east-2"
}

variable "aws_region" {
  description = "EC2 Region for the VPC"
  default     = "us-east-2"
}

# variable "remote_cidr"{
#     description = "CIDR from Remote Testing Source"
#     default = 
# }

variable "vpc_cidr" {
  description = "CIDR for the whole VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnet_2a_cidr" {
  description = "CIDR for the Public 2a Subnet"
  default     = "10.0.0.0/25"
}
variable "private_subnet_2a_cidr" {
  description = "CIDR for the Private 2a Subnet"
  default     = "10.0.1.0/25"
}

variable "private_db_subnet_2a_cidr" {
  description = "CIDR for the Private db 2a Subnet"
  default     = "10.0.2.0/25"
}
variable "availability_zones" {
  type    = list(string)
  default = ["us-east-2a"]
}
