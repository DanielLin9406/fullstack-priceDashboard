# Multi-container on AWS

[Dockerrun.aws.json doc](https://docs.aws.amazon.com/en_us/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions)

## Structure

1. Wrap services in Elastic Beanstalk Instance by Dockerrun.aws.json
2. AWS Elastic Cache as Redis

## Build a Container @prod

### Create an EB

(AWS will automatically create a S3 bucket)

"Using elasticbeanstalk-us-west-1-123123123" as Amazon S3 storage bucket for environment data.

### AWS Elastic Cache

1. Automatically creates and maintains Redis instances for you
2. Built in logging and maintenance
3. Better security than what we can do
4. Easier to migrate off of EB with

### Creating a Custom Security Group

Go to AWS Management Console and use Find Services to search for VPC

#### Virtual Private Cloud(VPC)

One default VPC per region

### Apply Security Groups to EB, Elastic Cache

EB instance can't talk to EC (and other outside service)
Solution: Create a secrutiy group(Firewall rules)

1. Allow any incoming traffic on Port 80 from any IP.
2. Allow any traffic from any other AWS service that has this security group.

### Set IAM keys

Go to AWS Management Console and use Find Services to search for IAM

## Add to environment variables to CI console

Add AWS_ACCESS_KEY, AWS_SECRET_KEY and set to your AWS secret key
