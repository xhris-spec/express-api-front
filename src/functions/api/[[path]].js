export const onRequest = async ({ request }) => {
  const url = new URL(request.url);
  const target =
    "https://chriscarrasc-express-api.hf.space" + url.pathname + url.search;

  console.log(`[Proxy] → ${target}`);

  const init = {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? await request.text()
        : undefined,
  };

  const response = await fetch(target, init);

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
};
