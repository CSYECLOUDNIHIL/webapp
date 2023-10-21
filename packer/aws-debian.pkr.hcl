packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "ami_termination_flag" {
  type      = bool
  default   = "true"
  sensitive = true
}

variable "ami_device_name" {
  type      = string
  default   = "test"
  sensitive = true
}

variable "ami_volume_size" {
  type      = number
  default   = 8
  sensitive = true
}

variable "ami_volume_type" {
  type      = string
  default   = "gp2"
  sensitive = true
}




variable "aws_ami_region" {
  type      = string
  default   = "test"
  sensitive = true
}


variable "aws_ami_owner_dev" {
  type      = string
  default   = "test"
  sensitive = true
}

variable "aws_ami_owner_demo" {
  type      = string
  default   = "test"
  sensitive = true
}


variable "source_name" {
  type      = string
  default   = "test"
  sensitive = true
}

variable "path" {
  type      = string
  default   = ""
  sensitive = true
}


variable "ami_source_name" {
  type      = string
  default   = "ami-test"
  sensitive = true
}


variable "aws_access_key" {
  type      = string
  default   = "test"
  sensitive = true
}

variable "aws_secret_key" {
  type      = string
  default   = "test"
  sensitive = true
}


variable "instance_type" {
  type      = string
  default   = "t2.micro"
  sensitive = true
}



variable "zip_file_path" {
  type      = string
  default   = "test"
  sensitive = true
}

variable "ssh_username" {
  type      = string
  default   = "admin"
  sensitive = true
}

variable "subnet_id" {
  type      = string
  default   = ""
  sensitive = true
}

variable "ami_name" {
  type      = string
  default   = "csye_"
  sensitive = true
}





source "amazon-ebs" "debian-aws-ami" {
  ami_name        = "${var.ami_name}${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  source_ami      = "${var.ami_source_name}"
  instance_type   = "${var.instance_type}"
  region          = "${var.aws_ami_region}"
  ami_description = "Assignment 5 AMI"
  ssh_username    = "${var.ssh_username}"
  subnet_id       = "${var.subnet_id}"
  ami_users       = ["${var.aws_ami_owner_dev}", "${var.aws_ami_owner_demo}"]
  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  launch_block_device_mappings {
    delete_on_termination = "${var.ami_termination_flag}"
    device_name           = "${var.ami_device_name}"
    volume_size           = "${var.ami_volume_size}"
    volume_type           = "${var.ami_volume_type}"
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

  provisioner "shell" {
    script = "./app.sh"
  }
}
