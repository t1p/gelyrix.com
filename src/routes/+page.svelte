<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { articles, homeContent, images, normalizeLocale, pick } from '$lib/content';
	import { localizeHref } from '$lib/locales';

	$: content = pick(homeContent, $locale);
	$: isRu = $locale === 'ru';
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: articleList = $page.data.cmsArticles?.[currentLocale] ?? pick(articles, $locale);
	$: featuredArticles = articleList.slice(0, 4);
	$: adminSeo = getSeoForPath($page.data.adminContent, '/', currentLocale);
	$: announcement = $page.data.adminContent?.blocks.announcement;
	$: announcementContent = announcement?.[currentLocale];
	$: homeCta = $page.data.adminContent?.blocks.homeCta[currentLocale];
</script>

<svelte:head>
	<title>{adminSeo?.title || content.metaTitle}</title>
	<meta name="description" content={adminSeo?.description || content.metaDescription} />
	<meta property="og:title" content={adminSeo?.title || content.metaTitle} />
	<meta property="og:description" content={adminSeo?.description || content.metaDescription} />
	<meta property="og:image" content={adminSeo?.ogImage || images.hero} />
</svelte:head>

<PageHero
	eyebrow={content.eyebrow}
	title={content.title}
	lead={`${content.subtitle} ${content.tagline}`}
	image={images.hero}
	imageAlt={isRu ? 'Лаборатория крионических исследований' : 'Cryonics research laboratory'}
	actions={content.actions}
/>

{#if announcement?.enabled}
	<section class="border-y border-mist/80 bg-ink text-white">
		<div class="page-container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
			<div>
				<h2 class="text-xl font-semibold">{announcementContent?.title}</h2>
				<p class="mt-2 max-w-3xl text-sm leading-6 text-white/75">{announcementContent?.text}</p>
			</div>
			<a class="btn-light" href={localizeHref(announcementContent?.buttonHref || '/blog', $locale ?? 'ru')}>
				{announcementContent?.buttonLabel}
			</a>
		</div>
	</section>
{/if}

<section class="section">
	<div class="page-container">
		<div class="max-w-3xl">
			<h2 class="section-title">{content.summaryTitle}</h2>
			<p class="section-lead">{content.summaryLead}</p>
		</div>
		<div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each content.summary as item}
				<article class="card">
					<div class="text-sm font-semibold text-evergreen">{item.kicker}</div>
					<h3 class="mt-4 text-xl font-semibold">{item.title}</h3>
					<p class="mt-3 text-sm leading-6 text-ink/70">{item.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="full-bleed-band section">
	<div class="page-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
		<div>
			<h2 class="section-title">{content.stepsTitle}</h2>
			<p class="section-lead">{content.stepsLead}</p>
			<a class="btn-ghost mt-6" href={localizeHref('/how-it-works', $locale ?? 'en')}>{isRu ? 'Подробнее' : 'More details'}</a>
		</div>
		<div class="grid gap-4">
			{#each content.steps as item, index}
				<div class="grid gap-4 rounded-lg border border-mist bg-white/80 p-5 sm:grid-cols-[64px_1fr]">
					<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-evergreen text-xl font-semibold text-white">
						{index + 1}
					</div>
					<div>
						<h3 class="text-lg font-semibold">{item.title}</h3>
						<p class="mt-2 text-sm leading-6 text-ink/70">{item.text}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="page-container grid gap-10 lg:grid-cols-[1fr_0.9fr]">
		<div class="surface">
			<h2 class="text-2xl font-semibold">{content.differenceTitle}</h2>
			<ul class="mt-6 grid gap-4 text-sm leading-6 text-ink/75">
				{#each content.difference as item}
					<li class="flex gap-3">
						<span class="mt-2 h-2 w-2 shrink-0 rounded-sm bg-sun"></span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<h2 class="text-2xl font-semibold">{content.audienceTitle}</h2>
			<div class="mt-6 grid gap-3">
				{#each content.audience as item}
					<div class="rounded-lg border border-mist bg-white/75 px-4 py-3 text-sm font-medium text-ink/75">
						{item}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="section pt-0">
	<div class="page-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
		<div>
			<h2 class="section-title">{content.articlesTitle}</h2>
			<p class="section-lead">{content.articlesLead}</p>
			<a class="btn-primary mt-6" href={localizeHref('/blog', $locale ?? 'en')}>{isRu ? 'Все статьи о крионике' : 'All cryonics articles'}</a>
		</div>
		<div class="grid gap-4 md:grid-cols-2">
			{#each featuredArticles as article}
				<a class="card block transition hover:-translate-y-1 hover:border-evergreen" href={localizeHref(`/blog/${article.slug}`, $locale ?? 'ru')}>
					<div class="text-xs font-semibold uppercase text-evergreen">{article.category}</div>
					<h3 class="mt-3 text-lg font-semibold">{article.title}</h3>
					<p class="mt-2 text-sm leading-6 text-ink/70">{article.description}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="full-bleed-band section">
	<div class="page-container grid gap-8 lg:grid-cols-[1fr_1fr]">
		<div>
			<h2 class="section-title">{content.teamTitle}</h2>
			<p class="section-lead">{content.teamText}</p>
		</div>
		<div class="grid gap-3 sm:grid-cols-3">
			<div class="rounded-lg border border-mist bg-white/80 p-5 text-center font-semibold">CryoDAO</div>
			<div class="rounded-lg border border-mist bg-white/80 p-5 text-center font-semibold">Aicoda</div>
			<div class="rounded-lg border border-mist bg-white/80 p-5 text-center font-semibold">Gelyrix Network</div>
		</div>
	</div>
</section>

<section class="section">
	<div class="page-container">
		<div class="grid gap-6 rounded-lg bg-ink p-8 text-white md:grid-cols-[1fr_auto] md:items-center">
			<div>
				<h2 class="text-3xl font-semibold">{homeCta?.title || content.ctaTitle}</h2>
				<p class="mt-3 max-w-2xl text-sm leading-6 text-white/75">{homeCta?.text || content.ctaText}</p>
			</div>
			<a class="btn-light" href={localizeHref(homeCta?.buttonHref || '/contacts', $locale ?? 'ru')}>{homeCta?.buttonLabel || content.ctaButton}</a>
		</div>
	</div>
</section>
