resource "aws_codebuild_project" "mind_hub_ui_build" {
  name           = "mind-hub-ui-build"
  badge_enabled  = false
  build_timeout  = 60
  queued_timeout = 480
  service_role   = aws_iam_role.mind_hub_ui_build_role.arn
  tags = {
    Environment = var.env
  }

  artifacts {
    encryption_disabled    = false
    name                   = "mind_hub_ui_build-${var.env}"
    override_artifact_name = false
    packaging              = "NONE"
    type                   = "CODEPIPELINE"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/amazonlinux2-x86_64-standard:2.0"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = false
    type                        = "LINUX_CONTAINER"
  }

  logs_config {
    cloudwatch_logs {
      status = "ENABLED"
    }

    s3_logs {
      encryption_disabled = false
      status              = "DISABLED"
    }
  }

  source {
    type                = "CODEPIPELINE"
    buildspec = "ci/buildspec.yml"
    # buildspec_file_path = var.buildspec_file_path
    git_clone_depth     = 0
    insecure_ssl        = false
    report_build_status = false
  }
}