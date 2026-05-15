import { Client, Databases } from 'node-appwrite';
import { env } from '$env/dynamic/private';

export const cmsDatabaseId = env.APPWRITE_DATABASE_ID || 'gelyrix_cms';
export const cmsCollectionId = env.APPWRITE_CMS_COLLECTION_ID || 'cms_documents';

export const isAppwriteCmsConfigured = () => {
	return Boolean(
		(env.APPWRITE_ENDPOINT || env.PUBLIC_APPWRITE_ENDPOINT) &&
			(env.APPWRITE_PROJECT_ID || env.PUBLIC_APPWRITE_PROJECT_ID) &&
			env.APPWRITE_API_KEY
	);
};

export const getAppwriteDatabases = () => {
	const client = new Client()
		.setEndpoint(env.APPWRITE_ENDPOINT || env.PUBLIC_APPWRITE_ENDPOINT || '')
		.setProject(env.APPWRITE_PROJECT_ID || env.PUBLIC_APPWRITE_PROJECT_ID || '')
		.setKey(env.APPWRITE_API_KEY || '');

	return new Databases(client);
};
