import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { defaultAdminContent, supportedLocales, type AdminContent, type AdminLocale } from '$lib/adminContent';
import { articles, type Article } from '$lib/content';
import {
	cmsCollectionId,
	cmsDatabaseId,
	getAppwriteDatabases,
	isAppwriteCmsConfigured
} from '$lib/server/appwriteAdmin';

const adminContentPath = join(process.cwd(), 'data', 'admin-content.json');
const articlesPath = join(process.cwd(), 'data', 'articles.json');

type CmsDocument = {
	content: string;
	$id: string;
	$sequence: string;
	$collectionId: string;
	$databaseId: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
};

type LocalizedArticles = Record<AdminLocale, Article[]>;

const readAppwriteJson = async <T>(documentId: string) => {
	const databases = getAppwriteDatabases();
	const document = await databases.getDocument<CmsDocument>(cmsDatabaseId, cmsCollectionId, documentId);
	return JSON.parse(document.content) as T;
};

const writeAppwriteJson = async <T>(documentId: string, content: T) => {
	const databases = getAppwriteDatabases();
	const data = {
		content: JSON.stringify(content)
	};

	try {
		await databases.updateDocument(cmsDatabaseId, cmsCollectionId, documentId, data);
	} catch (error) {
		const code = typeof error === 'object' && error && 'code' in error ? Number(error.code) : 0;
		if (code !== 404) {
			throw error;
		}

		await databases.createDocument(cmsDatabaseId, cmsCollectionId, documentId, data);
	}
};

const mergeContent = (stored: Partial<AdminContent>): AdminContent => {
	const storedSeo = stored.seo ?? [];
	const seo = defaultAdminContent.seo.map((entry) => {
		const storedEntry = storedSeo.find((item) => item.path === entry.path);
		const mergedEntry = {
			...entry,
			...storedEntry
		};

		for (const locale of supportedLocales) {
			mergedEntry[locale] = { ...entry[locale], ...storedEntry?.[locale] };
		}

		return mergedEntry;
	});

	const merged = {
		...defaultAdminContent,
		...stored,
		seo,
		blocks: {
			announcement: {
				...defaultAdminContent.blocks.announcement,
				...stored.blocks?.announcement
			},
			homeCta: {
				...defaultAdminContent.blocks.homeCta,
				...stored.blocks?.homeCta
			}
		}
	};

	for (const locale of supportedLocales) {
		merged.blocks.announcement[locale] = {
			...defaultAdminContent.blocks.announcement[locale],
			...stored.blocks?.announcement?.[locale]
		};
		merged.blocks.homeCta[locale] = {
			...defaultAdminContent.blocks.homeCta[locale],
			...stored.blocks?.homeCta?.[locale]
		};
	}

	return merged;
};

export const readAdminContent = async (): Promise<AdminContent> => {
	if (isAppwriteCmsConfigured()) {
		try {
			return mergeContent(await readAppwriteJson<Partial<AdminContent>>('admin-content'));
		} catch (error) {
			const code = typeof error === 'object' && error && 'code' in error ? Number(error.code) : 0;
			if (code !== 404) {
				console.warn('Failed to read admin content from Appwrite, using local fallback.', error);
			}
		}
	}

	try {
		const file = await readFile(adminContentPath, 'utf-8');
		return mergeContent(JSON.parse(file) as Partial<AdminContent>);
	} catch {
		return defaultAdminContent;
	}
};

export const writeAdminContent = async (content: AdminContent) => {
	const nextContent: AdminContent = {
		...content,
		updatedAt: new Date().toISOString()
	};

	if (isAppwriteCmsConfigured()) {
		await writeAppwriteJson('admin-content', nextContent);
		return nextContent;
	}

	await mkdir(dirname(adminContentPath), { recursive: true });
	await writeFile(adminContentPath, `${JSON.stringify(nextContent, null, 2)}\n`, 'utf-8');
	return nextContent;
};

export const readCmsArticles = async (): Promise<LocalizedArticles> => {
	if (isAppwriteCmsConfigured()) {
		try {
			const localizedArticles = {} as LocalizedArticles;

			for (const locale of supportedLocales) {
				localizedArticles[locale] = await readAppwriteJson<Article[]>(`articles-${locale}`);
			}

			return localizedArticles;
		} catch (error) {
			const code = typeof error === 'object' && error && 'code' in error ? Number(error.code) : 0;
			if (code !== 404) {
				console.warn('Failed to read articles from Appwrite, using local fallback.', error);
			}
		}
	}

	try {
		const file = await readFile(articlesPath, 'utf-8');
		const stored = JSON.parse(file) as Partial<LocalizedArticles>;
		const localizedArticles = {} as LocalizedArticles;

		for (const locale of supportedLocales) {
			const fallbackArticles = articles[locale as keyof typeof articles] ?? articles.en;
			localizedArticles[locale] = stored[locale]?.length ? stored[locale] : fallbackArticles;
		}

		return localizedArticles;
	} catch {
		return supportedLocales.reduce((localizedArticles, locale) => {
			localizedArticles[locale] = articles[locale as keyof typeof articles] ?? articles.en;
			return localizedArticles;
		}, {} as LocalizedArticles);
	}
};

export const writeCmsArticles = async (nextArticles: LocalizedArticles) => {
	if (isAppwriteCmsConfigured()) {
		for (const locale of supportedLocales) {
			await writeAppwriteJson(`articles-${locale}`, nextArticles[locale]);
		}
		return nextArticles;
	}

	await mkdir(dirname(articlesPath), { recursive: true });
	await writeFile(articlesPath, `${JSON.stringify(nextArticles, null, 2)}\n`, 'utf-8');
	return nextArticles;
};

export const getCmsStorageMode = () => (isAppwriteCmsConfigured() ? 'Appwrite' : 'Local JSON fallback');
