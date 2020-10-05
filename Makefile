TERRAFORM_ACTION=plan
APP_ENV=dev
OPTS=

AWS := aws
CLOUDFRONT_ID := E3KBE5CU8L78E4

.PHONY: validate-terraform
validate-terraform:
	cd terraform/providers/aws/$(APP_ENV) && \
	terraform init && \
	terraform validate && \
	terraform $(TERRAFORM_ACTION) $(OPTS)

.PHONY: generate-scss-type-files
generate-scss-type-files:
	yarn tsm src

.PHONY: aws-cloudfront-invalidate-all
aws-cloudfront-invalidate-all:
	$(AWS) cloudfront create-invalidation --distribution-id $(CLOUDFRONT_ID) --paths "/*"