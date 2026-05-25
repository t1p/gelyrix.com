import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getCmsStorageMode, readAdminContent, readCmsArticles, writeAdminContent, writeCmsArticles } from '$lib/server/adminStore';

const requireAdmin = (isAdmin: boolean) => {
	if (!isAdmin) {
		throw redirect(303, '/admin/login');
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	requireAdmin(locals.isAdmin);

	return {
		adminContent: await readAdminContent(),
		cmsArticles: await readCmsArticles(),
		storageMode: getCmsStorageMode()
	};
};

export const actions: Actions = {
	saveContent: async ({ request, locals }) => {
		requireAdmin(locals.isAdmin);
		const formData = await request.formData();
		const locale = String(formData.get('locale') ?? 'ru');
		const path = String(formData.get('path') ?? '/');
		const title = String(formData.get('title') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();
		const ogImage = String(formData.get('ogImage') ?? '').trim();

		if (!title || !description) {
			return fail(400, { error: 'Заполните title и description.' });
		}

		const content = await readAdminContent();
		const nextSeo = content.seo.map((entry) => {
			if (entry.path !== path) return entry;
			return {
				...entry,
				[locale]: { title, description, ogImage }
			};
		});

		await writeAdminContent({ ...content, seo: nextSeo });
		return { success: true, message: 'SEO обновлено.' };
	},
	saveArticles: async ({ request, locals }) => {
		requireAdmin(locals.isAdmin);
		const formData = await request.formData();
		const locale = String(formData.get('locale') ?? 'ru');
		const payload = String(formData.get('payload') ?? '[]');

		try {
			const parsed = JSON.parse(payload);
			if (!Array.isArray(parsed)) {
				return fail(400, { error: 'Ожидается JSON-массив статей.' });
			}

			const current = await readCmsArticles();
			await writeCmsArticles({ ...current, [locale]: parsed });
			return { success: true, message: 'Статьи обновлены.' };
		} catch {
			return fail(400, { error: 'Некорректный JSON.' });
		}
	}
};
