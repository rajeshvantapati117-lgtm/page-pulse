# Observability and Rollback Plan

## Monitoring

- Track request rate, latency, error rate, and cache hit rate.
- Alert on elevated 4xx/5xx rates, p95 latency above threshold, and concurrency limit saturation.
- Capture structured logs with request IDs for correlation.

## Rollback

- Deploy behind a load balancer with versioned instances.
- Keep the previous image or build artifact available.
- Roll back by switching traffic to the prior stable version when alerts fire.
