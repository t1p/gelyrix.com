import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { adminConfigured, createAdminSession, validateAdminCredentials } from '$lib/server/adminAuth';

const isGithubPagesDemo = process.env.BUILD_TARGET === 'github-pages';

const ensureStaticBuildIsBlocked = () => {
	if (isGithubPagesDemo) {
		throw redirect(302, '/');
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	ensureStaticBuildIsBlocked();
	if (locals.isAdmin) {
		throw redirect(303, '/admin');
	}

	return {
		configured: adminConfigured()
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		ensureStaticBuildIsBlocked();
		if (!adminConfigured()) {
			return fail(500, {
				error: 'Админ-доступ не настроен. Установите ADMIN_LOGIN, ADMIN_PASSWORD и ADMIN_SESSION_SECRET.'
			});
		}

		const formData = await request.formData();
		const login = String(formData.get('login') ?? '').trim();
		const password = String(formData.get('password') ?? '').trim();

		if (!validateAdminCredentials(login, password)) {
			return fail(401, { error: 'Неверный пароль.' });
		}

		createAdminSession(cookies, login);
		throw redirect(303, '/admin');
	}
};
