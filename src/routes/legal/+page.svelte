<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { legalContent, normalizeLocale, pick } from '$lib/content';

	$: content = pick(legalContent, $locale);
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: adminSeo = getSeoForPath($page.data.adminContent, '/legal', currentLocale);
</script>

<svelte:head>
	<title>{adminSeo?.title || content.metaTitle} | Gelyrix</title>
	<meta name="description" content={adminSeo?.description || content.metaDescription} />
	<meta property="og:title" content={`${adminSeo?.title || content.metaTitle} | Gelyrix`} />
	<meta property="og:description" content={adminSeo?.description || content.metaDescription} />
	<meta property="og:image" content={adminSeo?.ogImage || content.image} />
</svelte:head>

<PageHero
	compact
	eyebrow={content.eyebrow}
	title={content.title}
	lead={content.lead}
	image={content.image}
	imageAlt={isRu ? 'Исследовательская инфраструктура' : 'Research infrastructure'}
	breadcrumbs={[{ label: content.eyebrow }]}
/>

<section class="section">
	<div class="page-container">
		<div class="surface">
			<ul class="grid gap-4 text-sm leading-6 text-ink/70">
				{#each content.items as item}
					<li class="flex gap-3">
						<span class="mt-2 h-2 w-2 shrink-0 rounded-sm bg-sun"></span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
