resource "aws_subnet" "public-subnet" {
  vpc_id            = aws_vpc.default.id
  cidr_block        = var.public_subnet_2a_cidr
  availability_zone = "us_east-2a"

  tags = {
    Name = "Web Public Subnet 1"
  }
}

resource "aws_subnet" "private-subnet" {
  vpc_id            = aws_vpc.default.id
  cidr_block        = var.private_subnet_2a_cidr
  availability_zone = "us_east-2a"

  tags = {
    Name = "App Private Subnet 1"
  }
}

resource "aws_subnet" "private-db-subnet" {
  vpc_id            = aws_vpc.default.id
  cidr_block        = var.private_db_subnet_2a_cidr
  availability_zone = "us_east-2a"

  tags = {
    Name = "Database Private Subnet 1"
  }
}
