export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (!basePath) return path;
  if (path.startsWith(`${basePath}/`) || path === basePath) return path;
  return `${basePath}${path}`;
}
