# Failure Mode Analysis

## 1. External dependency latency or outages

- Risk: Upstream sites are slow or unavailable.
- Mitigation: Request timeouts, retries with backoff, and clear error responses.

## 2. Traffic spikes causing overload

- Risk: Burst traffic overwhelms the service or downstream fetches.
- Mitigation: Concurrency limits, rate limiting, and autoscaling behind a load balancer.

## 3. Cache stampede or stale data

- Risk: Many clients request the same uncached URL at once.
- Mitigation: Single-flight semantics or a short TTL and cache warming strategy.
