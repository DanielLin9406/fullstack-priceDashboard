resource "aws_iam_role" "ec2-readonly-role" {
  name               = "ec2-readonly-role"
  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement":[
        {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": "ec2.amazonaws.com"
            },
            "Effect":"Allow",
            "Sid":""
        }
    ] 
}
EOF
}
# EC2 instance profiles allow you to attach an IAM role to an EC2 instance. 
# This allows any application running on the instance to access certain resources defined in the role policies.
# https://kichik.com/2020/09/08/how-does-ec2-instance-profile-work/#:~:text=EC2%20instance%20profiles%20allow%20you,defined%20in%20the%20role%20policies.&text=Instance%20profiles%2C%20and%20roles%20in,provide%20temporary%20credentials%20per%2Duse.
resource "aws_iam_instance_profile" "ec2-readonly-profile" {
  name = "ec2-readonly-profile"
  role = aws_iam_role.ec2-readonly-role.name
}

resource "aws_iam_role_policy_attachment" "attach-ec2-readonly-policy" {
  role       = aws_iam_role.ec2-readonly-role.name
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}
