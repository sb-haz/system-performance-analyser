variable "region" {
  type    = string
  default = "eu-west-2"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "ami_id" {
  type    = string
  default = "ami-0d18e50ca22537278"
}

variable "instance_name" {
  type    = string
  default = "MyEC2Terra"
}

variable "sg_name" {
  type    = string
  default = "allow_http"
}