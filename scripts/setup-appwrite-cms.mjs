import { readFileSync } from 'node:fs';
import { Client, Databases } from 'node-appwrite';

const readEnv = () => {
	try {
		const envFile = readFileSync('.env', 'utf-8');
		for (const line of envFile.split('\n')) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
				continue;
			}

			const [key, ...valueParts] = trimmed.split('=');
			if (!process.env[key]) {
				process.env[key] = valueParts.join('=');
			}
		}
	} catch {
		// .env is optional when environment variables are injected by the host.
	}
};

readEnv();

const endpoint = process.env.APPWRITE_ENDPOINT || process.env.PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID || process.env.PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const databaseId = process.env.APPWRITE_DATABASE_ID || 'gelyrix_cms';
const collectionId = process.env.APPWRITE_CMS_COLLECTION_ID || 'cms_documents';

if (!endpoint || !projectId || !apiKey) {
	console.error('Missing APPWRITE_ENDPOINT/PUBLIC_APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID/PUBLIC_APPWRITE_PROJECT_ID, or APPWRITE_API_KEY.');
	process.exit(1);
}

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
const databases = new Databases(client);

const ignoreConflict = async (task, label) => {
	try {
		await task();
		console.log(`Created ${label}`);
	} catch (error) {
		if (error?.code === 409) {
			console.log(`${label} already exists`);
			return;
		}
		throw error;
	}
};

await ignoreConflict(() => databases.create(databaseId, 'Gelyrix CMS'), `database ${databaseId}`);
await ignoreConflict(
	() => databases.createCollection(databaseId, collectionId, 'CMS Documents', [], false, true),
	`collection ${collectionId}`
);
await ignoreConflict(
	() => databases.createStringAttribute(databaseId, collectionId, 'content', 1000000, true),
	'content attribute'
);

for (let attempt = 0; attempt < 30; attempt += 1) {
	const attribute = await databases.getAttribute(databaseId, collectionId, 'content');
	if (attribute.status === 'available') {
		console.log('content attribute is available');
		process.exit(0);
	}

	console.log(`Waiting for content attribute, status: ${attribute.status}`);
	await new Promise((resolve) => setTimeout(resolve, 1000));
}

console.log('CMS schema created. Attribute is still processing; wait a bit before first admin save.');
