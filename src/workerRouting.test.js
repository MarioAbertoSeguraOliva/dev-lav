/**
 * @jest-environment node
 */
import worker, { isAssetRequest } from '../worker/index';

// Jest's Node environment (Jest 27 / CRA 5) does not expose the Fetch API
// globals that Node 18 provides. These minimal doubles are sufficient for the
// Worker's routing logic and keep the tests deterministic and offline.
class TestRequest {
  constructor(url, init = {}) {
    this.url = url;
    this.method = (init.method || 'GET').toUpperCase();
  }
}

class TestResponse {
  constructor(body = null, init = {}) {
    this.body = body;
    this.status = init.status || 200;
    this.headers = init.headers || {};
  }
}

beforeAll(() => {
  global.Request = TestRequest;
  global.Response = TestResponse;
});

const createEnv = () => ({
  ASSETS: {
    fetch: jest.fn(),
  },
});

describe('Cloudflare Worker routing', () => {
  test.each([
    '/images/projects/missing.png',
    '/images',
    '/static/js/missing.js',
    '/favicon.ico',
    '/manifest.json',
    '/robots.txt',
  ])('classifies %s as an asset request', (pathname) => {
    expect(isAssetRequest(pathname)).toBe(true);
  });

  test.each([
    '/',
    '/projects',
    '/about',
    '/contact',
    '/does-not-exist',
    '/projects/',
  ])('serves the SPA shell for %s', async (pathname) => {
    const env = createEnv();
    env.ASSETS.fetch.mockResolvedValue(
      new Response('<html></html>', {
        headers: { 'content-type': 'text/html' },
      })
    );

    const response = await worker.fetch(
      new Request(`https://example.com${pathname}`),
      env
    );

    expect(response.status).toBe(200);
    expect(env.ASSETS.fetch).toHaveBeenCalledWith(
      'https://example.com/index.html',
      { method: 'GET' }
    );
  });

  test.each([
    '/images/projects/missing.png',
    '/static/js/missing.js',
    '/missing.css',
  ])('returns 404 instead of index.html for missing asset %s', async (pathname) => {
    const env = createEnv();

    const response = await worker.fetch(
      new Request(`https://example.com${pathname}`),
      env
    );

    expect(response.status).toBe(404);
    expect(env.ASSETS.fetch).not.toHaveBeenCalled();
  });

  test('rejects non-GET/HEAD requests to application routes', async () => {
    const env = createEnv();

    const response = await worker.fetch(
      new Request('https://example.com/projects', { method: 'POST' }),
      env
    );

    expect(response.status).toBe(405);
    expect(env.ASSETS.fetch).not.toHaveBeenCalled();
  });
});
