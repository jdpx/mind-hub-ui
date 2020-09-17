resource "aws_codebuild_project" "mind_hub_ui_pr_build" {
  name           = "mind-hub-ui-pr-build"
  badge_enabled  = false
  build_timeout  = 60
  queued_timeout = 480
  service_role   = aws_iam_role.mind_hub_ui_pr_build_role.arn

  artifacts {
    type = "NO_ARTIFACTS"
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
    type     = "GITHUB"
    location = data.github_repository.repository.http_clone_url

    buildspec = "ci/prs-buildspec.yml"

    auth {
      type     = "OAUTH"
      resource = var.github_token
    }
  }
}
