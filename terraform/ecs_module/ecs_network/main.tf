module "vpc" {
  source = "../../shared/vpc"

  vpc_cidr    = var.vpc_cidr
  environment = var.environment

}

module "nat_gateway" {
  source = "../../shared/nat_gateway"

  subnet_ids = module.public_subnet.ids
  # subnet_count = length(var.public_subnet_cidrs)

}

module "public_subnet" {
  source = "../../shared/subnet"

  subnet_name         = "${var.environment}_public_web_subnet"
  environment         = var.environment
  vpc_id              = module.vpc.id
  cidr_blocks         = var.public_subnet_cidrs
  availability_zones  = var.availability_zones
  internet_gateway_id = module.vpc.igw
}

module "private_subnet" {
  source = "../../shared/subnet"

  subnet_name        = "${var.environment}_private_app_subnet"
  environment        = var.environment
  vpc_id             = module.vpc.id
  cidr_blocks        = var.private_subnet_cidrs
  availability_zones = var.availability_zones
  nat_gateway_id     = module.nat_gateway.ids
}

module "private_db_subnet" {
  source = "../../shared/subnet"

  subnet_name        = "${var.environment}_private_db_subnet"
  environment        = var.environment
  vpc_id             = module.vpc.id
  cidr_blocks        = var.private_db_subnet_cidrs
  availability_zones = var.availability_zones
}

resource "null_resource" "dummy_dependency" {
  depends_on = [module.nat_gateway]
}
