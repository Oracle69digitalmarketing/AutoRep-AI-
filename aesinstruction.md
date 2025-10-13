# Deploying the Backend to AWS App Runner

This guide provides the steps to build the Docker image for the backend and deploy it to AWS App Runner.

## Prerequisites

*   You need to have Docker installed and running on your machine.
*   You need to have the AWS CLI installed and configured with your AWS credentials.

## Step 1: Build the Docker Image

Open a terminal in the `backend` directory of your project and run the following command to build the Docker image. Replace `your-image-name` with a name for your image.

```bash
docker build -t your-image-name .
```

## Step 2: Push the Image to Amazon ECR

1.  Create a new repository in Amazon ECR. You can do this from the AWS console or using the AWS CLI.
2.  Authenticate Docker to your ECR registry.
3.  Tag your image with the ECR repository URI.
4.  Push the image to ECR.

The AWS console provides a convenient set of commands for these steps when you create a new repository.

## Step 3: Deploy to AWS App Runner

1.  Go to the AWS App Runner console and create a new service.
2.  Choose "Container registry" as the source and provide the ECR image URI from the previous step.
3.  Configure the service settings, such as the port (it should be the same as the one your application listens on, which is 4000 by default) and any environment variables your application needs.
4.  Create the service.

App Runner will then pull the image from ECR and deploy your application. It will provide you with a URL to access your running application.
