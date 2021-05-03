terraform {
  required_version = ">= 0.14.2"

  backend "s3" {
    bucket         = "mind-hub-ui-management-tf-state"
    key            = "terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "mind-hub-ui-state-lock"
    role_arn       = "arn:aws:iam::500248363656:role/cd"
  }

  required_providers {
    aws    = "~> 3.21"
    github = "~> 4.1.0"
  }
}

provider "aws" {
  region = "eu-west-1"
}

provider "github" {
  token        = var.github_token
  organization = "jdpx"
}

module "mind-hub-ui-pipeline" {
  source = "../../../modules/pipeline"

  env                        = "management"
  repository_owner           = "jdpx"
  repository_name            = "mind-hub-ui"
  github_token               = var.github_token
  cloudfront_distribution_id = "E3094VZ16EA02E"
}
