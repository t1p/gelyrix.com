// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			isAdmin: boolean;
		}
		interface PageData {
			locale?: import('$lib/locales').SupportedLocale;
			routePath?: string;
			canonicalUrl?: string;
			alternateLinks?: Array<{
				locale: import('$lib/locales').SupportedLocale;
				href: string;
			}>;
			xDefaultUrl?: string;
			adminContent?: import('$lib/adminContent').AdminContent;
			cmsArticles?: Record<import('$lib/locales').SupportedLocale, import('$lib/content').Article[]>;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
