# AutoRep AI 2.1 – AWS-First Documentation
Tagline: Adaptive AI Sales Closer for Emerging Markets, Fully Powered by AWS

## I. Executive Summary
AutoRep AI 2.1 transforms the sales automation landscape for informal agents (insurance, real estate, microfinance) with a fully AWS-powered backend and AI stack:
- **AI Personas:** Adaptive to local languages (Pidgin, Yoruba, Hausa) and industries via AWS Bedrock + SageMaker
- **Omnichannel CRM:** WhatsApp, SMS, USSD through AWS Pinpoint, fully offline-capable
- **Offline-First PWA:** Queues messages offline using S3 + SQS
- **Commission & Referral Tracking:** DynamoDB stores and calculates incentives
- **Cost-Efficient AI:** Redis caching via ElastiCache, fallback TinyLLAMA on SageMaker

**New Advantages vs 2.0:**
- Eliminated external dependencies (OpenAI, PostgreSQL, Redis local)
- Fully serverless-ready backend via API Gateway + Lambda
- Optimized AI costs with cached prompts and local LLM fallback

## II. Competitive Edge
| Feature | AutoRep AI | HubSpot | Chatfuel | Karix |
|---|---|---|---|---|
| Local Languages | ✅ | ❌ | ❌ | ❌ |
| Industry Personas | ✅ | ❌ | ❌ | ❌ |
| Commission Tracking | ✅ | ❌ | ❌ | ❌ |
| Airtime Rewards | ✅ | ❌ | ❌ | ❌ |
| WhatsApp + SMS + USSD | ✅ | ❌ | ✅ | ✅ |
| AWS Native | ✅ | ❌ | ❌ | ❌ |

**Key Differentiation:** AWS-first architecture allows high reliability in low-connectivity regions, with lower operational costs and higher scalability.

## III. AWS Architecture
Core AWS Services
- **Frontend:** S3 + CloudFront (PWA), Workbox caching
- **Backend:** NestJS on Lambda / EC2, API Gateway endpoints
- **AI:** AWS Bedrock (GPT-style), SageMaker (TinyLLAMA fallback)
- **Database:** DynamoDB (CRM, lead, commission)
- **Queue:** SQS for offline messages
- **Cache:** ElastiCache Redis for frequent AI prompts & session sync
- **Messaging:** AWS Pinpoint for WhatsApp, SMS, USSD
- **Authentication:** Cognito User Pools

## IV. Frontend Architecture
- **Tech Stack:** Next.js + PWA + WebSockets + i18next + @dnd-kit
- **State Management:** Zustand (CRM data) + React Query (API calls)

## V. Backend Architecture
- **Tech Stack:** Node.js + NestJS
- **Modules:** `ai`, `messaging`, `crm`, `funnels`, `auth`, `commissions`
- **Design Patterns:** CQRS, Circuit Breaker, Cache-Aside

### Commissions
The backend provides endpoints for managing commissions:
- `POST /commissions/sales`: Record a new sale for an agent.
- `GET /commissions/agents/:agentId`: Get all commissions for a specific agent.

### Authentication
The backend uses AWS Cognito for user authentication. The following endpoints are available:
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in a user and receive a JWT.
- `GET /auth/profile`: Get the profile of the currently logged-in user (requires JWT).

## VI. AI/ML Layer
| Component | AWS Service | Function |
|---|---|---|
| NLP Responses | Bedrock | Multilingual AI persona responses |
| Fallback LLM | SageMaker TinyLLAMA | Offline/local queries |
| Lead Scoring | Custom Prompts + DynamoDB | Vector scoring & priority ranking |
| Voice Response | Bedrock/ElevenLabs | Optional voice accents |
| Translation | i18next + S3 | Real-time UI translation |

## VII. Developer Setup
### Frontend:
```
cd frontend
npm install
npm run dev
```

### Backend:
```
cd backend
npm install
npm run start:dev
```

## VIII. Deployment
### Backend (Serverless)
To deploy the backend to AWS Lambda, use the Serverless Framework:
```
cd backend
npm run deploy
```

### Frontend (S3/CloudFront)
To deploy the frontend to S3 and CloudFront:
1.  Make sure the `S3_BUCKET_NAME` environment variable is set.
2.  Run the deployment script:
```
cd frontend
./deploy.sh
```
3.  Manually create a CloudFront distribution and point it to the S3 bucket.

### AWS Env Variables:
```
AWS_REGION=us-east-1
WHATSAPP_PINPOINT_API_KEY=your_key
USSD_API_KEY=your_key
AWS_BEDROCK_MODEL=your_model_name
SAGEMAKER_ENDPOINT=your_endpoint
S3_BUCKET_NAME=autorep-static-assets
DYNAMODB_TABLE=AutoRep-CRM
ELASTICACHE_REDIS_ENDPOINT=your_endpoint
COGNITO_USER_POOL_ID=your_userpool_id
COGNITO_CLIENT_ID=your_client_id
```

## VIII. Monetization
| Plan | Monthly Price | Key Features |
|---|---|---|
| Freemium | Free | 1 funnel, 50 leads, WhatsApp-only |
| Pro | ¥10,000 (~$6.70) | Unlimited leads, SMS/Email, full CRM |
| Pay-Per-Lead | ¥50/lead | Airtime bonus incentives |
| Agency | ¥50,000 | Team management + white-label reports |

## IX. Roadmap
- **Q3 2025 (MVP):** WhatsApp CRM + Offline PWA, Role detection beta with Pidgin/Yoruba support
- **Q4 2025 (Beta):** SMS/USSD fallback channels, Airtime rewards integration, Redis caching to reduce Bedrock calls
- **Q1 2026 (Scale):** Local LLMs (TinyLLAMA) handle 50% of queries, Partner with Nigerian real estate associations, Regulatory audits (NDPR/GDPR)

## X. Contact
- **CEO:** Adewumi Adewale – adewaleadewumi@oracle69.com
- **Slack:** #autorep-dev for API keys and collaboration