# aws_alb
resource "aws_alb" "alb" {
  name            = var.alb_name
  subnets         = var.public_subnet_ids
  security_groups = [aws_security_group.alb.id]
  internal        = false
  tags = {
    Environment = var.environment
  }
}

# Provides a Target Group resource for use with Load Balancer resources.
resource "aws_alb_target_group" "default" {
  name        = "${var.alb_name}_target_group"
  protocol    = "HTTP"
  port        = "80"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path = var.health_check_path
  }
  tags = {
    Environment = var.environment
  }
}

# Load Balancer Listener resource.
resource "aws_alb_listener" "price-dashboard" {
  load_balancer_arn = aws_alb.alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.default.arn
    type             = "forward"
  }

  depends_on = [aws_alb_target_group.default]
}


