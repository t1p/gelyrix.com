<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { faqContent, normalizeLocale, pick } from '$lib/content';

	$: content = pick(faqContent, $locale);
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: adminSeo = getSeoForPath($page.data.adminContent, '/faq', currentLocale);
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
	imageAlt={isRu ? 'Криогенный резервуар с жидким азотом' : 'Liquid nitrogen cryogenic storage tank'}
	imageCredit="Toby Hudson / Wikimedia Commons / CC BY-SA 3.0"
	breadcrumbs={[{ label: content.eyebrow }]}
/>

<section class="section">
	<div class="page-container grid gap-4">
		{#each content.items as item}
			<details class="card">
				<summary class="cursor-pointer text-lg font-semibold">{item.q}</summary>
				<p class="mt-4 max-w-3xl text-sm leading-6 text-ink/70">{item.a}</p>
			</details>
		{/each}
	</div>
</section>
