import { addMessages, init, locale } from 'svelte-i18n';
import { browser } from '$app/environment';
import en from '$lib/translations/en.json';
import { defaultLocale, isSupportedLocale, supportedLocales } from '$lib/locales';
import ru from '$lib/translations/ru.json';

const fallbackLocale = defaultLocale;

addMessages('en', en);
addMessages('ru', ru);

const getInitialLocale = () => {
	if (!browser) {
		return fallbackLocale;
	}

	const stored = localStorage.getItem('locale');
	if (isSupportedLocale(stored)) {
		return stored;
	}

	const navigatorLocale = navigator.language?.split('-')[0];
	if (isSupportedLocale(navigatorLocale)) {
		return navigatorLocale;
	}

	return fallbackLocale;
};

init({
	fallbackLocale,
	initialLocale: getInitialLocale()
});

export const setLocale = (nextLocale: string) => {
	if (!isSupportedLocale(nextLocale)) {
		return;
	}

	locale.set(nextLocale);
	if (browser) {
		localStorage.setItem('locale', nextLocale);
	}
};

export { fallbackLocale };
