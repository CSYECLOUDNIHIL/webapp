packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}


variable "aws_ami_region" {
  type      = string
  default   = ""
  sensitive = true
}


variable "aws_ami_owner_dev" {
  type      = string
  default   = "250820048302"
  sensitive = true
}

variable "aws_ami_owner_demo" {
  type      = string
  default   = ""
  sensitive = true
}


variable "source_name" {
  type      = string
  default   = ""
  sensitive = true
}

variable "path" {
  type      = string
  default   = ""
  sensitive = true
}


variable "ami_source_name" {
  type      = string
  default   = "ami-06db4d78cb1d3bbf9"
  sensitive = true
}


variable "aws_access_key" {
  type      = string
  default   = ""
  sensitive = true
}

variable "aws_secret_key" {
  type      = string
  default   = ""
  sensitive = true
}


variable "instance_type" {
  type      = string
  default   = "t2.micro"
  sensitive = true
}



variable "zip_file_path" {
  type      = string
  default   = ""
  sensitive = true
}

variable "ssh_username" {
  type      = string
  default   = "admin"
  sensitive = true
}

variable "subnet_id" {
  type      = string
  default   = "subnet-099317c8130cea37f"
  sensitive = true
}




source "amazon-ebs" "debian-aws-ami" {
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  source_ami      = "${var.ami_source_name}"
  instance_type   = "${var.instance_type}"
  region          = "${var.aws_ami_region}"
  ami_description = "Assignment 5 AMI"
  ssh_username    = "${var.ssh_username}"
  subnet_id       = "${var.subnet_id}"
  ami_users        = ['250820048302']
  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }
}

build {
  name = "learn-packer"
  sources = [
    "source.amazon-ebs.debian-aws-ami"
  ]

  provisioner "file" {
    source      = "${var.path}"
    destination = "/home/admin/webapp.zip"
  }
  provisioner "shell" {
    script = "./db.sh"
  }
}
