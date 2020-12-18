terraform {
  required_version = ">= 0.14.2"

  backend "s3" {
    bucket         = "mind-hub-ui-dev-tf-state"
    key            = "terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "mind-hub-ui-state-lock"
    role_arn       = "arn:aws:iam::500248363656:role/cd"
  }

  required_providers {
    aws =  "~> 3.21"
  }
}

provider "aws" {
  region                  = "eu-west-1"
}

// Provider used to access the ACM SSL Cert from us-east-1
# https://github.com/hashicorp/terraform/issues/21472#issuecomment-497508239
provider "aws" {
  alias                   = "us_east"
  region                  = "us-east-1"
}


module "mind-hub-ui" {
  source = "../../../modules/mind-hub-ui"

  env = "dev"

  providers = {
    aws = aws
    aws.us_east = aws.us_east
  }
}
