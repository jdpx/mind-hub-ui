// *********
// GitHub
// *********

variable "repository_owner" {
  type        = string
  description = "GitHub organisation name"
  default     = "jdpx"
}

variable "repository_name" {
  type        = string
  description = "GitHub repository name"
}

variable "github_token" {
  type        = string
  description = "Github access token"
}