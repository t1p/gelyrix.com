import { defaultLocale, getLocalizedPath, getPathLocale, siteOrigin, stripLocaleFromPath, supportedLocales } from '$lib/locales';
import { readAdminContent, readCmsArticles } from '$lib/server/adminStore';

export const load = async ({ url }) => {
	const locale = getPathLocale(url.pathname);
	const routePath = stripLocaleFromPath(url.pathname);
	const origin = url.hostname.includes('localhost') ? url.origin : siteOrigin;
	const canonicalUrl = new URL(getLocalizedPath(routePath, locale), origin).toString();
	const alternateLinks = supportedLocales.map((alternateLocale) => ({
		locale: alternateLocale,
		href: new URL(getLocalizedPath(routePath, alternateLocale), origin).toString()
	}));

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
