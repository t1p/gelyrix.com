import { getPathLocale } from '$lib/locales';
import { isAdminSessionValid } from '$lib/server/adminAuth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.isAdmin = isAdminSessionValid(event.cookies);
	const pageLocale = getPathLocale(event.url.pathname);

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<html lang="ru">', `<html lang="${pageLocale}">`)
	});
};
