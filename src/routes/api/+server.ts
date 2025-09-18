import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
  return new Response(null, { status: 204 });
};

export const HEAD: RequestHandler = () => {
  return new Response(null, { status: 204 });
};