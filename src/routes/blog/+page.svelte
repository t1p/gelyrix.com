<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { articles, blogContent, normalizeLocale, pick } from '$lib/content';
	import { localizeHref } from '$lib/locales';

	$: content = pick(blogContent, $locale);
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: articleList = $page.data.cmsArticles?.[currentLocale] ?? pick(articles, $locale);
	$: adminSeo = getSeoForPath($page.data.adminContent, '/blog', currentLocale);
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
	imageAlt={isRu ? 'Исследовательские заметки и оборудование' : 'Research notes and equipment'}
	breadcrumbs={[{ label: content.eyebrow }]}
/>

<section class="section">
	<div class="page-container">
		<h2 class="text-2xl font-semibold">{isRu ? 'Рубрики' : 'Categories'}</h2>
		<div class="mt-5 flex flex-wrap gap-2">
			{#each content.categories as category}
				<span class="rounded-lg border border-clay bg-white/80 px-3 py-2 text-sm font-medium text-ink/70">
					{category}
				</span>
			{/each}
		</div>
		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each articleList as article}
				<a class="card block transition hover:-translate-y-1 hover:border-evergreen" href={localizeHref(`/blog/${article.slug}`, $locale ?? 'en')}>
					<div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase text-evergreen">
						<span>{article.category}</span>
						<span class="text-ink/40">{article.readTime}</span>
					</div>
					<h2 class="mt-4 text-2xl font-semibold">{article.title}</h2>
					<p class="mt-3 text-sm leading-6 text-ink/70">{article.description}</p>
				</a>
			{/each}
		</div>
	</div>
</section>
