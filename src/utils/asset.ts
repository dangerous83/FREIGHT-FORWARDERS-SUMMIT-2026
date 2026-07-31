/**
 * Resolve a public asset path against the app's base URL so images load
 * correctly whether the site is deployed at a domain root (Vercel/Netlify)
 * or under a sub-path (e.g. GitHub Pages `/repo/`).
 *
 * Data files keep clean logical paths like `/logo/ils-logo-white.png`;
 * components pass them through `asset()` when rendering.
 */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
