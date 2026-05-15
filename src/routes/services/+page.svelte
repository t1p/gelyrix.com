<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { normalizeLocale, pick, servicesContent } from '$lib/content';
	import { localizeHref } from '$lib/locales';

	$: content = pick(servicesContent, $locale);
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: adminSeo = getSeoForPath($page.data.adminContent, '/services', currentLocale);
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
	imageAlt={isRu ? 'Владелец с питомцем' : 'Pet owner and companion animal'}
	breadcrumbs={[{ label: content.eyebrow }]}
/>

<section class="section">
	<div class="page-container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each content.items as item}
			<article class="card flex flex-col">
				<div class="text-xs font-semibold uppercase text-evergreen">{item.kicker}</div>
				<h2 class="mt-3 text-xl font-semibold">{item.title}</h2>
				<p class="mt-3 text-sm leading-6 text-ink/70">{item.text}</p>
				{#if item.points}
					<ul class="mt-5 grid gap-2 text-sm text-ink/70">
						{#each item.points as point}
							<li class="flex gap-3">
								<span class="mt-2 h-2 w-2 shrink-0 rounded-sm bg-sun"></span>
								<span>{point}</span>
							</li>
						{/each}
					</ul>
				{/if}
				<a class="mt-6 inline-flex text-sm font-semibold text-evergreen" href={localizeHref('/contacts', $locale ?? 'en')}>
					{isRu ? 'Оставить заявку' : 'Request a consultation'} ->
				</a>
			</article>
		{/each}
	</div>
</section>
