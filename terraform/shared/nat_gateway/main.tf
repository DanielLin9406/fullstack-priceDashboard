resource "aws_nat_gateway" "nat" {
  allocation_id = element(aws_eip.nat.*.id, count.index)
  subnet_id     = element(var.subnet_ids, count.index)
  count         = length(var.subnet_ids)
}

resource "aws_eip" "nat" {
  vpc = true
}

