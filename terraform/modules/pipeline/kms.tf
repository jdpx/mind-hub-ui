data "aws_kms_key" "by_alias" {
  key_id = "alias/codebuild-github-access-key"
}