import { stripLocaleFromPath } from '$lib/locales';
import type { Reroute } from '@sveltejs/kit';

export const reroute: Reroute = ({ url }) => {
	const routePath = stripLocaleFromPath(url.pathname);
	return routePath === url.pathname ? undefined : routePath;
};

