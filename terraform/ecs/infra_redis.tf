resource "aws_elasticache_subnet_group" "mongodb_redis" {
  name       = "mongodb-redis-subnet-group"
  subnet_ids = [aws_subnet.private-subnet.id]
}
resource "aws_elasticache_replication_group" "mongodb_redis" {
  replication_group_id          = "mongodb"
  replication_group_description = "Redis cluster powering  = MongoDB"
  engine                        = "redis"
  node_type                     = "cache.t3.micro"
  number_cache_clusters         = 2
  port                          = 6379
  availability_zones            = var.availability_zones
  automatic_failover_enabled    = true
  security_group_ids            = [aws_security_group.sg_redis.id]
  subnet_group_name             = aws_elasticache_subnet_group.mongodb_redis.name
}
output "mongodb_redis_endpoint_address" {
  value = aws_elasticache_replication_group.mongodb_redis.primary_endpoint_address
}
