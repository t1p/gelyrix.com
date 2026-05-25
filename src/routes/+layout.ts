const isGithubPagesDemo = import.meta.env.BUILD_TARGET === 'github-pages';

export const ssr = !isGithubPagesDemo;
export const csr = true;
export const prerender = isGithubPagesDemo;
