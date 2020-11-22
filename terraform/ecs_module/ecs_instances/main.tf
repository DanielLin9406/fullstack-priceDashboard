resource "aws_ecs_task_definition" "cluster" {
  family       = "price-dashboard"
  network_mode = "awsvpc"
  cpu          = 256
  memory       = 512
  container_definitions = templatefile("${path.module}/templates/task-definitions.json.tpl", {
    REPOSITORY_URL = "danielin9406"
    REDIS_HOST     = ""
    S3_BUCKET_NAME = ""
  })
  execution_role_arn = aws_iam_role.ecsTaskExecutionRole.arn
  task_role_arn      = aws_iam_role.ecs_task_assume.arn
  placement_constraints {
    type       = "memberOf"
    expression = "attribute:ecs.availability-zone in [us-west-1a]"
  }
}

resource "aws_ecs_service" "price-dashboard-service" {
  name            = "price-dashboard-service"
  cluster         = aws_ecs_cluster.cluster.id
  launch_type     = "EC2"
  task_definition = aws_ecs_task_definition.cluster.arn
  desired_count   = 2
  network_configuration {
    subnets         = var.private_subnet_ids
    security_groups = [aws_security_group.instance.id]
  }
  load_balancer {
    target_group_arn = var.alb_target_group_arn
    container_name   = "nginx-stage"
    container_port   = 80
  }
  placement_constraints {
    type       = "memberOf"
    expression = "attribute:ecs.availability-zone in [us-west-1a]"
  }
  # depends_on = [
  #   aws_alb_listener.price-dashboard
  # ]
}

resource "aws_ecs_cluster" "cluster" {
  name = var.cluster
}
