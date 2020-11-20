# Define the security group for Redis
resource "aws_security_group" "sg_redis" {
  name        = "sg_redis"
  description = "Allow traffic from private subnet"
  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = [var.private_subnet_2a_cidr]
  }
  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = [var.private_subnet_2a_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  vpc_id = aws_vpc.default.id
  tags = {
    Name = "Redis SG"
  }
}
