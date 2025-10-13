# Deploying the Frontend to AWS Amplify

This guide provides the steps to deploy your Next.js frontend application to AWS Amplify.

## Prerequisites

*   You need to have an AWS account.
*   Your project's code needs to be in a Git repository (GitHub, GitLab, Bitbucket, or AWS CodeCommit).

## Step 1: Connect Your Repository to AWS Amplify

1.  Go to the AWS Amplify console.
2.  Click on "New app" and then "Host web app".
3.  Choose your Git provider and authorize Amplify to access your repositories.
4.  Select the repository for your `AutoRep-AI-` project and the branch you want to deploy.

## Step 2: Configure Build Settings

Amplify will automatically detect that you have a Next.js application and will provide a default set of build settings. You should review these settings to make sure they are correct.

The build settings should look something like this:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

You will also need to add your environment variables in the "Environment variables" section.

## Step 3: Deploy

1.  Review your settings and click "Save and deploy".
2.  Amplify will then build and deploy your application.
3.  Once the deployment is complete, Amplify will provide you with a URL to access your running application.

## Continuous Deployment

By default, Amplify will set up a continuous deployment pipeline for you. This means that every time you push a change to your connected branch, Amplify will automatically rebuild and redeploy your application.
