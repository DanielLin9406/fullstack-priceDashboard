resource "aws_ecs_task_definition" "price-dashboard" {
  family       = "price-dashboard"
  network_mode = "awsvpc"
  cpu          = 256
  memory       = 512
  container_definitions = templatefile("../../task-definitions.json.tpl", {
    REPOSITORY_URL = aws_ecr_repository.price-dashboard.repository_url
  })
  execution_role_arn = aws_iam_role.ecsTaskExecutionRole.arn
  task_role_arn      = aws_iam_role.ecs_task_assume.arn
  placement_constraints {
    type       = "memberOf"
    expression = "attribute:ecs.availability-zone in [us-west-2a]"
  }
}

resource "aws_ecs_service" "price-dashboard-service" {
  name            = "price-dashboard-service"
  cluster         = aws_ecs_cluster.price-dashboard.id
  launch_type     = "EC2"
  task_definition = aws_ecs_task_definition.price-dashboard.arn
  desired_count   = 2
  network_configuration {
    subnets         = [aws_subnet.private-subnet.id, aws_subnet.private-subnet.id]
    security_groups = [aws_security_group.ecs.id]
  }
  load_balancer {
    target_group_arn = aws_alb_target_group.price-dashboard.arn
    container_name   = "nginx-stage"
    container_port   = 80
  }
  placement_constraints {
    type       = "memberOf"
    expression = "attribute:ecs.availability-zone in [us-west-2a]"
  }
  depends_on = [
    aws_alb_listener.price-dashboard
  ]
}
