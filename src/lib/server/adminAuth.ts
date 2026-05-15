import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

const cookieName = 'gelyrix_admin';
const maxAge = 60 * 60 * 8;

const getSecret = () => env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD || '';

const sign = (payload: string) => {
	return createHmac('sha256', getSecret()).update(payload).digest('base64url');
};

const safeEqual = (left: string, right: string) => {
	const leftBuffer = Buffer.from(left);
	const rightBuffer = Buffer.from(right);
	if (leftBuffer.length !== rightBuffer.length) {
		return false;
	}

	return timingSafeEqual(leftBuffer, rightBuffer);
};

export const adminConfigured = () => Boolean(env.ADMIN_LOGIN && env.ADMIN_PASSWORD && getSecret());

export const validateAdminCredentials = (login: string, password: string) => {
	if (!adminConfigured()) {
		return false;
	}

	return safeEqual(login, env.ADMIN_LOGIN ?? '') && safeEqual(password, env.ADMIN_PASSWORD ?? '');
};

export const createAdminSession = (cookies: Cookies, login: string) => {
	const payload = Buffer.from(
		JSON.stringify({
			login,
			exp: Date.now() + maxAge * 1000
		})
	).toString('base64url');

	cookies.set(cookieName, `${payload}.${sign(payload)}`, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: env.NODE_ENV === 'production',
		maxAge
	});
};

export const clearAdminSession = (cookies: Cookies) => {
	cookies.delete(cookieName, { path: '/' });
};

export const isAdminSessionValid = (cookies: Cookies) => {
	if (!adminConfigured()) {
		return false;
	}

	const token = cookies.get(cookieName);
	if (!token) {
		return false;
	}

	const [payload, signature] = token.split('.');
	if (!payload || !signature || !safeEqual(signature, sign(payload))) {
		return false;
	}

	try {
		const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as {
			login?: string;
			exp?: number;
		};

		return session.login === env.ADMIN_LOGIN && typeof session.exp === 'number' && session.exp > Date.now();
	} catch {
		return false;
	}
};
