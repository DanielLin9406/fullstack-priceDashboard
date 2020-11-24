resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true

  tags = {
    Environment = var.environment
    ProjectName = var.project_name
  }
}


resource "aws_internet_gateway" "vpc" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Environment = var.environment
    ProjectName = var.project_name
  }
}
