<script lang="ts">
	import BlogPage from '../../blog/+page.svelte';
	import { setLocale } from '$lib/i18n';

	setLocale('ru');
</script>

<BlogPage />
