  resource "aws_iam_role" "mind_hub_ui_pipeline_role" {
  name = "mind_hub_ui_pipeline_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "mind_hub_ui_pipeline_policy" {
  name = "mind_hub_ui_pipeline_policy"
  role = aws_iam_role.mind_hub_ui_pipeline_role.id

  policy = <<EOF
{
  "Statement": [
    {
      "Action": [
        "iam:PassRole"
      ],
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
        "StringEqualsIfExists": {
          "iam:PassedToService": [
            "cloudformation.amazonaws.com",
            "elasticbeanstalk.amazonaws.com",
            "ec2.amazonaws.com",
            "ecs-tasks.amazonaws.com"
          ]
        }
      }
    },
    {
      "Action": [
        "codecommit:CancelUploadArchive",
        "codecommit:GetBranch",
        "codecommit:GetCommit",
        "codecommit:GetUploadArchiveStatus",
        "codecommit:UploadArchive"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "cloudwatch:*",
        "s3:*"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "lambda:InvokeFunction",
        "lambda:ListFunctions"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudformation:ValidateTemplate"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:DescribeImages"
      ],
      "Resource": "*"
    }
  ],
  "Version": "2012-10-17"
}
EOF
}

# Create an IAM role for CodeBuild to assume
resource "aws_iam_role" "mind_hub_ui_build_role" {
  name = "mind-hub-ui-build_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

# Create an IAM role for CodeBuild to assume
resource "aws_iam_role" "mind_hub_terraform_deploy_role" {
  name = "mind_hub_terraform_deploy_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

# Output the CodeBuild IAM role
output "mind_hub_ui_build_role_arn" {
  value = aws_iam_role.mind_hub_ui_build_role.arn
}


# Create an IAM role policy for CodeBuild to use implicitly
resource "aws_iam_role_policy" "mind_hub_ui_build_role_policy" {
  name = "mind_hub_ui_build_role_policy"
  role = aws_iam_role.mind_hub_ui_build_role.name

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
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "${aws_s3_bucket.mind_hub_ui_pipeline_artifact_bucket.arn}",
        "${aws_s3_bucket.mind_hub_ui_pipeline_artifact_bucket.arn}/*"
      ]
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
      "Action": "sts:AssumeRole",
      "Resource": "${aws_iam_role.mind_hub_ui_build_role.arn}"
    }
  ]
}
POLICY
}


# Create an IAM role policy for CodeBuild to use implicitly
resource "aws_iam_role_policy" "mind_hub_terraform_deploy_role_policy" {
  name = "mind_hub_terraform_deploy_role_policy"
  role = aws_iam_role.mind_hub_terraform_deploy_role.name

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
        "s3:*"
      ],
      "Resource": [
        "${aws_s3_bucket.mind_hub_ui_pipeline_artifact_bucket.arn}",
        "${aws_s3_bucket.mind_hub_ui_pipeline_artifact_bucket.arn}/*",
        "${data.aws_s3_bucket.dev_tf_state_bucket.arn}",
        "${data.aws_s3_bucket.dev_tf_state_bucket.arn}/*",
        "${data.aws_s3_bucket.mind_hub_ui_dev_bucket.arn}",
        "${data.aws_s3_bucket.mind_hub_ui_dev_bucket.arn}/*"
      ]
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
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "${aws_iam_role.mind_hub_terraform_deploy_role.arn}"
    }
  ]
}
POLICY
}
