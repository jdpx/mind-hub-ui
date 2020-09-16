terraform {
  backend "s3" {
    bucket         = "mind-hub-ui-management-tf-state"
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


provider "github" {
  version = "2.4.0"
  token        = var.github_token
  individual = false
  organization = "jdpx"
}

module "mind-hub-ui" {
  source = "../../../modules/pipeline"

  env                 = "management"
  buildspec_file_path = "ci/buildspec.yml"
  repository_owner    = "jdpx"
  repository_name     = "mind-hub-ui"
  github_token        = var.github_token
}
