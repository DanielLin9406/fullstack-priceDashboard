# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_cluster

output "redis_endpoint_address" {
  value = aws_elasticache_cluster.redis.cache_nodes.0.address
}
