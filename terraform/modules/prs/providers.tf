data "github_repository" "repository" {
  full_name = "${var.repository_owner}/${var.repository_name}"
}

resource "aws_codebuild_webhook" "build_webhook" {
  project_name = aws_codebuild_project.mind_hub_ui_pr_build.name

  filter_group {
    filter {
      type    = "EVENT"
      pattern = "PULL_REQUEST_CREATED, PULL_REQUEST_UPDATED, PULL_REQUEST_REOPENED"
    }

    filter {
      type    = "HEAD_REF"
      pattern = "^refs/heads/.*"
    }
  }
}

resource "github_repository_webhook" "pipepline_github_webhook" {
  events     = ["push"]
  repository = data.github_repository.repository.name

  configuration {
    url          = aws_codebuild_webhook.build_webhook.payload_url
    secret       = aws_codebuild_webhook.build_webhook.secret
    content_type = "json"
    insecure_ssl = false
  }
}
