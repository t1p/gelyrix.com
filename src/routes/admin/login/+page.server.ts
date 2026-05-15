import { adminConfigured, createAdminSession, validateAdminCredentials } from '$lib/server/adminAuth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.isAdmin) {
		throw redirect(303, '/admin');
	}

	return {
		configured: adminConfigured()
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const login = String(formData.get('login') ?? '');
		const password = String(formData.get('password') ?? '');

		if (!adminConfigured()) {
			return fail(500, {
				message: 'ADMIN_LOGIN и ADMIN_PASSWORD не настроены в .env'
			});
		}

		if (!validateAdminCredentials(login, password)) {
			return fail(401, {
				message: 'Неверный логин или пароль'
			});
		}

		createAdminSession(cookies, login);
		throw redirect(303, '/admin');
	}
};
