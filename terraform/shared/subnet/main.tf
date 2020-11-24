resource "aws_subnet" "subnet" {
  vpc_id            = var.vpc_id
  cidr_block        = element(var.cidr_blocks, count.index)
  availability_zone = element(var.availability_zones, count.index)
  count             = length(var.cidr_blocks)

  tags = {
    Name        = "${var.subnet_name}_${element(var.availability_zones, count.index)}"
    Environment = var.environment
    ProjectName = var.project_name
  }
}

# Connect between subnet and gateway.
resource "aws_route_table" "subnet" {
  vpc_id = var.vpc_id
  count  = length(var.cidr_blocks)

  tags = {
    Name        = "${var.subnet_name}_${element(var.availability_zones, count.index)}"
    Environment = var.environment
    ProjectName = var.project_name
  }
}

resource "aws_route_table_association" "subnet" {
  subnet_id      = element(aws_subnet.subnet.*.id, count.index)
  route_table_id = element(aws_route_table.subnet.*.id, count.index)
  count          = length(var.cidr_blocks)
}

# route {
#   cidr_block     = element(var.cidr_blocks, count.index)
#   gateway_id     = var.internet_gateway_id
#   nat_gateway_id = length(var.nat_gateway_id) != 0 ? element(var.nat_gateway_id, count.index) : ""
# }
