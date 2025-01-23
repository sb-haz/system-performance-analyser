output "eip_id" {
  value = aws_eip.static_ip.id
}

output "public_ip" {
  value = aws_eip.static_ip.public_ip
}