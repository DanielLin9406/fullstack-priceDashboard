resource "aws_ecs_task_definition" "cluster" {
  family       = "price-dashboard"
  network_mode = "awsvpc"
  cpu          = 768
  memory       = 6144
  container_definitions = templatefile("${path.module}/templates/task-definitions.json.tpl", {
    REPOSITORY_URL = "danielin9406"
    REDIS_HOST     = var.redis_endpoint_address
    S3_BUCKET_NAME = "price-dashboard-ecs-env"
  })
  execution_role_arn = aws_iam_role.ecsTaskExecutionRole.arn
  task_role_arn      = aws_iam_role.ecs_task_assume.arn
  placement_constraints {
    type       = "memberOf"
    expression = "attribute:ecs.availability-zone in [us-west-1a, us-west-1b]"
  }
  tags = {
    Environment = var.environment
    ProjectName = var.project_name
  }
}

resource "aws_ecs_service" "price-dashboard-service" {
  name            = "price-dashboard-service"
  cluster         = aws_ecs_cluster.cluster.id
  launch_type     = "EC2"
  task_definition = aws_ecs_task_definition.cluster.arn
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
    expression = "attribute:ecs.availability-zone in [us-west-1a, us-west-1b]"
  }
  tags = {
    Environment = var.environment
    ProjectName = var.project_name
  }
  # depends_on = [
  #   aws_alb_listener.price-dashboard
  # ]
}

resource "aws_ecs_cluster" "cluster" {
  name = var.cluster
  tags = {
    Environment = var.environment
    ProjectName = var.project_name
  }
}

# Default disk size for Docker is 22 gig, see http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-optimized_AMI.html
resource "aws_launch_configuration" "launch" {
  name_prefix     = "${var.environment}_${var.cluster}_${var.instance_group}_"
  image_id        = var.ecs_aws_ami
  instance_type   = var.instance_type
  security_groups = [aws_security_group.instance.id]
  user_data = templatefile("${path.module}/templates/launch_user_data.sh", {
    ecs_config      = var.ecs_config
    ecs_logging     = var.ecs_logging
    cluster_name    = var.cluster
    env_name        = var.environment
    custom_userdata = var.custom_userdata
  })
  iam_instance_profile = aws_iam_instance_profile.ec2-readonly-profile.id
  key_name             = var.key_name

  # aws_launch_configuration can not be modified.
  # Therefore we use create_before_destroy so that a new modified aws_launch_configuration can be created 
  # before the old one get's destroyed. That's why we use name_prefix instead of name.
  lifecycle {
    create_before_destroy = true
  }
}

