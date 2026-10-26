const ASSET_ROOTS = ['/static', '/images'];
const FILE_EXTENSION = /\.[a-z0-9]+$/i;

// Cloudflare serves an existing static asset before invoking this Worker.
// Therefore, an asset-shaped request that reaches this code is a missing asset
// and must keep a 404 response instead of falling back to index.html.
export const isAssetRequest = (pathname) =>
  ASSET_ROOTS.some(
    (root) => pathname === root || pathname.startsWith(`${root}/`)
  ) || FILE_EXTENSION.test(pathname);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (isAssetRequest(url.pathname)) {
      return new Response('Not found', {
        status: 404,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { allow: 'GET, HEAD' },
      });
    }

    // Serve the React shell for client-side routes such as /projects and
    // /does-not-exist. React Router renders the application 404 view.
    const indexUrl = new URL('/index.html', url);
    return env.ASSETS.fetch(indexUrl.toString(), { method: request.method });
  },
};
