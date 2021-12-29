import { getPublishedPosts } from './_blogs';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const body = await getPublishedPosts();
  return { body };
};