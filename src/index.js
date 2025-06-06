import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    event.respondWith(new Response('Internal Error', { status: 500 }));
  }
});

async function handleEvent(event) {
  const url = new URL(event.request.url);
  let options = {};

  try {
    // Attempt to serve the asset directly from KV
    return await getAssetFromKV(event, options);
  } catch (e) {
    // If the asset isn't found directly (e.g., for client-side routes like /docs/intro on refresh),
    // try serving the main single-page application entry point (index.html).
    // This allows Docusaurus's client-side router to take over.
    try {
      let notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: serveSinglePageApp,
      });
      // The `serveSinglePageApp` helper often returns a 404 status initially,
      // but if it successfully finds the index.html, we should change the status to 200.
      if (notFoundResponse.status === 404) {
         // If it's truly a 404 for the index.html, we handle it as a final fallback.
         throw new Error("No index.html found after SPA fallback attempt.");
      }
      return new Response(notFoundResponse.body, {
          status: 200, // Important: Change status to 200 for successful SPA serves
          headers: notFoundResponse.headers
      });
    } catch (e) {
      const pathname = url.pathname;
      // You can customize your 404 page here, e.g., redirect to /404.html
      // return new Response(`Page not found: ${pathname}`, {
      //   status: 404,
      //   headers: { 'Content-Type': 'text/plain' },
      // });
      // Or, fetch a custom 404.html if it exists in your Docusaurus build
      try {
        const custom404 = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${url.origin}/404.html`, req),
        });
        return new Response(custom404.body, {
          status: 404,
          headers: custom404.headers,
        });
      } catch (innerError) {
        // If 404.html also doesn't exist, return a generic 404
        return new Response(`Page not found: ${pathname}`, {
          status: 404,
          headers: { 'Content-Type': 'text/plain' },
        });
      }
    }
  }
}