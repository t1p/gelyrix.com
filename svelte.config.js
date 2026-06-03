import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isGithubPagesDemo = process.env.BUILD_TARGET === 'github-pages';
const githubPagesBasePath = '/gelyrix.com';

const staticEntries = [
	'/',
	'/about',
	'/services',
	'/how-it-works',
	'/lab',
	'/blog',
	'/transparency',
	'/investors',
	'/faq',
	'/contacts',
	'/legal',
	'/sitemap.xml'
];

const localeEntries = isGithubPagesDemo
	? staticEntries
			.filter((entry) => entry !== '/sitemap.xml')
			.map((entry) => (entry === '/' ? '/ru' : `/ru${entry}`))
	: ['ru', 'es'].flatMap((locale) =>
			staticEntries
				.filter((entry) => entry !== '/sitemap.xml')
				.map((entry) => (entry === '/' ? `/${locale}` : `/${locale}${entry}`))
	  );

const articleSlugs = [
	'what-is-cryonics',
	'vitrification-facts',
	'functional-reversibility',
	'neurosafekeeping',
	'storage-network'
];
const blogEntries = isGithubPagesDemo
	? articleSlugs.flatMap((slug) => [`/blog/${slug}`, `/ru/blog/${slug}`])
	: articleSlugs.flatMap((slug) => [`/blog/${slug}`, `/ru/blog/${slug}`, `/es/blog/${slug}`]);

const prerenderEntries = Array.from(new Set([...staticEntries, ...localeEntries, ...blogEntries]));

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
			entries: prerenderEntries
		}
	}
};

export default config;
