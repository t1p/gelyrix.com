<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { normalizeLocale, pageContent, pick } from '$lib/content';

	$: content = pick(pageContent.how, $locale);
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: adminSeo = getSeoForPath($page.data.adminContent, '/how-it-works', currentLocale);
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
	<div class="page-container">
		<div class="grid gap-5">
			{#each content.sections as section, index}
				<article class="grid gap-6 rounded-lg border border-mist bg-white/80 p-6 lg:grid-cols-[180px_1fr]">
					<div class="text-5xl font-semibold text-evergreen/25">{String(index + 1).padStart(2, '0')}</div>
					<div>
						<h2 class="text-2xl font-semibold">{section.title}</h2>
						<p class="mt-3 max-w-3xl text-sm leading-6 text-ink/70">{section.text}</p>
						{#if section.points}
							<div class="mt-5 grid gap-3 md:grid-cols-2">
								{#each section.points as point}
									<div class="rounded-lg border border-mist bg-white/70 px-4 py-3 text-sm text-ink/75">
										{point}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
