terraform {
  backend "s3" {
    bucket         = "mind-hub-ui-tf-init-state"
    key            = "terraform.tfstate"
    region         = "eu-west-1"
  }
}

provider "aws" {
  version                 = "~> 2.0"
  region                  = "eu-west-1"
  shared_credentials_file = "~/.aws/credentials"
  profile                 = "mind-terraform"
}

resource "aws_s3_bucket" "state_bucket" {
  bucket = "mind-hub-ui-tf-state"

  # Tells AWS to keep a version history of the state file
  versioning {
    enabled = true
  }
}

# Build a DynamoDB to use for terraform state locking
resource "aws_dynamodb_table" "tf_lock_state" {
  name = "mind-hub-ui-state-lock"

  # Pay per request is cheaper for low-i/o applications, like our TF lock state
  billing_mode = "PAY_PER_REQUEST"

  # Hash key is required, and must be an attribute
  hash_key = "LockID"

  # Attribute LockID is required for TF to use this table for lock state
  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name      = "mind-hub-ui-state-lock"
  }
}
