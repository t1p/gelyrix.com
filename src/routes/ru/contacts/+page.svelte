<script lang="ts">
	import ContactsPage from '../../contacts/+page.svelte';
	import { setLocale } from '$lib/i18n';

	setLocale('ru');
</script>

<ContactsPage />
