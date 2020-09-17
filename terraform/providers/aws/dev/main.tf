terraform {
  backend "s3" {
    bucket         = "mind-hub-ui-dev-tf-state"
    key            = "terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "mind-hub-ui-state-lock"
  }
}

provider "aws" {
  version                 = "~> 2.0"
  region                  = "eu-west-1"
  shared_credentials_file = "~/.aws/credentials"
  profile                 = "mind-terraform"
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
