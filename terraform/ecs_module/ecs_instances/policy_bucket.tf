resource "aws_iam_role" "s3-readonly-role" {
  name               = "s3-readonly-role"
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

resource "aws_iam_role_policy" "s3-readonly-role" {
  name   = "s3-readonly-role"
  role   = aws_iam_role.s3-readonly-role.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::price-dashboard-ecs-env"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetBucketLocation"
      ],
      "Resource": [
        "arn:aws:s3:::price-dashboard-ecs-env"
      ]
    }
  ]
}
EOF
}
