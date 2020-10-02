TERRAFORM_ACTION=plan
APP_ENV=dev
OPTS=

.PHONY: validate-terraform
validate-terraform:
	cd terraform/providers/aws/$(APP_ENV) && \
	terraform init && \
	terraform validate && \
	terraform $(TERRAFORM_ACTION) $(OPTS)

.PHONY: generate-scss-type-files
generate-scss-type-files:
	yarn tsm src