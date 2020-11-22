module "alb" {
  source            = "../../shared/alb"
  environment       = var.environment
  alb_name          = "${var.environment}-${var.cluster}"
  vpc_id            = var.vpc_id
  public_subnet_ids = var.public_subnet_ids
}

