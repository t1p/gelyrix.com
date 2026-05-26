import { articles as fallbackArticles } from '$lib/content';
import {
	defaultLocale,
	getLocalizedPath,
	githubPagesBasePath,
	githubPagesOrigin,
	isGithubPagesDemo,
	siteOrigin,
	supportedLocales,
	type SupportedLocale
} from '$lib/locales';
import { readCmsArticles } from '$lib/server/adminStore';
import type { RequestHandler } from './$types';

export const prerender = true;

const sitemapOrigin = isGithubPagesDemo ? `${githubPagesOrigin}${githubPagesBasePath}` : siteOrigin;

const staticPaths = [
	'/',
	'/about',
	'/how-it-works',
	'/services',
	'/lab',
	'/blog',
	'/transparency',
	'/investors',
	'/faq',
	'/contacts',
	'/legal'
];

const escapeXml = (value: string) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');

const getArticlePaths = async () => {
	const cmsArticles = isGithubPagesDemo ? null : await readCmsArticles();
	const paths = new Set<string>();

	for (const locale of supportedLocales) {
		const localizedArticles =
			cmsArticles?.[locale] ?? fallbackArticles[locale as keyof typeof fallbackArticles] ?? fallbackArticles.en;
		for (const article of localizedArticles) {
			paths.add(`/blog/${article.slug}`);
		}
	}

	return [...paths];
};

const renderAlternateLinks = (path: string) =>
	((isGithubPagesDemo ? [defaultLocale] : supportedLocales) as readonly SupportedLocale[])
		.map((locale) => {
			const href = `${sitemapOrigin}${getLocalizedPath(path, locale)}`;
			return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(href)}" />`;
		})
		.join('\n');

const renderUrl = (path: string, locale: SupportedLocale) => {
	const loc = `${sitemapOrigin}${getLocalizedPath(path, locale)}`;
	const xDefault = `${sitemapOrigin}${getLocalizedPath(path, defaultLocale)}`;

	return `  <url>
    <loc>${escapeXml(loc)}</loc>
${renderAlternateLinks(path)}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefault)}" />
  </url>`;
};

export const GET: RequestHandler = async () => {
	const paths = [...staticPaths, ...(await getArticlePaths())];
	const urls = paths.flatMap((path) => supportedLocales.map((locale) => renderUrl(path, locale))).join('\n');

	return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
