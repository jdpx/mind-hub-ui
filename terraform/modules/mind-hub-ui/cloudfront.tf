# This is a _data source_ which allows us to get the internal
# ID (which AWS calls an "ARN") from AWS
data "aws_acm_certificate" "mind_jdpx_co_uk_cert" {
  provider = aws.us_east
  domain   = "${var.env}.mind.jdpx.co.uk"
  statuses = ["ISSUED"]
}

resource "aws_cloudfront_distribution" "mind_jdpx_co_uk-cf_distribution" {
  # This says where CloudFront should get the data it's caching
  origin {

    # CloudFront can front any website, so in our case, we use the website from
    # our S3 bucket.
    domain_name = aws_s3_bucket.mind_hub_ui_bucket.website_endpoint
    origin_id   = aws_s3_bucket.mind_hub_ui_bucket.bucket_domain_name

    # This allows requests for / to serve up /index.html which cloudfront won't do
    # There is a simpler configuration that doesn't require this, but it won't translate
    # a request for / to one for /index.html  This is what enables that to work
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["SSLv3", "TLSv1"]
    }
  }

  aliases             = ["${var.env}.mind.jdpx.co.uk", "www.${var.env}.mind.jdpx.co.uk"]
  default_root_object = "index.html"
  enabled             = "true"

  # You can override this per object, but for our purposes, this is fine for everything
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id   = aws_s3_bucket.mind_hub_ui_bucket.bucket_domain_name

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    # This says to redirect http to https
    viewer_protocol_policy = "redirect-to-https"
    compress               = "true"
    min_ttl                = 0

    # default cache time in seconds. This is 1 day, meaning CloudFront will only
    # look at your S3 bucket for changes once per day.
    default_ttl            = 86400
    max_ttl                = 604800
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # This configures our SSL certificate.
  viewer_certificate {
    # The data source we set up above allows us to access the AWS internal ID (ARN) like so
    acm_certificate_arn      = data.aws_acm_certificate.mind_jdpx_co_uk_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }
}