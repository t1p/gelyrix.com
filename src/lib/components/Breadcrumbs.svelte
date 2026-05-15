<script lang="ts">
	import { localizeHref } from '$lib/locales';
	import { locale, t } from 'svelte-i18n';

	type Crumb = {
		label: string;
		href?: string;
	};

	let { items = [] }: { items?: Crumb[] } = $props();
</script>

<nav class="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/80" aria-label="Breadcrumb">
	<a class="hover:text-white" href={localizeHref('/', $locale ?? 'ru')}>{$t('nav.home')}</a>
	{#each items as item}
		<span aria-hidden="true">/</span>
		{#if item.href}
			<a class="hover:text-white" href={localizeHref(item.href, $locale ?? 'ru')}>{item.label}</a>
		{:else}
			<span class="text-white">{item.label}</span>
		{/if}
	{/each}
</nav>
