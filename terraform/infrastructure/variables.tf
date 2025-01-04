variable "aws_region" {
  type    = string
  default = "eu-west-2"
}

variable "aws_account_id" {
  type = string
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "azs" {
  type = list(string)
  default = ["eu-west-2a", "eu-west-2b", "eu-west-2c"]
}

variable "private_subnets" {
  description = "CIDR blocks for private subnets"
  type = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "public_subnets" {
  description = "CIDR blocks for public subnets"
  type = list(string)
  default = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}