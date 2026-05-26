import {
	defaultLocale,
	getLocalizedPath,
	getPathLocale,
	githubPagesBasePath,
	githubPagesOrigin,
	siteOrigin,
	stripBasePath,
	stripLocaleFromPath,
	supportedLocales,
	type SupportedLocale,
	isGithubPagesDemo
} from '$lib/locales';
import { readAdminContent, readCmsArticles } from '$lib/server/adminStore';

export const load = async ({ url }) => {
	const pathnameWithoutBase = isGithubPagesDemo ? stripBasePath(url.pathname, githubPagesBasePath) : url.pathname;
	const locale = getPathLocale(pathnameWithoutBase);
	const routePath = stripLocaleFromPath(pathnameWithoutBase);
	const origin = isGithubPagesDemo
		? githubPagesOrigin
		: url.hostname.includes('localhost')
			? url.origin
			: siteOrigin;
	const canonicalPath = `${isGithubPagesDemo ? githubPagesBasePath : ''}${getLocalizedPath(routePath, locale)}`;
	const canonicalUrl = new URL(canonicalPath, origin).toString();
	const alternateLocales: readonly SupportedLocale[] = isGithubPagesDemo ? [defaultLocale] : supportedLocales;
	const alternateLinks = alternateLocales.map((alternateLocale) => ({
		locale: alternateLocale,
		href: new URL(`${isGithubPagesDemo ? githubPagesBasePath : ''}${getLocalizedPath(routePath, alternateLocale)}`, origin).toString()
	}));

	if (isGithubPagesDemo) {
		return {
			locale,
			routePath,
			canonicalUrl,
			alternateLinks,
			xDefaultUrl: new URL(`${githubPagesBasePath}${getLocalizedPath(routePath, defaultLocale)}`, origin).toString()
		};
	}

	return {
		locale,
		routePath,
		canonicalUrl,
		alternateLinks,
		xDefaultUrl: new URL(getLocalizedPath(routePath, defaultLocale), origin).toString(),
		adminContent: await readAdminContent(),
		cmsArticles: await readCmsArticles()
	};
};
