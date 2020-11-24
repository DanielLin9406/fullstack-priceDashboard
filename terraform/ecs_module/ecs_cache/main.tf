resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "price-dashboard-redis"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis3.2"
  engine_version       = "3.2.10"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis.name

  tags = {
    Environment = var.environment
    ProjectName = var.project_name
  }
}

resource "aws_elasticache_subnet_group" "redis" {
  name       = "redis-subnet-group"
  subnet_ids = var.private_subnet_ids
}

# resource "aws_elasticache_replication_group" "redis" {
#   replication_group_id          = "mongodb"
#   replication_group_description = "Redis cluster powering  = MongoDB"
#   engine                        = "redis"
#   node_type                     = "cache.t3.micro"
#   number_cache_clusters         = 2
#   port                          = 6379
#   availability_zones            = var.availability_zones
#   automatic_failover_enabled    = true
#   security_group_ids            = [aws_security_group.redis.id]
#   subnet_group_name             = aws_elasticache_subnet_group.mongodb_redis.name
# }

