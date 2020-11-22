provider "aws" {
  region = var.aws_region
}

module "ecs" {
  source                  = "./ecs_module"
  vpc_cidr                = var.vpc_cidr
  cluster                 = var.cluster
  instance_type           = var.instance_type
  environment             = var.environment
  public_subnet_cidrs     = var.public_subnet_cidrs
  private_subnet_cidrs    = var.private_subnet_cidrs
  private_db_subnet_cidrs = var.private_db_subnet_cidrs
  availability_zones      = var.availability_zones
}

# resource "aws_key_pair" "ecs" {
#   key_name   = "ecs-key-${var.environment}"
#   public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCtMljjj0Ccxux5Mssqraa/iHHxheW+m0Rh17fbd8t365y9EwBn00DN/0PjdU2CK6bjxwy8BNGXWoUXiSDDtGqRupH6e9J012yE5kxhpXnnkIcLGjkAiflDBVV4sXS4b3a2LSXL5Dyb93N2GdnJ03FJM4qDJ8lfDQxb38eYHytZkmxW14xLoyW5Hbyr3SXhdHC2/ecdp5nLNRwRWiW6g9OA6jTQ3LgeOZoM6dK4ltJUQOakKjiHsE+jvmO0hJYQN7+5gYOw0HHsM+zmATvSipAWzoWBWcmBxAbcdW0R0KvCwjylCyRVbRMRbSZ/c4idZbFLZXRb7ZJkqNJuy99+ld41 ecs@aws.fake"
# }

variable "aws_region" {
  description = "EC2 Region for the VPC"
  default     = "us-east-1"
}

# variable "remote_cidr"{
#     description = "CIDR from Remote Testing Source"
#     default = 
# }

variable "cluster" {
  description = "The name of the ECS cluster"
}

variable "environment" {
  description = "The name of the environment"
}

variable "vpc_cidr" {
  description = "CIDR for the whole VPC"
  default     = "10.0.0.0/16"
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
  type    = list(string)
  default = ["us-east-1a"]
}


variable "instance_type" {
  description = "AWS instance type to use"
}

