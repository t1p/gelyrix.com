<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import type { ActionLink } from '$lib/content';
	import { localizeHref } from '$lib/locales';
	import { locale } from 'svelte-i18n';

	type Crumb = {
		label: string;
		href?: string;
	};

	let {
		eyebrow,
		title,
		lead,
		image,
		imageAlt,
		imageCredit = '',
		breadcrumbs = [],
		actions = [],
		compact = false
	}: {
		eyebrow: string;
		title: string;
		lead: string;
		image: string;
		imageAlt: string;
		imageCredit?: string;
		breadcrumbs?: Crumb[];
		actions?: ActionLink[];
		compact?: boolean;
	} = $props();
</script>

<section class={`relative isolate overflow-hidden ${compact ? 'min-h-[360px]' : 'min-h-[520px]'}`}>
	<img class="hero-image absolute inset-0 h-full w-full object-cover" src={image} alt={imageAlt} />
	<div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,16,0.88),rgba(8,18,16,0.62),rgba(8,18,16,0.24))]"></div>
	<div class="page-container relative z-10 flex min-h-[inherit] items-center py-16 text-white">
		<div class="hero-copy max-w-3xl">
			{#if breadcrumbs.length}
				<Breadcrumbs items={breadcrumbs} />
			{/if}
			<span class="badge-dark">{eyebrow}</span>
			<h1 class="mt-5 text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
			<p class="mt-5 max-w-2xl text-lg leading-8 text-white/80">{lead}</p>
			{#if actions.length}
				<div class="mt-8 flex flex-wrap gap-3">
					{#each actions as action}
						<a class={action.variant === 'secondary' ? 'btn-light' : 'btn-primary'} href={localizeHref(action.href, $locale ?? 'ru')}>
							{action.label}
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	{#if imageCredit}
		<div class="absolute bottom-3 right-4 z-10 rounded-md bg-black/35 px-2 py-1 text-[11px] text-white/70 backdrop-blur">
			{imageCredit}
		</div>
	{/if}
</section>
