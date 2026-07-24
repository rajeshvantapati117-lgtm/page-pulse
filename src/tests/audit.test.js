const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app');

function startServer() {
  const server = app.listen(0);
  return server;
}

test('GET /healthz returns ok', async () => {
  const server = startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/healthz`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.status, 'ok');
  } finally {
    server.close();
  }
});

test('POST /api/audit validates the URL input', async () => {
  const server = startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/audit`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url: 'not-a-url' }),
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.error.code, 'INVALID_INPUT');
  } finally {
    server.close();
  }
});

test('POST /api/audit returns structured success response', async () => {
  const server = startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/audit`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.com' }),
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.data.url, 'https://example.com');
  } finally {
    server.close();
  }
});
