provider "aws" {
  region = var.aws_region
}

module "ecs" {
  source               = "./ecs_module"
  vpc_cidr             = var.vpc_cidr
  project_name         = var.project_name
  cluster              = var.cluster
  max_size             = var.max_size
  min_size             = var.min_size
  desired_capacity     = var.desired_capacity
  instance_type        = var.instance_type
  ecs_aws_ami          = var.ecs_aws_ami
  environment          = var.environment
  key_name             = aws_key_pair.ecs.key_name
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  availability_zones   = var.availability_zones
}

resource "aws_key_pair" "ecs" {
  key_name   = "ecs-key-${var.environment}"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC9H/2sFSFdfL8oOh1Aba0rrcZFVuUzE+Y9HYj41ghWQCWf6tx+F6EcFl8f+0ZkPDGxUW7i8cVKWbGA9oSFGLN0GDJwIODN8SBZxw/iRDtINa4W6svCyf4yBVLJ+EuLQSqQ4FBAN4jk2s8h1CTWUvIYaFib486I82PqOoo81JbK8Dm7NxtcSz1MDt81T0OUMXZSqiLvtR1r3HxGjk1zSaeAHXlr73wNumEcZVg3u6xGLvwhK3SWPAU9wDE1eaXFSgqXcGM+9w/wGXV+bxiBmWYx8k5+RjHTgd3oRI3hwbYpfShjectT2HZ2b7VHikLd8pkxrDfkpvf/fUyWN6y0Rssh"
}

variable "aws_region" {
  description = "EC2 Region for the VPC"
}

# variable "remote_cidr"{
#     description = "CIDR from Remote Testing Source"
#     default = 
# }

variable "desired_capacity" {}
variable "max_size" {}
variable "min_size" {}
variable "cluster" {
  description = "The name of the ECS cluster"
}

variable "environment" {
  description = "The name of the environment"
}

variable "vpc_cidr" {
  description = "CIDR for the whole VPC"
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "List of public cidrs, you may want one per avalibility zone"
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "List of private cidrs, you may want one per avalibility zone"
}

variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a"]
}

variable "instance_type" {
  description = "AWS instance type to use"
}

variable "project_name" {
  description = "tag name that can be used in aws tag editor"
}

variable "ecs_aws_ami" {
  description = "The AWS ami id to use for ECS"
}
