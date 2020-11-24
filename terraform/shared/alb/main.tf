# aws_alb
resource "aws_alb" "alb" {
  name            = var.alb_name
  subnets         = var.public_subnet_ids
  security_groups = [aws_security_group.alb.id]
  internal        = false
  tags = {
    Environment = var.environment
    ProjectName = var.project_name
  }
}

# Provides a Target Group resource for use with Load Balancer resources.
# Connect alb with aws service
# Port: The port on which targets receive traffic, unless overridden when registering a specific target. 
resource "aws_alb_target_group" "default" {
  name        = "${var.alb_name}-tg"
  protocol    = "HTTP"
  port        = 80
  vpc_id      = var.vpc_id
  target_type = "ip"

  lifecycle {
    create_before_destroy = true
  }

  health_check {
    path = var.health_check_path
  }

  tags = {
    Environment = var.environment
    ProjectName = var.project_name
  }
}

# Load Balancer Listener resource.
# Listen connection from outside world
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


