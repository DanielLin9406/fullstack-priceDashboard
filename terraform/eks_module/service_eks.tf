resource "aws_eks_cluster" "aws_eks" {
  name     = "eks_cluster_tuto"
  role_arn = aws_iam_role.eks_cluster.arn

  vpc_config {
    subnet_ids = ["subnet-4d0d3324", "subnet-b3a8f9c8"]
  }

  tags = {
    Name = "EKS_tuto"
  }
}
