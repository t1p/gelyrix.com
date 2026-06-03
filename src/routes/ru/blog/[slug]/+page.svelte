<script lang="ts">
	import BlogArticlePage from '../../../blog/[slug]/+page.svelte';
	import { setLocale } from '$lib/i18n';

	setLocale('ru');
</script>

<BlogArticlePage />
