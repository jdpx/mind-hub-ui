# Build S3 bucket for CodePipeline artifact storage
resource "aws_s3_bucket" "mind_hub_ui_pipeline_artifact_bucket" {
  bucket = "mind-hub-ui-artifacts"
  acl    = "private"
}

data "aws_s3_bucket" "mind_hub_ui_dev_bucket" {
  bucket = "mind-hub-ui-dev"
}