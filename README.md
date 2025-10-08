AutoRep AI — Hackathon deliverables (backend + frontend + docs)

Included:
- Full NestJS backend with Vertex AI integration (model or endpoint), Redis caching and queue worker, Pinecone scaffolding, Twilio webhook receiver.
- Minimal Next.js frontend demo (generate report and view agents on a map).
- "Agents Map" page that serves as a placeholder for Open Mobile Hub Maps SDK integration.
- Queue worker for batching prompts.
- Demo script and architecture doc.

Quick start:
- Copy backend/.env.example -> backend/.env and fill credentials (Google, Twilio, Redis, Pinecone)
- Start Redis locally (or use managed)
- Start backend: cd backend && npm install && npm run start:dev
- Optionally start queue worker: npm run queue:dev (in backend)
- Start frontend: cd frontend && npm install && NEXT_PUBLIC_BACKEND_URL=http://localhost:4000 npm run dev

Notes:
- The "Agents Map" page uses `react-leaflet` as a placeholder to demonstrate how the Open Mobile Hub Maps SDK would be integrated in a native mobile application.
- Vertex AI responses vary by model; check logs for response structure and adapt ReportsService extraction.
- Pinecone embedding requires embedding model & index; ReportsService.embedText implemented to call Vertex embedding model.
