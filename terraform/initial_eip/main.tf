resource "aws_eip" "static_ip" {
  domain = "vpc"

  tags = {
    Name = "static-ip"
  }
}