export const supportedLocales = ['en', 'ru', 'es'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale = 'en' satisfies SupportedLocale;
export const siteOrigin = 'https://gelyrix.com';

const localeSet = new Set<string>(supportedLocales);

export const isSupportedLocale = (locale: string | null | undefined): locale is SupportedLocale => {
	return Boolean(locale && localeSet.has(locale));
};

export const normalizeLocale = (locale: string | null | undefined): SupportedLocale => {
	return isSupportedLocale(locale) ? locale : defaultLocale;
};

export const getPathLocale = (pathname: string): SupportedLocale => {
	const segment = pathname.split('/').filter(Boolean)[0];
	return isSupportedLocale(segment) ? segment : defaultLocale;
};

export const stripLocaleFromPath = (pathname: string): string => {
	const parts = pathname.split('/').filter(Boolean);

	if (parts.length && isSupportedLocale(parts[0])) {
		const stripped = `/${parts.slice(1).join('/')}`;
		return stripped === '/' ? '/' : stripped.replace(/\/$/, '') || '/';
	}

	return pathname === '' ? '/' : pathname;
};

export const getLocalizedPath = (pathname: string, locale: SupportedLocale, search = '', hash = '') => {
	const cleanPath = stripLocaleFromPath(pathname);
	const localizedPath = locale === defaultLocale ? cleanPath : `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
	return `${localizedPath}${search}${hash}`;
};

export const localizeHref = (href: string | undefined, locale: string | null | undefined): string => {
	if (!href) {
		return '#';
	}

	if (
		href.startsWith('#') ||
		href.startsWith('mailto:') ||
		href.startsWith('tel:') ||
		href.startsWith('http://') ||
		href.startsWith('https://')
	) {
		return href;
	}

	if (href.startsWith('/admin')) {
		return href;
	}

	const [pathWithSearch, hash = ''] = href.split('#');
	const [path, search = ''] = pathWithSearch.split('?');

	return getLocalizedPath(path || '/', normalizeLocale(locale), search ? `?${search}` : '', hash ? `#${hash}` : '');
};

export const getLocalizedUrl = (origin: string, pathname: string, locale: SupportedLocale) => {
	return new URL(getLocalizedPath(pathname, locale), origin).toString();
};
