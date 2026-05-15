import { Client, Account, Databases, Storage } from 'appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_APPWRITE_ENDPOINT || !PUBLIC_APPWRITE_PROJECT_ID) {
	console.warn('Appwrite env vars are missing. Set PUBLIC_APPWRITE_ENDPOINT and PUBLIC_APPWRITE_PROJECT_ID.');
}

const client = new Client();

if (PUBLIC_APPWRITE_ENDPOINT && PUBLIC_APPWRITE_PROJECT_ID) {
	client.setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PUBLIC_APPWRITE_PROJECT_ID);
}

export const appwrite = {
	client,
	account: new Account(client),
	databases: new Databases(client),
	storage: new Storage(client)
};
