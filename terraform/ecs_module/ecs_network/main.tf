module "vpc" {
  source = "../../shared/vpc"

  vpc_cidr     = var.vpc_cidr
  environment  = var.environment
  project_name = var.project_name
}

module "nat_gateway" {
  source = "../../shared/nat_gateway"

  subnet_ids   = module.public_subnet.ids
  environment  = var.environment
  project_name = var.project_name
  # subnet_count = length(var.public_subnet_cidrs)

}

module "public_subnet" {
  source = "../../shared/subnet"

  subnet_name        = "${var.environment}_public_web_subnet"
  environment        = var.environment
  project_name       = var.project_name
  vpc_id             = module.vpc.id
  cidr_blocks        = var.public_subnet_cidrs
  availability_zones = var.availability_zones
  # internet_gateway_id = module.vpc.igw_id
}

module "private_subnet" {
  source = "../../shared/subnet"

  subnet_name        = "${var.environment}_private_app_subnet"
  environment        = var.environment
  project_name       = var.project_name
  vpc_id             = module.vpc.id
  cidr_blocks        = var.private_subnet_cidrs
  availability_zones = var.availability_zones
  # nat_gateway_id     = module.nat_gateway.ids
}

resource "aws_route" "public_igw_route" {
  count                  = length(var.public_subnet_cidrs)
  route_table_id         = element(module.public_subnet.route_table_ids, count.index)
  gateway_id             = module.vpc.igw_id
  destination_cidr_block = var.destination_cidr_block
}

resource "aws_route" "private_nat_route" {
  count                  = length(var.private_subnet_cidrs)
  route_table_id         = element(module.private_subnet.route_table_ids, count.index)
  nat_gateway_id         = element(module.nat_gateway.ids, count.index)
  destination_cidr_block = var.destination_cidr_block
}

resource "null_resource" "dummy_dependency" {
  depends_on = [module.nat_gateway]
}
