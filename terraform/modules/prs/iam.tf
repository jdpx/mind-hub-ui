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

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    },
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "acm:List*",
        "acm:Describe*"
      ]
    },
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "cloudfront:Get*",
        "cloudfront:List*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:Describe*",
        "dynamodb:List*"
      ],
      "Resource": "${data.aws_dynamodb_table.tf_lock_state.arn}"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ssm:Get*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:Get*",
        "iam:List*",
        "iam:PassRole"
      ],
      "Resource": "*"
    },
    {
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:BatchGetProjects",
        "codebuild:List*"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "codepipeline:GetPipeline",
        "codepipeline:ListTagsForResource",
        "codepipeline:List*"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "${aws_iam_role.mind_hub_ui_pr_build_role.arn}"
    }
  ]
}
POLICY
}
