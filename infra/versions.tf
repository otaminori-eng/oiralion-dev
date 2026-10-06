terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
  backend "s3" {
    bucket       = "oiralion-dev-tfstate-7f3a9c"
    key          = "infra/terraform.tfstate"
    region       = "ap-northeast-1"
    use_lockfile = true
    encrypt      = true
  }
}

provider "aws" {
  region = "ap-northeast-1"
  default_tags {
    tags = {
      Project   = "oiralion-dev"
      ManagedBy = "terraform"
    }
  }
}

# 証明書用
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  default_tags {
    tags = {
      Project   = "oiralion-dev"
      ManagedBy = "terraform"
    }
  }
}