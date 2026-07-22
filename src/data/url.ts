// Prefix site-internal paths with the configured base (needed while the repo
// deploys to harshakvs.github.io/my-portfolio; becomes a no-op on a root domain).
export const url = (path: string) =>
  import.meta.env.BASE_URL.replace(/\/$/, '') + path;
