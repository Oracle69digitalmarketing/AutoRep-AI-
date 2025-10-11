# AWS Architecture
graph TD
  A[Frontend: Next.js PWA] -->|API Calls| B[Backend: NestJS on Lambda/EC2]
  B -->|Queue| C[SQS Offline Messages]
  B --> D[DynamoDB CRM & Commission Tracking]
  B --> E[ElastiCache Redis: Cache AI Responses]
  B --> F[AWS Bedrock: GPT-style AI Personas]
  F --> G[SageMaker TinyLLAMA: Fallback Local LLM]
  B --> H[AWS Pinpoint: WhatsApp/SMS/USSD Messaging]
  A -->|Static Assets| I[S3 + CloudFront]

## Core AWS Services
- **Frontend:** S3 + CloudFront (PWA), Workbox caching
- **Backend:** NestJS on Lambda / EC2, API Gateway endpoints
- **AI:** AWS Bedrock (GPT-style), SageMaker (TinyLLAMA fallback)
- **Database:** DynamoDB (CRM, lead, commission)
- **Queue:** SQS for offline messages
- **Cache:** ElastiCache Redis for frequent AI prompts & session sync
- **Messaging:** AWS Pinpoint for WhatsApp, SMS, USSD
- **Authentication:** Cognito User Pools