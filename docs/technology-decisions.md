# Technology Decision Record

## Decision: Use Express.js with Node.js

- Why: Fast to develop, strong ecosystem, suitable for a small production API.
- Alternatives considered: Fastify
  - Rejected because Express has broader ecosystem familiarity and simpler middleware integration for this task.

## Decision: In-memory cache for initial release

- Why: Simple and low-latency for single-instance deployments.
- Alternatives considered: Redis
  - Rejected for the initial implementation because it adds operational complexity and is not required until multi-instance scaling.

## Decision: Structured JSON logging

- Why: Easy to ingest into observability backends and correlate requests.
- Alternatives considered: Plain text logs
  - Rejected because they are harder to search, aggregate, and analyze in production.
