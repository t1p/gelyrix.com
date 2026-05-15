import { adminRoutes, supportedLocales, type AdminContent, type AdminLocale } from '$lib/adminContent';
import type { Article } from '$lib/content';
import { clearAdminSession } from '$lib/server/adminAuth';
import {
	getCmsStorageMode,
	readAdminContent,
	readCmsArticles,
	writeAdminContent,
	writeCmsArticles
} from '$lib/server/adminStore';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const getString = (formData: FormData, key: string) => String(formData.get(key) ?? '').trim();

const parseArticleBody = (body: string) => {
	return body
		.split(/\n{2,}/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean);
};

const parseArticles = (formData: FormData, locale: AdminLocale) => {
	const count = Number(formData.get(`articles-${locale}-count`) ?? 0);
	const nextArticles: Article[] = [];

	for (let index = 0; index <= count; index += 1) {
		if (formData.get(`article-${locale}-${index}-delete`) === 'on') {
			continue;
		}

		const slug = getString(formData, `article-${locale}-${index}-slug`);
		const title = getString(formData, `article-${locale}-${index}-title`);

		if (!slug && !title) {
			continue;
		}

		nextArticles.push({
			slug,
			category: getString(formData, `article-${locale}-${index}-category`),
			title,
			description: getString(formData, `article-${locale}-${index}-description`),
			readTime: getString(formData, `article-${locale}-${index}-readTime`),
			body: parseArticleBody(getString(formData, `article-${locale}-${index}-body`))
		});
	}

	return nextArticles;
};

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.isAdmin) {
		throw redirect(303, '/admin/login');
	}

	return {
		adminContent: await readAdminContent(),
		cmsArticles: await readCmsArticles(),
		storageMode: getCmsStorageMode()
	};
};

export const actions: Actions = {
	saveSeo: async ({ request, locals }) => {
		if (!locals.isAdmin) {
			throw redirect(303, '/admin/login');
		}

		const formData = await request.formData();
		const current = await readAdminContent();
		const next: AdminContent = {
			...current,
			seo: adminRoutes.map((route, index) => {
				const entry = {
					path: route.path,
					label: route.label
				} as AdminContent['seo'][number];

				for (const locale of supportedLocales) {
					entry[locale] = {
						title: getString(formData, `seo-${index}-${locale}-title`),
						description: getString(formData, `seo-${index}-${locale}-description`),
						ogImage: getString(formData, `seo-${index}-${locale}-ogImage`)
					};
				}

				return entry;
			})
		};

		await writeAdminContent(next);
		return { message: 'SEO сохранено' };
	},
	saveBlocks: async ({ request, locals }) => {
		if (!locals.isAdmin) {
			throw redirect(303, '/admin/login');
		}

		const formData = await request.formData();
		const current = await readAdminContent();
		const announcement = {
			enabled: formData.get('announcement-enabled') === 'on'
		} as AdminContent['blocks']['announcement'];
		const homeCta = {} as AdminContent['blocks']['homeCta'];

		for (const locale of supportedLocales) {
			announcement[locale] = {
				title: getString(formData, `announcement-${locale}-title`),
				text: getString(formData, `announcement-${locale}-text`),
				buttonLabel: getString(formData, `announcement-${locale}-buttonLabel`),
				buttonHref: getString(formData, `announcement-${locale}-buttonHref`)
			};
			homeCta[locale] = {
				title: getString(formData, `homeCta-${locale}-title`),
				text: getString(formData, `homeCta-${locale}-text`),
				buttonLabel: getString(formData, `homeCta-${locale}-buttonLabel`),
				buttonHref: getString(formData, `homeCta-${locale}-buttonHref`)
			};
		}

		const next: AdminContent = {
			...current,
			blocks: {
				announcement,
				homeCta
			}
		};

		if (!next.blocks.announcement.en.title || !next.blocks.homeCta.en.title) {
			return fail(400, { message: 'Заполните обязательные заголовки блоков' });
		}

		await writeAdminContent(next);
		return { message: 'Блоки сохранены' };
	},
	saveArticles: async ({ request, locals }) => {
		if (!locals.isAdmin) {
			throw redirect(303, '/admin/login');
		}

		const formData = await request.formData();
		const nextArticles = supportedLocales.reduce(
			(localizedArticles, locale) => {
				localizedArticles[locale] = parseArticles(formData, locale);
				return localizedArticles;
			},
			{} as Record<AdminLocale, Article[]>
		);

		const allArticles = supportedLocales.flatMap((locale) => nextArticles[locale]);
		const invalidArticle = allArticles.find(
			(article) => !article.slug || !article.title || !article.description || !article.body.length
		);

		if (invalidArticle) {
			return fail(400, {
				message: 'У каждой статьи нужны slug, title, description и хотя бы один абзац body'
			});
		}

		await writeCmsArticles(nextArticles);
		return { message: 'Статьи сохранены' };
	},
	logout: async ({ cookies }) => {
		clearAdminSession(cookies);
		throw redirect(303, '/admin/login');
	}
};
