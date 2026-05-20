/** Base path for GitHub Pages (e.g. /decore-ai). Empty on Vercel/local. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path: string) {
  if (!path.startsWith('/')) return `${basePath}/${path}`;
  return `${basePath}${path}`;
}
