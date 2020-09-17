resource "aws_iam_role" "mind_hub_ui_pr_build_role" {
  name = "mind_hub_ui_pr_build-role"

  assume_role_policy = data.aws_iam_policy_document.mind_hub_ui_pr_build_role_policy.json
}

data "aws_iam_policy_document" "mind_hub_ui_pr_build_role_policy" {
  statement {
    actions = [
      "sts:AssumeRole",
    ]

    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["codebuild.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy" "mind_hub_ui_pr_build_policy" {
  name = "mind_hub_ui_pr_build_role-policy"
  role = aws_iam_role.mind_hub_ui_pr_build_role.id

  policy = data.aws_iam_policy_document.mind_hub_ui_pr_build_iam_role_policy.json
}

data "aws_iam_policy_document" "mind_hub_ui_pr_build_iam_role_policy" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    effect = "Allow"

    resources = [
      "*",
    ]
  }
}