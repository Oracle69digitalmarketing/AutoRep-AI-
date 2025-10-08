Architecture overview
- Frontend: Next.js PWA (calls backend /reports, displays AI summaries, and includes an "Agents Map" page as a placeholder for Open Mobile Hub Maps SDK integration)
- Backend: NestJS with modules: auth, reports, tasks, messaging
- AI: Vertex AI (text-generation + embeddings). ReportsService handles model vs endpoint modes.
- Cache & Queue: Redis used for prompt/result cache and 'vertex:queue' for batching
- Similarity: Pinecone index for lead similarity + scoring
- Persistence: SQLite (quick), upgradeable to Postgres
