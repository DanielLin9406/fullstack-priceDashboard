output "redis_endpoint_address" {
  value = aws_elasticache_cluster.redis.primary_endpoint_address
}
