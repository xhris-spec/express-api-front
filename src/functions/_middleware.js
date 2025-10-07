export const onRequest = async (ctx) => {
  const { request } = ctx;

  const url = new URL(request.url);
  console.log(`[Edge] ${request.method} ${url.pathname}`);

  const cid = crypto.randomUUID();
  request.headers.set("x-correlation-id", cid);

  const response = await ctx.next();

  response.headers.set("x-correlation-id", cid);

  return response;
};
