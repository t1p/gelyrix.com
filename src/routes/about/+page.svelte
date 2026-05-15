<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { normalizeLocale, pageContent, pick } from '$lib/content';

	$: content = pick(pageContent.about, $locale);
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: adminSeo = getSeoForPath($page.data.adminContent, '/about', currentLocale);
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
	imageAlt={isRu ? 'Команда обсуждает исследовательскую работу' : 'Team planning research work'}
	breadcrumbs={[{ label: content.eyebrow }]}
/>

<section class="section">
	<div class="page-container grid gap-6 md:grid-cols-2">
		{#each content.sections as section}
			<article class="card">
				<h2 class="text-xl font-semibold">{section.title}</h2>
				<p class="mt-3 text-sm leading-6 text-ink/70">{section.text}</p>
				{#if section.points}
					<ul class="mt-5 grid gap-2 text-sm text-ink/70">
						{#each section.points as point}
							<li class="flex gap-3">
								<span class="mt-2 h-2 w-2 shrink-0 rounded-sm bg-evergreen"></span>
								<span>{point}</span>
							</li>
						{/each}
					</ul>
				{/if}
			</article>
		{/each}
	</div>
</section>
