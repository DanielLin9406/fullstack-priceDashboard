module "network" {
  source = "./ecs_network"

  vpc_cidr                = var.vpc_cidr
  environment             = var.environment
  public_subnet_cidrs     = var.public_subnet_cidrs
  private_subnet_cidrs    = var.private_subnet_cidrs
  private_db_subnet_cidrs = var.private_db_subnet_cidrs
  availability_zones      = var.availability_zones
}


module "ecs_alb" {
  source = "./ecs_alb"

  environment       = var.environment
  cluster           = var.cluster
  vpc_id            = module.network.vpc_id
  public_subnet_ids = module.network.public_subnet_ids
  security_group_id = module.ecs_instances.ecs_instance_security_group_id

}

module "ecs_instances" {
  source = "./ecs_instances"

  environment          = var.environment
  cluster              = var.cluster
  instance_group       = var.instance_group
  instance_type        = var.instance_type
  vpc_id               = module.network.vpc_id
  private_subnet_ids   = module.network.private_subnet_ids
  alb_target_group_arn = module.ecs_alb.default_alb_target_group.arn
}

module "ecs_cache" {
  source = "./ecs_cache"

  vpc_id               = module.network.vpc_id
  private_subnet_cidrs = var.private_subnet_cidrs
}


