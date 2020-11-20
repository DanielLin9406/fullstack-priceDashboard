# aws_alb
resource "aws_alb" "price-dashboard" {
  name            = "price-dashboard"
  security_groups = [aws_security_group.ecs.id, aws_security_group.alb.id]
  subnets         = [aws_subnet.public-subnet.id]
  internal        = false
  tags = {
    Environment = "dev"
  }
}

# aws_alb_target_group
resource "aws_alb_target_group" "price-dashboard" {
  name        = "price-dashboard"
  protocol    = "HTTP"
  port        = "80"
  vpc_id      = aws_vpc.default.id
  target_type = "ip"
  health_check {
    path = "/"
  }
}

# aws_alb_listener
resource "aws_alb_listener" "price-dashboard" {
  load_balancer_arn = aws_alb.price-dashboard.arn
  port              = "80"
  protocol          = "HTTP"
  default_action {
    target_group_arn = aws_alb_target_group.price-dashboard.arn
    type             = "forward"
  }
  depends_on = [aws_alb_target_group.price-dashboard]
}
output "price-dashboard_alb_dns_name" {
  value = aws_alb.price-dashboard.dns_name
}
