import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isGithubPagesDemo = process.env.BUILD_TARGET === 'github-pages';
const githubPagesBasePath = '/gelyrix.com';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: isGithubPagesDemo
			? adapterStatic({
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				strict: true
			})
			: adapterNode({
				out: 'build'
			}),
		paths: {
			base: isGithubPagesDemo ? githubPagesBasePath : ''
		},
		prerender: {
			handleHttpError: 'warn',
			handleUnseenRoutes: 'warn',
			entries: ['/', '/about', '/services', '/how-it-works', '/faq', '/contacts', '/sitemap.xml']
		}
	}
};

export default config;
