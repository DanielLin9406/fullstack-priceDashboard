

aws ec2 create-key-pair --key-name ecs-key-stage --query 'KeyMaterial' --output text > ecs-key-stage.pem
chmod 400 ecs-key-stage.pem
public_key=`ssh-keygen -y -f ecs-key-stage.pem`