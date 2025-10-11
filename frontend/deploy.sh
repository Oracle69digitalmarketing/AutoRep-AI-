#!/bin/bash

# This script builds the Next.js application and deploys it to an S3 bucket.
#
# Prerequisites:
# - AWS CLI installed and configured with the necessary permissions.
# - S3_BUCKET_NAME environment variable set to the name of your S3 bucket.

set -e

# Check if S3_BUCKET_NAME is set
if [ -z "$S3_BUCKET_NAME" ]; then
  echo "Error: S3_BUCKET_NAME environment variable is not set."
  exit 1
fi

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Deploy to S3
echo "Deploying to S3 bucket: $S3_BUCKET_NAME"
aws s3 sync ./out s3://$S3_BUCKET_NAME --delete

echo "Deployment complete."