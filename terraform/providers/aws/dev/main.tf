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


module "mind-hub-ui" {
  source = "../../../modules/mind-hub-ui"

  env                 = "dev"
}
