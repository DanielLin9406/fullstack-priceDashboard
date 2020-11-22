vpc_cidr = "10.0.0.0/16"
environment = "stage"
cluster = "price-dashboard"
public_subnet_cidrs = ["10.0.0.0/25"]
private_subnet_cidrs = ["10.0.1.0/25"]
private_db_subnet_cidrs = ["10.0.2.0/25"]
availability_zones = ["us_east-1a"]
instance_type = "t2.micro"