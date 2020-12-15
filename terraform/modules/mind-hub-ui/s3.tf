resource "aws_s3_bucket" "mind_hub_ui_bucket" {
  bucket = "${var.env}.mind.jdpx.co.uk"
  acl    = "public-read"
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
  force_destroy = true

  policy = <<EOF
{
  "Version":"2012-10-17",
  "Statement":[{
        "Sid":"PublicReadForGetBucketObjects",
        "Effect":"Allow",
          "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::${var.env}.mind.jdpx.co.uk/*"]
    }
  ]
}
EOF
}
